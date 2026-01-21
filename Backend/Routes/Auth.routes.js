const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/AuthController");
const role = require('../Middleware/Role.middleware');
const { updateProduct } = require("../Controllers/ProductController");



// ADMIN LOGIN
router.post("/admin/login", AuthController.adminLogin);

// router.put(
//     "/products/edit/:id",
//     AuthController.adminLogin,
//     role("admin"),
//     updateProduct
// );

router.post("/login", AuthController.userLogin);


module.exports = router;
