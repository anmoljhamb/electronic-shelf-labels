import createHttpError from "http-errors";
import mongoose from "mongoose";
import { IProduct } from "../types";

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  prevPrice: {
    type: Number,
    required: true,
  },
  productId: {
    type: String,
    required: true,
    unique: true,
  },
});

productSchema.pre("save", async function (next) {
  const model = mongoose.model("product", productSchema);
  const existing = await model.findOne({ productId: this.productId });
  if (existing) {
    const err = new createHttpError.BadRequest("The productId already exists.");
    next(err);
  } else next();
});

export const Products = mongoose.model("product", productSchema);
