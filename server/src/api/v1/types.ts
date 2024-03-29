export type IProduct = {
  title: string;
  desc: string;
  price: number;
  productId: string;
  prevPrice: number;
};

export type RFIDResponse = {
  duration: number;
  uid: string;
};
