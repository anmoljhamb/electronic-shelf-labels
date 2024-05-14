import SideDrawer from "../components/SideDrawer";
import { ImageBg } from "../components/ImageBg";
import { Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IProduct } from "../types";
import axios from "axios";
import { apiUri } from "../constants";

function ProductsPage() {
  const navigate = useNavigate();

  // const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const resp = await axios.get(`${apiUri}/products`);
        setProducts(resp.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  return (
    <>
      <SideDrawer />
      <section className="bg-bgColor relative ml-[200px] flex h-screen w-[calc(100%-200px)] flex-col items-center justify-center">
        <ImageBg />
        <div className="z-10 flex max-h-[94%] w-11/12 flex-col overflow-y-auto rounded-md bg-white p-4 text-black">
          <Typography variant="h4" className="text-center">
            All Products
          </Typography>
          <Divider className="my-4" />
          <table className="w-full overflow-x-hidden overflow-y-scroll">
            <thead className="w-full">
              <tr className="w-full">
                <th className="w-1/4 border border-black">#</th>
                <th className="w-1/4 border border-black">Title</th>
                <th className="w-1/4 border border-black">Desc</th>
                <th className="w-1/4 border border-black">ID</th>
                <th className="w-1/4 border border-black">Price</th>
                <th className="w-1/4 border border-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return (
                  <tr key={index}>
                    <td className="border border-black p-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-black p-2 text-center">
                      {product.title}
                    </td>
                    <td className="border border-black p-2 text-center">
                      ${product.desc}
                    </td>
                    <td className="border border-black p-2 text-center">
                      {product.productId}
                    </td>
                    <td className="border border-black p-2 text-center">
                      ${product.price}
                    </td>
                    <td className="border border-black p-2 text-center">
                      <Button
                        onClick={() => {
                          const url = `/view/products?productId=${product.productId}`;
                          navigate(url);
                        }}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default ProductsPage;
