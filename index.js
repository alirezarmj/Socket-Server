const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Socket server is running");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // or your Vercel URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log("Server running on", PORT);
});

// const http = require("http");
// const express = require("express");
// const cors = require("cors");
// const { Server } = require("socket.io");

// const app = express();

// app.use(cors());

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", // <-- change this to your frontend's URL
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`A user connected with id ${socket.id}`);

//   socket.on("join_room", (roomId) => {
//     // console.log(`A user with ID: ${socket.id} joined room ${roomId}`);
//     socket.join(roomId);
//   });

//   socket.on("send_message", (data) => {
//     // console.log(`A user with ID: ${socket.id} sent a message: ${data.message}`);
//     socket.to(data.room).emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("A User Disconnected");
//   });
// });

// server.listen(3001, () => {
//   console.log("Server is running on port 3001");
// });
