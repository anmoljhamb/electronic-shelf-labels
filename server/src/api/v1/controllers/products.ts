import { Products } from "../schemas/products";

export const fetchAllProducts = async () => {
  return await Products.find({});
};

export const fetchProductById = async (productId: string) => {
  return await Products.findOne({ productId });
};

export const createNewProduct = async (body: any) => {
  const product = new Products({ ...body });
  return await product.save();
};

export const deleteProductById = async (productId: string) => {
  return await Products.findOneAndDelete({ productId });
};

export const updateProductById = async (productId: string, body: any) => {
  return await Products.findOneAndUpdate({ productId }, body, {
    new: true,
  });
};
