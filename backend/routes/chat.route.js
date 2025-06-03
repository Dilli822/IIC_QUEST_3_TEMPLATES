import express from "express";
import {
  getChatUsers,
  getMessages,
  sendMessage,
} from "../controllers/chat.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/send", verifyToken, sendMessage);
router.get("/messages/:userId", verifyToken, getMessages);
router.get("/users/:userId", verifyToken, getChatUsers);

export default router;
