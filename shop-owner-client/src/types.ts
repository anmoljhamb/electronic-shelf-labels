export type IProduct = {
  title: string;
  desc: string;
  price: number;
  productId: string;
};

export type OrderDetail = {
  item: IProduct;
  qty: number;
};

export type ICart = {
  total: number;
  orderDetails: Record<string, OrderDetail>;
  userId: string;
};
