import createHttpError from "http-errors";
import mongoose from "mongoose";
import { IProduct } from "../types";
import { Communication } from "../../utils/communication";

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

productSchema.post("findOneAndUpdate", function (doc) {
  console.log("The price just got updated!");
  const socket = Communication.getSocket(doc.productId);
  socket.send(`UP: ${doc.price}`);
});

export const Products = mongoose.model("product", productSchema);
