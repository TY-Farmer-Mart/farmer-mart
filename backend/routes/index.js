const express = require("express");
const authRoutes = require("./authRoute/authRoutes.js");

const router = express.Router();
console.log("routes/index.js loaded");

router.use("/auth", authRoutes);

module.exports = router;
