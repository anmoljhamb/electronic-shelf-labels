import ws from "ws";
import { Communication } from "../../utils/communication";

export const echoWs = new ws.WebSocketServer({ noServer: true });

echoWs.on("connection", (socket, req) => {
  // Todo Add an interval to check for heart beat, as shown in documentation
  const productId = req.headers.product_id as string;
  console.log(`Recvd a socket req on by product ${productId}`);
  Communication.addSocket(productId, socket);

  socket.send("welcome");

  socket.on("message", (msg) => {
    console.log("recieved message:", msg.toString());
  });

  socket.on("close", () => {
    console.log("closing the socket for ${productId}");
    Communication.removeSocket(productId);
  });

  socket.on("error", (err) => {
    console.log(err);
  });

  socket.on("unexpected-response", (resp) => {
    console.log(resp);
  });
});
