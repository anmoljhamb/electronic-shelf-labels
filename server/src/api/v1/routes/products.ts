import { Router } from "express";
import {
  createNewProduct,
  deleteProductById,
  fetchAllProducts,
  fetchProductById,
} from "../controllers/products";

export const productRouter = Router();

productRouter
  .get("/", fetchAllProducts)
  .post("/", createNewProduct)
  .delete("/:productId", deleteProductById)
  .get("/:productId", fetchProductById);
