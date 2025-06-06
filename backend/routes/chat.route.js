import express from "express";
import {
  addToFriendList,
  getChatUsers,
  getFriends,
  getMessages,
  sendMessage,
} from "../controllers/chat.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/send", verifyToken, sendMessage);
router.get("/messages/:userId", verifyToken, getMessages);
router.get("/users/:userId", verifyToken, getChatUsers);
router.post("/add-friend/:recipientId", verifyToken, addToFriendList);
router.get("/friends/:userId", verifyToken, getFriends);

export default router;
