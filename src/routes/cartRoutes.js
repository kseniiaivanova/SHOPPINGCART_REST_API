const express = require("express");

const router = express.Router();
const {
  getAllCarts,
  getCartById,
  createNewCart,

  addProductToCart,
  deleteCartById,
  deleteProductFromCart,
} = require("../controllers/cartController");

router.get("/", getAllCarts);
router.get("/:cartId", getCartById);
router.post("/", createNewCart);

router.post("/:cartId/products", addProductToCart);
router.delete("/:cartId", deleteCartById);
router.delete("/:cartId/products/", deleteProductFromCart);

module.exports = router;
