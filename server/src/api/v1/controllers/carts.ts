import { Request, Response } from "express";
import { protectedFunc } from "../../utils/protectedFunc";
import { Carts } from "../schemas/carts";

export const fetchUserTotal = protectedFunc(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const uniqueProductIds = new Set<string>();
    const carts = await Carts.find({ userId });
    carts.forEach((cart) => {
      console.log(cart.productId);
      uniqueProductIds.add(cart.productId as string);
    });
    res.status(200).json(carts);
  },
);
