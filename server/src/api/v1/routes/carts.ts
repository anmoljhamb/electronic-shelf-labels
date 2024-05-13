import { Router } from "express";
import { fetchUserTotal } from "../controllers/carts";

export const cartRouter = Router();

cartRouter.get("/:userId", fetchUserTotal);
