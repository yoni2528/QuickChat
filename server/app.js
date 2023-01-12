const express = require("express");

const app = express();

const http = require("http").createServer(app);
const { Server } = require("socket.io");

const cors = require("cors");
const morgan = require("morgan");

const userRouter = require("./routers/userRouter");
const messageRouter = require("./routers/messageRouter");

const errorHelper = require("./utils/errorHelper");

app.use(morgan("combined"));

app.use(express.json({ limit: "19kb" }));
app.use(express.json());

// eslint-disable-next-line no-undef
app.use(express.static(`${__dirname}/public`));

app.use(
  cors({
    // eslint-disable-next-line prettier/prettier
    origin: [
      "https://stupendous-bavarois-eac808.netlify.app",
      "https://quickchat-front.onrender.com",
      "http://127.0.0.1:5173",
    ],
  })
);

app.use("/app/v1/user", userRouter);
app.use("/app/v1/chat", messageRouter);

app.use(errorHelper);

app.use((err, req, res, next) => {
  res.status(400).json({
    message: "faild",
    title: err.title,
    error: err.message,
  });
});

const io = new Server(http, {
  cors: {
    // eslint-disable-next-line prettier/prettier
    origin: [
      "https://stupendous-bavarois-eac808.netlify.app",
      "https://quickchat-front.onrender.com",
      "http://127.0.0.1:5173",
    ],
    methods: ["POST", "GET"],
  },
});

global.activeUsers = new Map();

io.on("connection", (socket) => {
  socket.on("open_room", ({ userId }) => {
    socket.join(userId);
  });

  socket.on("join_room", (userId) => {
    socket.join(userId);
  });

  socket.on("send_message", ({ to, message, from }) => {
    socket.in(to).emit("recieve_message", { message, from, to });
  });
});

module.exports = http;
