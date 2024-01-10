import { NextFunction, Request, Response } from "express";
import { Products } from "../schemas/products";

export const createNewProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = new Products({ ...req.body });
    await product.save();
    res.status(200).json({ msg: "Create new Product", product });
  } catch (err) {
    next(err);
  }
};

export const fetchAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await Products.find({});
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

export const fetchProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const product = await Products.findOne({ productId });
    res
      .status(200)
      .json({ msg: "Fetch Product by Id", deletedProduct: product });
  } catch (err) {
    next(err);
  }
};

export const deleteProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const product = await Products.findOneAndDelete({ productId });
    res
      .status(200)
      .json({ msg: "Delete Product by Id", deletedProduct: product });
  } catch (err) {
    next(err);
  }
};
