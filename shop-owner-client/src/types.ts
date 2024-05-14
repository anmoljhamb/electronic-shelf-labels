import * as Yup from "yup";

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

export type FormField = {
  name: string;
  label: string;
} & (OtherFormField | OptionFormField);

interface OtherFormField {
  type: "text" | "password";
}

export interface AutoCompleteOption {
  label: string;
  value: string;
}

interface OptionFormField {
  type: "option";
  choices: AutoCompleteOption[];
  defaultValue?: AutoCompleteOption;
}

export type ValidationSchemaInterface = Yup.ObjectSchema<
  { [key: string]: string },
  Yup.AnyObject,
  { [key: string]: undefined },
  ""
>;
