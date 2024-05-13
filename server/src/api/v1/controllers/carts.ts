import { Carts } from "../schemas/carts";
import { IProduct } from "../types";
import { fetchProductById } from "./products";

export const fetchUserTotalAndOrderDetails = async (userId: string) => {
  const uniqueProductIds = new Set<string>();
  const carts = await Carts.find({ userId });
  carts.forEach((cart) => {
    console.log(cart.productId);
    uniqueProductIds.add(cart.productId as string);
  });

  const promises = carts.map((cart) =>
    fetchProductById(cart.productId as string),
  );

  const resp = await Promise.all(promises);
  const data: Record<string, IProduct> = {};
  resp.forEach((entry) => {
    console.log(entry);
    if (!entry) return;
    data[entry.productId] = {
      title: entry.title,
      price: entry.price,
      desc: entry.desc,
      productId: entry.productId,
    };
  });

  let total = 0;
  carts.forEach((cart) => {
    const product = data[cart.productId!];
    console.log(product);
    total += product.price;
  });
  console.log(total);
  const orderDetails: never[] = [];
  return { total, orderDetails };
};
