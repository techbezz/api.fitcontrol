const http = require("http");
const path = require("path");

const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");
const { logger } = require("./logger");

require("./mysql");

require("dotenv").config();

// Inicia os cronjobs
require("./src/jobs/index");

app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: ["Content-Disposition"],
  })
);
// const configureSocketModule = require('./src/socket/socket')
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));
app.use("/temp", express.static(path.join(__dirname, "public", "temp")));

const router = require("./src/routes/router");
app.use(router);

const server = http.createServer(app);

const PORTA = 7000;
server.listen(PORTA, () => {
  logger.info({
    module: "ROOT",
    origin: "INDEX",
    method: "LISTEN",
    data: { message: "Backend Datasys is running... na porta " + PORTA },
  });
});
// const io = socketIo(server, {
//     cors: {
//         origin: ["http://localhost"],
//         methods: ["GET","POST"],
//     }
// });
// configureChatModule(io)
