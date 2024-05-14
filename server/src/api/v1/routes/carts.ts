import { Request, Response, Router } from "express";
import { emptyCart, fetchUserTotalAndOrderDetails } from "../controllers/carts";
import { protectedFunc } from "../../utils/protectedFunc";
import { updateData } from "../../utils/updateData";

export const cartRouter = Router();

cartRouter
  .get(
    "/:userId",
    protectedFunc(async (req: Request, res: Response) => {
      const { userId } = req.params;
      const { total, orderDetails } =
        await fetchUserTotalAndOrderDetails(userId);
      res.status(200).json({ total, orderDetails });
    }),
  )
  .get(
    "/empty-cart/:userId",
    protectedFunc(async (req: Request, res: Response) => {
      const { userId } = req.params;
      const resp = await emptyCart(userId);
      updateData();
      res.status(200).json(resp);
    }),
  );
