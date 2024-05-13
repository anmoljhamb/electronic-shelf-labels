import { Router } from "express";
import {
  createNewProduct,
  deleteProductById,
  fetchAllProducts,
  fetchProductById,
  updateProductById,
} from "../controllers/products";

export const productRouter = Router();

productRouter
  .get("/", fetchAllProducts)
  .post("/create-new", createNewProduct)
  .get("/:productId", fetchProductById)
  .delete("/:productId", deleteProductById)
  .patch("/:productId", updateProductById);
