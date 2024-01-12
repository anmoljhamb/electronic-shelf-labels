import ws from "ws";
import { Communication } from "../../utils/communication";
import { Products } from "../schemas/products";
import createHttpError from "http-errors";

export const cartWs = new ws.WebSocketServer({ noServer: true });

cartWs.on("connection", async (socket, req) => {
  // Todo Add an interval to check for heart beat, as shown in documentation
  const productId = req.headers.product_id as string;
  console.log(`Recvd a socket req on by product ${productId}`);
  Communication.addSocket(productId, socket);

  socket.on("message", (msg) => {
    try {
      const data = JSON.parse(msg.toString());
      console.log(data);
    } catch (e) {
      console.log("Error while parsing json. Input: ");
      console.log(msg);
    }
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

  try {
    const product = await Products.findOne({ productId });
    if (!product)
      throw new createHttpError.NotFound("The product was not found.");
    socket.send(product.price);
  } catch (err) {
    console.log(err);
    socket.send("Product Not Found.");
  }
});
