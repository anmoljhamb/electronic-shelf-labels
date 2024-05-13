export type IProduct = {
  title: string;
  desc: string;
  price: number;
  productId: string;
};

export type RFIDResponse = {
  duration: number;
  uid: string;
};
