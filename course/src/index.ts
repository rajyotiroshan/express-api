import * as dotenv from "dotenv";
dotenv.config();
import config from "./config";
import app from "./server";

app.listen(config.port, () => {
  console.log(`http://localhost:${config.port}`);
});

/* const http = require("http");

const server = http.createServer(
  /*async (req, res) => {
    /*     console.log("req");
    console.log(req);
    console.log(res);
    console.log(res); */
/* console.log("Hello from server");
    if (req.method === "GET" && req.url === "/favicon.ico") {
      //console.log("fetching favicon");
      res.statusCode = 204;
      res.end();
    }
    if (req.method === "GET" && req.url === "/") {
      // console.log("fetching main");
      res.statusCode = 200;
      res.end();
    }
  }
);*/

/* server.listen(3001, () => {
  console.log("server on http://localhost:3001");
}); */
