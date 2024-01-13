import ws from "ws";
import { Communication } from "../../utils/communication";
import { RFIDResponse } from "../types";
import { TAKE_LIMIT, LOWER_LIMIT } from "../constants";

export const cartWs = new ws.WebSocketServer({ noServer: true });
export const cartCom = new Communication();

cartWs.on("connection", async (socket, req) => {
  // Todo Add an interval to check for heart beat, as shown in documentation
  const productId = req.headers.product_id as string;
  console.log(`Recvd a socket req on by product ${productId}`);
  cartCom.addSocket(productId, socket);

  socket.on("message", (msg) => {
    const data: RFIDResponse = JSON.parse(msg.toString());
    console.log("recieved data:", data);
    if (data.duration <= LOWER_LIMIT) {
      socket.send("IGNORE");
    } else if (data.duration <= TAKE_LIMIT) {
      socket.send("TAKE");
    } else {
      socket.send("REMOVE");
    }
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

  socket.send("Hello from server.");
});
