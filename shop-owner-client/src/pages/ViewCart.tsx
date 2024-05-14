import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import NotFoundPage from "./NotFoundPage";
import { ImageBg } from "../components/ImageBg";
import { Button, Divider, Typography } from "@mui/material";
import axios from "axios";
import { apiUri } from "../constants";
import { CartContext } from "../contexts/CartContext";

const ViewCart = () => {
  const params = useLocation();
  const { carts } = useContext(CartContext)!;

  const uid: string = new URLSearchParams(params.search).get(
    "userId",
  ) as string;

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return <LoadingPage />;
  }

  if (!(uid in carts)) {
    return <NotFoundPage />;
  }

  const cart = carts[uid];

  const emptyCart = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(`${apiUri}/carts/empty-cart/${uid}`);
      console.log(resp);
      navigate("/carts");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-bgColor relative flex h-screen w-[calc(100%)] flex-col items-center justify-center">
        <ImageBg />
        <div className="z-10 mx-auto flex h-[94%] w-11/12 flex-col items-center justify-center overflow-y-auto rounded-md bg-white p-4 text-black lg:max-w-[55%]">
          <Typography variant="h4" className="w-full text-center">
            View Cart Details for {cart!.userId}
          </Typography>
          <Divider className="my-4 w-full" />
          <Typography variant="h5" className="mb-4 w-full text-center">
            Order Total: ${cart!.total}
          </Typography>
          <table className="mx-auto w-[80%]">
            <thead>
              <tr>
                <th className="w-[15%] border border-black p-2">#</th>
                <th className="w-[15%] border border-black p-2">
                  Product Name
                </th>
                <th className="w-[15%] border border-black p-2">
                  Product Price
                </th>
                <th className="w-[15%] border border-black p-2">Product QTY</th>
                <th className="w-[15%] border border-black p-2">
                  Product Total
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(cart.orderDetails).map((key, index) => {
                return (
                  <tr key={key}>
                    <td className="border border-black p-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-black p-2 text-center">
                      {cart.orderDetails[key].item.title}
                    </td>
                    <td className="border border-black p-2 text-center">
                      ${cart.orderDetails[key].item.price}
                    </td>
                    <td className="border border-black p-2 text-center">
                      {cart.orderDetails[key].qty}
                    </td>
                    <td className="border border-black p-2 text-center">
                      $
                      {cart.orderDetails[key].qty *
                        cart.orderDetails[key].item.price}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Button
            className="my-4 w-full"
            variant="contained"
            onClick={emptyCart}
            disabled={loading}
          >
            Checkout
          </Button>
        </div>
      </section>
    </>
  );
};

export default ViewCart;
