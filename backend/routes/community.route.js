import express from "express";
import {
  createCommunity,
  joinCommunity,
  getUserCommunities,
  deleteCommunity,
  getNotJoinedCommunities,
} from "../controllers/community.controller.js";
import {
  getCommunityMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Community routes
router.post("/create", verifyToken, createCommunity);
router.post("/:communityId/join", verifyToken, joinCommunity);
router.get("/my", verifyToken, getUserCommunities);
router.get("/available", verifyToken, getNotJoinedCommunities);
router.delete("/:communityId", verifyToken, deleteCommunity);

//community  Chat routes
router.get("/:communityId/messages", verifyToken, getCommunityMessages);
router.post("/message/send", verifyToken, sendMessage);

export default router;
