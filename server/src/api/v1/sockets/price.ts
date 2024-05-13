import ws from "ws";
import { Communication } from "../../utils/communication";
import { Products } from "../schemas/products";
import createHttpError from "http-errors";

export const priceWs = new ws.WebSocketServer({ noServer: true });
export const priceCom = new Communication();

priceWs.on("connection", async (socket, req) => {
  // Todo Add an interval to check for heart beat, as shown in documentation
  const productId = req.headers.product_id as string;
  console.log(`Recvd a socket req on by product ${productId}`);
  priceCom.addSocket(productId, socket);

  socket.on("message", (msg) => {
    console.log("recieved message:", msg.toString());
  });

  socket.on("close", () => {
    console.log(`closing the socket for ${productId}`);
    priceCom.removeSocket(productId);
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
