import { Router } from "express";

export const productRouter = Router();
productRouter.get("/", (_req, res) => {
  res.status(200).json({ message: "Working" });
});
