import { NextFunction, Request, Response } from "express";
import { Products } from "../schemas/products";
import { IProduct } from "../types";
import createHttpError from "http-errors";
import { protectedFunc } from "../../utils/protectedFunc";

export const fetchAllProducts = protectedFunc(
  async (_req: Request, res: Response) => {
    const products = await Products.find({});
    res.status(200).json(products);
  },
);

export const createNewProduct = protectedFunc(
  async (req: Request, res: Response) => {
    const product = new Products({ ...req.body });
    await product.save();
    res.status(200).json({ msg: "Create new Product", product });
  },
);

export const fetchProductById = protectedFunc(
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    const product = await Products.findOne({ productId });
    if (!product)
      throw new createHttpError.NotFound("The given productId was not found.");
    res
      .status(200)
      .json({ msg: "Fetch Product by Id", deletedProduct: product });
  },
);

export const updateProductById = protectedFunc(
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    const body = req.body as Partial<IProduct>;
    const product = await Products.findOneAndUpdate({ productId }, body, {
      new: true,
    });
    if (!product)
      throw new createHttpError.NotFound(
        "Product with the given productId was not found",
      );
    res
      .status(200)
      .json({ msg: "Modify Product by Id", modifiedProduct: product });
  },
);

export const deleteProductById = protectedFunc(async (req, res) => {
  const { productId } = req.params;
  const product = await Products.findOneAndDelete({ productId });
  if (!product)
    throw new createHttpError.NotFound("The given productId was not found.");
  res
    .status(200)
    .json({ msg: "Delete Product by Id", deletedProduct: product });
});
