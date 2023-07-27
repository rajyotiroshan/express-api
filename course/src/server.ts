import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./router";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";
const app = express();

/* const customLogger = (message) => (req, res, next) => {
  console.log(`Hello from ${message}`);
  next();
}; */
/**
 * Global middleware
 */
//above all the route declaration
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(customLogger("custome logger"));

//just block all req
/* app.use((req, res, next) => {
  res.status(401)
  res.send('Nope')
}); */

app.use((req, res, next) => {
  req.shh_secret = "dogyy";
  next();
});

app.get("/", (req, res, next) => {
  /*   setTimeout(() => {
    next(new Error("Hello error"));
  }, 1000); */

  /*   setTimeout(()=>{
    throw new Error( "error")
  }, 1000) */
  //throw new Error("Synch Error handling");
  console.log("handler start");
  res.status(200).json({ message: "hello user" });
});

app.use("/api", protect, router);
app.post("/user", createNewUser);

app.post("/signin", signin);

//registered error handler for shynchronous request

app.use((err, req, res, next) => {
  console.log(err);
  if (err.type === "auth") {
    res.status(401).json({ msg: "Unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ msg: "invalid input" });
  } else {
    res.status(500).json({ msg: "server side error" });
  }
});
export default app;
