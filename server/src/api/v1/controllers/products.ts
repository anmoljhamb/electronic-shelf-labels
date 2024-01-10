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
