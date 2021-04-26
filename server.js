const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    //from -> id
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", ({ signal, to, myName }) => {
    io.to(to).emit("callAccepted", signal, myName);
  });

  socket.on("close", (data) => {
    io.to(data.to).emit("close");
  });

  socket.on("rejected", (data) => {
    io.to(data.to).emit("rejected");
  });

  socket.on("audioMuted", (data) => {
    io.to(data.to).emit("audioMuted");
  });

  socket.on("videoMuted", (data) => {
    io.to(data.to).emit("videoMuted");
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
