import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { createServer } from "http";
import createHttpError from "http-errors";
import { ReasonPhrases } from "http-status-codes";
import path from "path";
import { apiRouter } from "./api/v1";
import { echoWs } from "./api/v1/sockets/echo";
import mongoose from "mongoose";

dotenv.config({ path: path.join(__dirname, "..", "config.env") });

const PORT = process.env.PORT || 8000;
const DATABASE_URI =
  process.env.DATABASE_URI || "mongodb://127.0.0.1:27017/esl";
const app = express();
const server = createServer(app);

app.use("/api/v1", apiRouter);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  const err = new createHttpError.NotFound(ReasonPhrases.NOT_FOUND);
  next(err);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const msg = err.message || "Internal Server Error";
  res.status(status).json({ msg });
});

server.on("upgrade", (req, socket, head) => {
  const pathname = req.url;
  console.log(`Recvd a socket upgrade req on ${req.url}`);

  if (pathname === "/echo") {
    echoWs.handleUpgrade(req, socket, head, (ws) => {
      echoWs.emit("connection", ws, req);
    });
  }
});

server.listen(PORT, async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(DATABASE_URI);
  console.log("Database connected.");
  console.log(`Server listening on the url *:${PORT}`);
});
