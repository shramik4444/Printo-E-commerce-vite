const express = require("express");
const router = express.Router();
const auth = require('../Middleware/Auth.middleware');
const { addToCart, getCart, removeFromCart } = require("../Controllers/CartController");

router.post("/", auth, addToCart);
router.get("/", auth, getCart);
router.delete("/:id", auth, removeFromCart);

module.exports = router;
