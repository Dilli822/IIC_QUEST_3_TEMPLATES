import Community from "../models/community.model.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";

// --------------------------- Create a new community ---------------------------
export const createCommunity = async (req, res) => {
  const userId = req.userId;
  const { name } = req.body;

  if (!name?.trim()) {
    return res.status(400).json({ message: "Community name is required" });
  }

  try {
    const existing = await Community.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: "Community already exists" });
    }

    const community = new Community({
      name: name.trim(),
      owner: userId,
      members: [userId],
    });

    await community.save();

    await User.findByIdAndUpdate(userId, {
      $addToSet: { communities: community._id },
    });

    res.status(201).json({
      message: "Community created successfully",
      community,
    });
  } catch (error) {
    console.error("Create Community Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// --------------------------- Join a community ---------------------------
export const joinCommunity = async (req, res) => {
  const userId = req.userId;
  const { communityId } = req.params;

  if (!communityId) {
    return res.status(400).json({ message: "Community ID is required" });
  }

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const alreadyMember = community.members.includes(userId);
    if (!alreadyMember) {
      community.members.push(userId);
      await community.save();

      await User.findByIdAndUpdate(userId, {
        $addToSet: { communities: community._id },
      });
    }

    res.status(200).json({
      message: alreadyMember ? "Already a member" : "Joined community",
      community,
    });
  } catch (error) {
    console.error("Join Community Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------------- Leave a community ---------------------------
export const leaveCommunity = async (req, res) => {
  const userId = req.userId;
  const { communityId } = req.params;

  if (!communityId) {
    return res.status(400).json({ message: "Community ID is required" });
  }

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const alreadyMember = community.members.includes(userId);
    if (!alreadyMember) {
      return res.status(403).json({
        message: "You are not a member of this community!",
      });
    }

    // Prevent owner from leaving their own community
    if (community.owner.toString() === userId) {
      return res
        .status(403)
        .json({ message: "Owners cannot leave their own community" });
    }

    // Remove user from community members
    community.members = community.members.filter(
      (memberId) => memberId.toString() !== userId
    );
    await community.save();

    // Remove community from user's communities
    await User.findByIdAndUpdate(userId, {
      $pull: { communities: community._id },
    });

    res.status(200).json({ message: "Left community successfully" });
  } catch (error) {
    console.error("Leave Community Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------------- Get communities user has NOT joined ---------------------------
export const getNotJoinedCommunities = async (req, res) => {
  const userId = req.userId;

  try {
    const communities = await Community.find({
      members: { $nin: [userId] },
    })
      .populate("owner", "name")
      .populate("members", "name imageUrl");

    res.status(200).json(communities);
  } catch (error) {
    console.error("Fetch Communities Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------------- Get communities user has joined ---------------------------
export const getUserCommunities = async (req, res) => {
  const userId = req.userId;

  try {
    const communities = await Community.find({
      members: userId,
    })
      .populate("owner", "name")
      .populate("members", "name");

    res.status(200).json(communities);
  } catch (error) {
    console.error("User Communities Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------------- Delete a community ---------------------------
export const deleteCommunity = async (req, res) => {
  const userId = req.userId;
  const communityId = req.params.communityId;

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (community.owner.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Message.deleteMany({ community: communityId });

    await User.updateMany(
      { communities: communityId },
      { $pull: { communities: communityId } }
    );

    await Community.findByIdAndDelete(communityId);

    res.status(200).json({ message: "Community and messages deleted" });
  } catch (error) {
    console.error("Delete Community Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------------Get all members-----------------------------------
export const getAllMembers = async (req, res) => {
  const communityId = req.params.communityId;

  try {
    const community = await Community.findById(communityId).populate(
      "members",
      "name imageUrl"
    );

    if (!community) {
      return res.status(404).json({ message: "Community not found!" });
    }

    res.status(200).json(community.members);
  } catch (error) {
    console.error("Error fetching members:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
