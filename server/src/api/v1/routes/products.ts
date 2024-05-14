import { Request, Response, Router } from "express";
import {
  createNewProduct,
  deleteProductById,
  fetchAllProducts,
  fetchProductById,
  updateProductById,
} from "../controllers/products";
import { protectedFunc } from "../../utils/protectedFunc";
import createHttpError from "http-errors";
import { IProduct } from "../types";
import { updateData } from "../../utils/updateData";

export const productRouter = Router();

productRouter
  .get(
    "/",
    protectedFunc(async (_req: Request, res: Response) => {
      const products = await fetchAllProducts();
      res.status(200).json(products);
    }),
  )
  .get(
    "/:productId",
    protectedFunc(async (req: Request, res: Response) => {
      const { productId } = req.params;
      const product = await fetchProductById(productId);
      if (!product)
        throw new createHttpError.NotFound(
          "The given productId was not found.",
        );
      res.status(200).json({ msg: "Fetch Product by Id", product });
    }),
  )
  .post(
    "/create-new",
    protectedFunc(async (req: Request, res: Response) => {
      const product = await createNewProduct(req.body);
      res.status(200).json({ msg: "Create new Product", product });
    }),
  )
  .delete(
    "/:productId",
    protectedFunc(async (req, res) => {
      const { productId } = req.params;
      const product = await deleteProductById(productId);
      if (!product)
        throw new createHttpError.NotFound(
          "The given productId was not found.",
        );
      res
        .status(200)
        .json({ msg: "Delete Product by Id", deletedProduct: product });
    }),
  )
  .patch(
    "/:productId",
    protectedFunc(async (req: Request, res: Response) => {
      const { productId } = req.params;
      const body = req.body as Partial<IProduct>;
      const product = await updateProductById(productId, body);
      updateData();
      if (!product)
        throw new createHttpError.NotFound(
          "Product with the given productId was not found",
        );
      res
        .status(200)
        .json({ msg: "Modify Product by Id", modifiedProduct: product });
    }),
  );
