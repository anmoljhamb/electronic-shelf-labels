import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { createServer } from "http";
import createHttpError from "http-errors";
import { ReasonPhrases } from "http-status-codes";
import path from "path";
import { apiRouter } from "./api/v1";
import { priceCom, priceWs } from "./api/v1/sockets/price";
import mongoose from "mongoose";
import morgan from "morgan";
import { cartCom, cartWs } from "./api/v1/sockets/cart";
import { clientWs } from "./api/v1/sockets/client";

dotenv.config({ path: path.join(__dirname, "..", "config.env") });

const PORT = process.env.PORT || 8000;
const DATABASE_URI =
  process.env.DATABASE_URI || "mongodb://127.0.0.1:27017/esl";
const app = express();
const server = createServer(app);
const PRODUCTS_SOCKET_PATH = "/api/v1/products/sockets";
const CLIENTS_SOCKET_PATH = "/api/v1/clients/sockets";

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
  let pathname = req.url as string;
  const productId = req.headers.product_id as string;
  console.log(
    `Recvd a socket upgrade req on ${req.url} by product ${productId}`,
  );

  if (pathname.startsWith(PRODUCTS_SOCKET_PATH)) {
    pathname = pathname.slice(PRODUCTS_SOCKET_PATH.length);
    if (pathname === "/price") {
      priceWs.handleUpgrade(req, socket, head, (ws) => {
        priceCom.addSocket(productId, ws);
        priceWs.emit("connection", ws, req);
      });
    } else if (pathname === "/cart") {
      cartWs.handleUpgrade(req, socket, head, (ws) => {
        cartCom.addSocket(productId, ws);
        cartWs.emit("connection", ws, req);
      });
    }
  } else if (pathname.startsWith(CLIENTS_SOCKET_PATH)) {
    clientWs.handleUpgrade(req, socket, head, (ws) => {
      clientWs.emit("connection", ws, req);
    });
  }
});

server.listen(PORT, async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(DATABASE_URI);
  console.log("Database connected.");
  console.log(`Server listening on the url *:${PORT}`);
});
