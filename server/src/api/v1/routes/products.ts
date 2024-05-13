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
  .get("/:productId", fetchProductById)
  .post("/create-new", createNewProduct)
  .delete("/:productId", deleteProductById)
  .patch("/:productId", updateProductById);
