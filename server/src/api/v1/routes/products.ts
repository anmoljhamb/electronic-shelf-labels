import { Router } from "express";
import {
  createNewProduct,
  deleteProductById,
  fetchAllProducts,
} from "../controllers/products";

export const productRouter = Router();

productRouter
  .get("/", fetchAllProducts)
  .post("/", createNewProduct)
  .delete("/", deleteProductById);
