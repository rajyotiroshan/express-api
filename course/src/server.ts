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
  console.log("handler start");
  res.status(200);
  res.json({ message: "hello user" });
  console.log("handler end");
});

app.use("/api", protect, router);
app.post("/user", createNewUser);

app.post("/signin", signin);
export default app;
