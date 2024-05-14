import ws from "ws";
import { Communication } from "../../utils/communication";
import { RFIDResponse } from "../types";
import { TAKE_LIMIT, LOWER_LIMIT } from "../constants";
import { Carts } from "../schemas/carts";
import { getAllUsers } from "../controllers/carts";
import { clients } from "./client";
import { updateData } from "../../utils/updateData";

export const cartWs = new ws.WebSocketServer({ noServer: true });
export const cartCom = new Communication();

cartWs.on("connection", async (socket, req) => {
  // Todo Add an interval to check for heart beat, as shown in documentation
  const productId = req.headers.product_id as string;
  console.log(`Recvd a socket req on by product ${productId}`);
  cartCom.addSocket(productId, socket);

  socket.on("message", async (msg) => {
    const data: RFIDResponse = JSON.parse(msg.toString());
    console.log("recieved data:", data);
    if (data.duration <= LOWER_LIMIT) {
      socket.send("IGNORE");
      return;
    }

    if (data.duration <= TAKE_LIMIT) {
      const cart = new Carts({ productId, userId: data.uid });
      await cart.save();
      socket.send("TAKE");
    } else {
      await Carts.findOneAndDelete({
        productId,
        userId: data.uid,
      });
      socket.send("REMOVE");
    }

    try {
      updateData();
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("close", () => {
    console.log(`closing the socket for ${productId}`);
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
