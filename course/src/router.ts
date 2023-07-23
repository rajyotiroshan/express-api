import { error } from "console";
import { Router } from "express";
import { body, validationResult, oneOf } from "express-validator";
import { handleInputErrors } from "./modules/middlewares";
const router = Router();

/**
 * Poduct router
 */
router.get("/product", (req, res) => {
  res.json({ msg: "hello", secret: req.shh_secret });
});
router.get("/product/:id", () => {});
/**
 * Update the productname
 */
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {}
);

/**
 * create new product
 */
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {}
);

/**
 * Delete a product
 */
router.delete("/product/:id", () => {});

/**
 * Update
 */
router.get("/update", () => {});
router.get("/update/:id", () => {});

/**
 * Update the update for a product
 */
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("version").optional(),
  (req, res) => {}
);

/**
 * Create a new update
 */
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),

  (req, res) => {}
);
router.delete("/update/:id", () => {});

/**
 * Update Point
 */

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});

/**
 * Update name of update point
 */
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  (req, res) => {}
);

/**
 *Creating an update point
 */
router.post(
  "/updatepoint",
  body("name").optional().isString(),
  body("description").optional().isString(),
  body("updateid").exists().isString(),
  (req, res) => {}
);

router.delete("/updatepoint/:id", () => {});

export default router;
