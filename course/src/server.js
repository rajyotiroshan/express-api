const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("express log");

  res.status(200);
  res.json({ message: "hello" });

});

app.listen(3001, ()=>{
    console.log("http:/localhost:3001")
})