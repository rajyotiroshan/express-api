import { error } from "console";
import { Router } from "express";
import { body, validationResult } from "express-validator";
const router = Router();

/**
 * Poduct router
 */
router.get("/product", (req, res) => {
  res.json({ msg: "hello", secret: req.shh_secret });
});
router.get("/product/:id", () => {});
/**
 * Update the username
 */
router.put("/product/:id", body("name").isString(), (req, res) => {
  console.log("product update");
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
    console.log("errors msg sent");
  }
});

router.post("/product", () => {});
router.delete("/product/:id", () => {});

/**
 * Update
 */
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put("/update/:id", () => {});
router.post("/update", () => {});
router.delete("/update/:id", () => {});

/**
 * Update Point
 */

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put("/updatepoint/:id", () => {});
router.post("/updatepoint", () => {});
router.delete("/updatepoint/:id", () => {});

export default router;
