import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log("express log");

  res.status(200);
  res.json({ message: "hello user" });
});

export default app;
