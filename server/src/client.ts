import ws from "ws";

const wss = new ws("ws://localhost:8080/echo");
wss.on("message", (msg) => {
  console.log(msg.toString("utf-8"));
});
wss.on("open", () => {
  wss.send("hello");
});
