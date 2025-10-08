const express = require("express");
const authRoutes = require("./authRoute/authRoutes.js");
const userRoutes = require("./userRoute/userRoutes.js");

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/user", userRoutes);

module.exports = router;
