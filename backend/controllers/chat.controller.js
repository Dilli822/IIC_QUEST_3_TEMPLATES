import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";

// -------------------------------------------------------Add user to firendList----------------------------------
export const addToFriendList = async (req, res) => {
  const userId = req.userId;
  const recipientId = req.params.recipientId;

  if (!recipientId) {
    return res
      .status(400)
      .json({ success: false, message: "Recipient ID is required." });
  }

  if (userId === recipientId) {
    return res
      .status(400)
      .json({ success: false, message: "You cannot add yourself." });
  }

  try {
    const [user, recipient] = await Promise.all([
      User.findById(userId),
      User.findById(recipientId),
    ]);

    if (!user || !recipient) {
      return res
        .status(404)
        .json({ success: false, message: "User or recipient not found." });
    }

    const userHasRecipient = user.friendList.includes(recipientId);
    const recipientHasUser = recipient.friendList.includes(userId);

    // If both already have each other, return early
    if (userHasRecipient && recipientHasUser) {
      return res.status(200).json({
        success: true,
        message: "Already in each other's friend list.",
      });
    }

    // Add recipient to user's friendList if missing
    if (!userHasRecipient) {
      user.friendList.push(recipientId);
    }

    // Add user to recipient's friendList if missing
    if (!recipientHasUser) {
      recipient.friendList.push(userId);
    }

    await Promise.all([user.save(), recipient.save()]);

    return res
      .status(201)
      .json({ success: true, message: "Friend lists updated." });
  } catch (err) {
    console.error("Add to Friend List Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update friend list." });
  }
};

// -------------------------------------------------------Get firendList----------------------------------

export const getFriends = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate(
      "friendList",
      "name imageUrl _id"
    );
    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json(user.friendList);
  } catch (error) {
    console.error("Error fetching friend list:", error);
    res.status(500).json({ message: "Failed to fetch friend list." });
  }
};

// ------------------------------------------------------Send personal chat message-------------------------------------
export const sendMessage = async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    const senderId = req.userId;

    if (!recipientId || !content) {
      return res
        .status(400)
        .json({ message: "Recipient and content are required." });
    }

    const newMessage = await Chat.create({
      sender: senderId,
      receiver: recipientId,
      message: content,
    });

    const populatedMessage = await newMessage.populate(
      "sender",
      "name imageUrl"
    );
    res.status(201).json(populatedMessage);
  } catch (err) {
    console.error("Send Message Error:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
};

// GET /chat/messages/:userId
export const getMessages = async (req, res) => {
  try {
    const userId1 = req.userId;
    const userId2 = req.params.userId;

    const messages = await Chat.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name imageUrl");

    res.status(200).json(messages);
  } catch (err) {
    console.error("Get Messages Error:", err);
    res.status(500).json({ message: "Failed to retrieve messages" });
  }
};

// GET /chat/users/:userId
export const getChatUsers = async (req, res) => {
  try {
    const userId = req.params.userId;

    const chats = await Chat.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).populate("sender receiver", "name imageUrl");

    const usersSet = new Set();

    chats.forEach((chat) => {
      if (chat.sender._id.toString() !== userId) {
        usersSet.add(JSON.stringify(chat.sender));
      }
      if (chat.receiver._id.toString() !== userId) {
        usersSet.add(JSON.stringify(chat.receiver));
      }
    });

    const uniqueUsers = [...usersSet].map((user) => JSON.parse(user));
    res.status(200).json(uniqueUsers);
  } catch (error) {
    console.error("Error fetching chat users:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
