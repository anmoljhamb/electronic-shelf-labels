import React, { useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { ICart } from "../types";
import { socketBackendUri } from "../constants";

type Props = {
  children: React.ReactNode;
};

const CartProvider = (props: Props) => {
  let socket: WebSocket | null = null;
  const [carts, setCarts] = useState<Record<string, ICart>>({});

  useEffect(() => {
    socket = new WebSocket(socketBackendUri);

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      const data: ICart[] = JSON.parse(event.data);
      const temp: Record<string, ICart> = {};
      data.forEach((cart) => {
        temp[cart.userId] = cart;
      });
      setCarts(temp);
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
      socket = new WebSocket(socketBackendUri);
    };

    return () => {
      // Clean up the WebSocket connection when component unmounts
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <CartContext.Provider value={{ carts }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
