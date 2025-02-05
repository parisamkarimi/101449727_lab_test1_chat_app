const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

const users = {};

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);
    users[socket.id] = { username, room };
    io.to(room).emit("message", { from_user: "System", message: `${username} joined ${room}` });
  });

  socket.on("chatMessage", (data) => {
    io.to(users[socket.id].room).emit("message", { from_user: data.from_user, message: data.message });
  });

  socket.on("typing", (username) => {
    socket.broadcast.to(users[socket.id].room).emit("typing", `${username} is typing...`);
  });

  socket.on("disconnect", () => {
    io.to(users[socket.id]?.room).emit("message", { from_user: "System", message: `${users[socket.id]?.username} left` });
    delete users[socket.id];
  });
});

server.listen(3000, () => console.log("Server running on port 3000"));
