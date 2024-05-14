import { useEffect, useState } from "react";
import { backendUri } from "../constants";
import { OrderDetail } from "../types";
import SideDrawer from "../components/SideDrawer";
import { ImageBg } from "../components/ImageBg";
import { Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CartsPage() {
  const [messages, setMessages] = useState<string[]>([]);
  let socket: WebSocket | null = null;
  const [carts, setCarts] = useState<
    Array<{
      total: number;
      orderDetails: Record<string, OrderDetail>;
      userId: string;
    }>
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket = new WebSocket(backendUri);

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      console.log(event.data);
      setCarts(JSON.parse(event.data));
      setMessages((prevMessages) => [...prevMessages, event.data]);
      console.log(JSON.parse(event.data));
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
      socket = new WebSocket(backendUri);
    };

    return () => {
      // Clean up the WebSocket connection when component unmounts
      if (socket) {
        socket.close();
      }
    };
  }, []);

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
              {carts.map((cart, index) => {
                return (
                  <tr key={cart.userId}>
                    <td className="border border-black p-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-black p-2 text-center">
                      {cart.userId}
                    </td>
                    <td className="border border-black p-2 text-center">
                      {cart.total}
                    </td>
                    <td className="border border-black p-2 text-center">
                      <Button
                        onClick={() => {
                          const url = `/view/submission?uid=${submission.uid}`;
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
          {carts.length === 0 && <h1>No carts present</h1>}
        </div>
      </section>
    </>
  );
}

export default CartsPage;
