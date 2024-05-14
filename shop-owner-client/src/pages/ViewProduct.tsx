import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import NotFoundPage from "./NotFoundPage";
import { ImageBg } from "../components/ImageBg";
import { Divider, Typography } from "@mui/material";
import axios from "axios";
import { apiUri } from "../constants";
import { IProduct } from "../types";
import { Form } from "../components/Form";
import SideDrawer from "../components/SideDrawer";

const ViewProduct = () => {
  const params = useLocation();

  const uid: string = new URLSearchParams(params.search).get(
    "productId",
  ) as string;

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [details, setDetails] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const resp = await axios(`${apiUri}/products/${uid}`);
      console.log(resp.data.product);
      setDetails(resp.data.product);
      setLoading(false);
    };

    fetch();
    console.log(uid);
  }, [uid]);

  if (loading) {
    return <LoadingPage />;
  }

  if (details === null) {
    return <NotFoundPage />;
  }

  const updateProduct = async (initalValues: Record<string, string>) => {
    setLoading(true);
    try {
      const resp = await axios.patch(`${apiUri}/products/${uid}`, {
        ...initalValues,
        price: Number.parseFloat(initalValues.price),
      });
      console.log(resp);
      navigate("/products");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SideDrawer />
      <section className="bg-bgColor relative ml-[200px] flex h-screen w-[calc(100%-200px)] flex-col items-center justify-center">
        <ImageBg />
        <div className="z-10 mx-auto flex h-[94%] w-11/12 flex-col items-center justify-center overflow-y-auto rounded-md bg-white p-4 text-black lg:max-w-[55%]">
          <Typography variant="h4" className="w-full text-center">
            View Product Details for {details.productId}
          </Typography>
          <Divider className="my-4 w-full" />
          <Form
            loading={loading}
            initialValues={{
              title: details.title,
              desc: details.desc,
              productId: details.productId,
              price: details.price.toString(),
            }}
            formFields={[
              { name: "title", type: "text", label: "Product Title" },
              { name: "desc", type: "text", label: "Product Description" },
              { name: "productId", type: "text", label: "Product ID" },
              { name: "price", type: "text", label: "Product Price" },
            ]}
            buttonText="Update Product"
            onSubmit={updateProduct}
          />
        </div>
      </section>
    </>
  );
};

export default ViewProduct;
