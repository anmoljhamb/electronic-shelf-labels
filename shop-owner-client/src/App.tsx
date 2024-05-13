import { useEffect, useState } from "react";
import { backendUri } from "./constants";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  let socket: WebSocket | null = null;

  useEffect(() => {
    socket = new WebSocket(backendUri);

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
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
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}

export default App;
