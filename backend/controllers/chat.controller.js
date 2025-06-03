import Chat from "../models/chat.model.js";

// POST /chat/send
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
