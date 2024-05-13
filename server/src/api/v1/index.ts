import * as express from "express";
import { productRouter } from "./routes/products";
import { cartRouter } from "./routes/carts";

export const apiRouter = express.Router();

apiRouter.get("/", (_req, res) => {
  res.status(200).json({ msg: "Hello, World!" });
});

apiRouter.use("/products", productRouter);
apiRouter.use("/carts", cartRouter);
