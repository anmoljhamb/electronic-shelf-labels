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
