// server.js
import dotenv from "dotenv";
import connectDB from "./db/conn.js";
import app from "./app.js";
import http from "http";
import { initSocket } from "./socket.io/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Start the server
server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port:${PORT}`);
});
