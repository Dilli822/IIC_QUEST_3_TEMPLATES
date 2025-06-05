// socket.js
import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Chat: Join a community room
    socket.on("joinRoom", (communityId) => {
      socket.join(communityId);
      console.log(`User joined room: ${communityId}`);
    });

    // Chat: Broadcast new message to room
    socket.on("newMessage", (message, communityId) => {
      console.log("Message sent:", message);
      io.to(communityId).emit("messageReceived", message);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
