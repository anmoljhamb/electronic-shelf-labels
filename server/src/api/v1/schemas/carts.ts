import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    requried: true,
  },
});

export const Carts = mongoose.model("cart", cartSchema);
