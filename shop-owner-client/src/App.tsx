import { useEffect, useState } from "react";
import { backendUri } from "./constants";
import { OrderDetail } from "./types";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  let socket: WebSocket | null = null;
  const [carts, setCarts] = useState<
    Array<{
      total: number;
      orderDetails: Record<string, OrderDetail>;
      userId: string;
    }>
  >([]);

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
      {carts.length === 0 && <h1>No carts present</h1>}
      {carts.map((cart, index) => {
        return (
          <div key={index}>
            <h1>{cart.userId}</h1>
            {Object.keys(cart.orderDetails).map((key) => {
              console.log(key);
              return (
                <div key={key}>
                  {cart.orderDetails[key].item.title}-
                  {cart.orderDetails[key].qty}
                </div>
              );
            })}
            {cart.total}
          </div>
        );
      })}
    </>
  );
}

export default App;
