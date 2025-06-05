import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import communityRoutes from "./routes/community.route.js";
import reportRoutes from "./routes/report.route.js";
import notifiRoutes from "./routes/notification.route.js";
import chatRoutes from "./routes/chat.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/notifications", notifiRoutes);
app.use("/api/chat", chatRoutes);

export default app;
