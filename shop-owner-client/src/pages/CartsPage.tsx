import SideDrawer from "../components/SideDrawer";
import { ImageBg } from "../components/ImageBg";
import { Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

function CartsPage() {
  const navigate = useNavigate();
  const { carts } = useContext(CartContext)!;

  return (
    <>
      <SideDrawer />
      <section className="bg-bgColor relative ml-[200px] flex h-screen w-[calc(100%-200px)] flex-col items-center justify-center">
        <ImageBg />
        <div className="z-10 flex max-h-[94%] w-11/12 flex-col overflow-y-auto rounded-md bg-white p-4 text-black">
          <Typography variant="h4" className="text-center">
            Current Carts
          </Typography>
          <Divider className="my-4" />
          <table className="w-full overflow-x-hidden overflow-y-scroll">
            <thead className="w-full">
              <tr className="w-full">
                <th className="w-1/4 border border-black">#</th>
                <th className="w-1/4 border border-black">Customer ID</th>
                <th className="w-1/4 border border-black">Total</th>
                <th className="w-1/4 border border-black">action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(carts).map((key, index) => {
                const cart = carts[key];
                return (
                  <tr key={cart.userId}>
                    <td className="border border-black p-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-black p-2 text-center">
                      {cart.userId}
                    </td>
                    <td className="border border-black p-2 text-center">
                      ${cart.total}
                    </td>
                    <td className="border border-black p-2 text-center">
                      <Button
                        onClick={() => {
                          const url = `/view/carts?userId=${cart.userId}`;
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
          {Object.keys(carts).length === 0 && <h1>No carts present</h1>}
        </div>
      </section>
    </>
  );
}

export default CartsPage;
