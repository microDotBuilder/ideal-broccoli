import dotenv from "dotenv";
import cors from "cors";
import express from "express";

dotenv.config({
  path: "./.env",
});

const app = express();

// global middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

import healthcheckRouter from "./routes/health-check-route";
import userRouter from "./routes/user-route";
import { newErrorHandler } from "./middlewares/error-middleware";

app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/user", userRouter);

// TODO: Fix the error handler type
app.use(newErrorHandler);

export default app;
