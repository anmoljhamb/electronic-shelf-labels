import ws from "ws";

export const echoWs = new ws.WebSocketServer({ noServer: true });

echoWs.on("connection", (socket) => {
  socket.on("message", (msg) => {
    console.log("recieved message:", msg);
  });
  socket.send("welcome");
});
