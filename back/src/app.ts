import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { newErrorHandler } from "./middlewares/error-middleware";
import { Server } from "socket.io";

dotenv.config({
  path: "./.env",
});

const app = express();
const server = createServer(app);
const io = new Server(server);
// TEST START
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

//TEST END

// // global middlewares
// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//   })
// );
// // TODO: Fix the error handler type
// app.use(newErrorHandler);

// // global routes
// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// // routes imports
// import healthcheckRouter from "./routes/health-check-route";
// import userRouter from "./routes/user-route";

// // routes
// app.use("/api/v1/healthcheck", healthcheckRouter);
// app.use("/api/v1/user", userRouter);

export default server;
