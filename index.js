const WebSocket = require("ws");

const INNER_PORT = process.env.INNER_PORT;
const OUTER_PORT = process.env.OUTER_PORT;

// const outerServer = new WebSocket.Server({
//   host: "0.0.0.0",
//   port: OUTER_PORT || 9000
// });
// const innerServer = new WebSocket.Server({
//   host: "localhost",
//   port: INNER_PORT || 9001
// });

//
let client = new WebSocket(`ws://game.mengmax.fun:10000`);
const server = new WebSocket.Server({
  host: "0.0.0.0",
  port: 9977
});
let outer;
client.on("open", () => {
  console.log("connected");

  server.on("connection", socket => {
    console.log("on connection");
    outer = socket;
    socket.on("close", (code, reason) => {
      console.error(`on close. code=${code},reason=${reason}`);
    });

    socket.on("error", err => {
      console.error(`on error. err=${err}`);
    });

    socket.on("message", data => {
      // console.log(`from outer, ${data}`);
      client.send(data);
    });
  });

  client.on("message", data => {
    // console.log(`return outer, ${data}`);
    outer.send(data);
  });
});
client.on("close", (code, reason) => {
  // client.reconnect();
  console.log(`code=${code},reason=${reason}`);
});
client.on("error", err => {
  console.error(`${err}`);
});

// function reconnect() {
//   delete client;
//   if (client.reconnect)

//   client = new WebSocket(`ws://game.mengmax.fun:10000`);
// }
