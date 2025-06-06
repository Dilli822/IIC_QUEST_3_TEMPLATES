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

  const onlineUsers = new Map(); // userId -> Set of socketIds
  const communityOnlineUsers = new Map(); // communityId -> Set of userIds

  io.on("connection", (socket) => {
    // Track user login
    socket.on("userOnline", (userId) => {
      if (!userId) return;

      if (!onlineUsers.has(userId)) onlineUsers.set(userId, new Set());
      onlineUsers.get(userId).add(socket.id);

      socket.userId = userId; // attach for reference later
      updateGlobalOnline();
    });

    socket.on("userOffline", () => {
      const userId = socket.userId;
      const communityId = socket.communityId;

      if (userId && onlineUsers.has(userId)) {
        onlineUsers.get(userId).delete(socket.id);
        if (onlineUsers.get(userId).size === 0) {
          onlineUsers.delete(userId);

          // Also remove from community
          if (communityId && communityOnlineUsers.has(communityId)) {
            communityOnlineUsers.get(communityId).delete(userId);
            emitCommunityOnline(communityId);
          }
        }
        updateGlobalOnline();
      }
    });

    // Join community
    socket.on("joinRoom", (communityId) => {
      if (!socket.userId) return;

      socket.join(communityId);
      socket.communityId = communityId;

      if (!communityOnlineUsers.has(communityId)) {
        communityOnlineUsers.set(communityId, new Set());
      }
      communityOnlineUsers.get(communityId).add(socket.userId);

      emitCommunityOnline(communityId);
    });

    // Leave community
    socket.on("leaveRoom", (communityId) => {
      if (!communityId || !socket.userId) return;

      socket.leave(communityId);

      const users = communityOnlineUsers.get(communityId);
      if (users) {
        users.delete(socket.userId);
        if (users.size === 0) communityOnlineUsers.delete(communityId);
      }

      emitCommunityOnline(communityId);
    });

    // Chat: Broadcast new message to room
    socket.on("newMessage", (message, communityId) => {
      io.to(communityId).emit("messageReceived", message);
    });

    // Disconnect logic
    socket.on("disconnect", () => {
      const userId = socket.userId;
      const communityId = socket.communityId;

      if (userId && onlineUsers.has(userId)) {
        onlineUsers.get(userId).delete(socket.id);
        if (onlineUsers.get(userId).size === 0) {
          onlineUsers.delete(userId);

          // Also remove from community
          if (communityId && communityOnlineUsers.has(communityId)) {
            communityOnlineUsers.get(communityId).delete(userId);
            emitCommunityOnline(communityId);
          }
        }
      }

      updateGlobalOnline();
    });

    function updateGlobalOnline() {
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    }

    function emitCommunityOnline(communityId) {
      const userIds = Array.from(
        communityOnlineUsers.get(communityId) || new Set()
      );
      io.to(communityId).emit("communityOnlineUsers", userIds);
    }
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
