import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middlewares";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/products";
import {
  createUpdate,
  deleteAnUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/updates";
const router = Router();

/**
 * Poduct router
 */
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
/**
 * Update the productname
 */
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);

/**
 * create new product
 */
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);

/**
 * Delete a product
 */
router.delete("/product/:id", deleteProduct);

/*********
 * ***********
 * ******
 */

/**
 * Update
 */
router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);

/**
 * Update the update for a product
 */
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional(),
  updateUpdate
);

/**
 * Create a new update
 */
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  createUpdate
);
router.delete("/update/:id", deleteAnUpdate);

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

router.use((err, req, res, next) => {
  res.status(500).json({ msg: "in router handler" });
});
export default router;
