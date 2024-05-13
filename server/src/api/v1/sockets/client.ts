import ws from "ws";

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
});
