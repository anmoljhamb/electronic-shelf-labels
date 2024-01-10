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
});

export const Products = mongoose.model("product", productSchema);
