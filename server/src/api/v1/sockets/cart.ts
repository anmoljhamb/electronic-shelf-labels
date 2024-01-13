import ws from "ws";
import { Communication } from "../../utils/communication";

export const cartWs = new ws.WebSocketServer({ noServer: true });
export const cartCom = new Communication();

cartWs.on("connection", async (socket, req) => {
  // Todo Add an interval to check for heart beat, as shown in documentation
  const productId = req.headers.product_id as string;
  console.log(`Recvd a socket req on by product ${productId}`);
  cartCom.addSocket(productId, socket);

  socket.on("message", (msg) => {
    console.log("recieved message:", msg.toString());
  });

  socket.on("close", () => {
    console.log("closing the socket for ${productId}");
    cartCom.removeSocket(productId);
  });

  socket.on("error", (err) => {
    console.log(err);
  });

  socket.on("unexpected-response", (resp) => {
    console.log(resp);
  });
});
