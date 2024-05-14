import { Carts } from "../schemas/carts";
import { IProduct, OrderDetail } from "../types";
import { fetchProductById } from "./products";

export const getAllUsers = async () => {
  const carts = await Carts.find({});
  const userIds = new Set<string>();
  carts.forEach((cart) => {
    userIds.add(cart.userId as string);
  });
  const users = Array.from(userIds);
  const promises = users.map((user) => fetchUserTotalAndOrderDetails(user));
  const resp = await Promise.all(promises);
  return resp;
};

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
  const orderDetails: Record<string, OrderDetail> = {};
  carts.forEach((cart) => {
    const product = data[cart.productId!];
    if (product.productId in orderDetails) {
      orderDetails[product.productId]["qty"] += 1;
    } else {
      orderDetails[product.productId] = { item: product, qty: 1 };
    }
    console.log(product);
    total += product.price;
  });
  console.log(total);
  return { total, orderDetails, userId };
};

export const emptyCart = async (userId: string) => {
  console.log(userId);
  return await Carts.deleteMany({ userId });
};
