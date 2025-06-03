import { getIO } from "../socket.io/socket.js";

export const sendNotification = async (req, res) => {
  const { message } = req.body;

  const io = getIO();
  io.emit("pushNotification", { message });

  res.status(200).json({ message: "Notification sent successfully" });
};
