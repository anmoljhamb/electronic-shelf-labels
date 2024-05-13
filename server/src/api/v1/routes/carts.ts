import { Request, Response, Router } from "express";
import { fetchUserTotalAndOrderDetails } from "../controllers/carts";
import { protectedFunc } from "../../utils/protectedFunc";

export const cartRouter = Router();

cartRouter.get(
  "/:userId",
  protectedFunc(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { total, orderDetails } = await fetchUserTotalAndOrderDetails(userId);
    res.status(200).json({ total, orderDetails });
  }),
);
