import ws from "ws";
import { getAllUsers } from "../controllers/carts";

export const clientWs = new ws.WebSocketServer({ noServer: true });
export const clients: ws[] = [];

clientWs.on("connection", async (socket, _req) => {
  clients.push(socket);
  socket.on("message", (msg) => {
    console.log("recieved message:", msg.toString());
  });

  socket.on("close", () => {
    console.log("closing the socket.");
  });

  socket.on("error", (err) => {
    console.log(err);
  });

  socket.on("unexpected-response", (resp) => {
    console.log(resp);
  });

  try {
    const users = await getAllUsers();
    console.log("sending", JSON.stringify(users));
    socket.send(JSON.stringify(users));
  } catch (err) {
    console.log(err);
  }
});
