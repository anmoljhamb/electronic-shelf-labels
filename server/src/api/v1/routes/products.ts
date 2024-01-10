import { Router } from "express";
import { createNewProduct } from "../controllers/products";

export const productRouter = Router();
productRouter.get("/", (_req, res) => {
  res.status(200).json({ message: "Working" });
});

productRouter.post("/", createNewProduct);
