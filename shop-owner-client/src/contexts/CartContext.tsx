import { createContext } from "react";
import { ICart } from "../types";

export const CartContext = createContext<{
  carts: Record<string, ICart>;
} | null>(null);
