import express from "express";
import router from "./router";
const app = express();

app.get("/", (req, res) => {
  console.log("express log");

  res.status(200);
  res.json({ message: "hello user" });
});

app.use("/api", router);

export default app;
