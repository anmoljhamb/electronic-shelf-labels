import { Router } from "express";
import { createNewProduct, fetchAllProducts } from "../controllers/products";

export const productRouter = Router();

productRouter.get("/", fetchAllProducts).post("/", createNewProduct);
