const express = require("express");
const { signIn } = require("../../controllers/signIn/signIn");
const { signUp } = require("../../controllers/signUp/signUp");
// const verifyToken = require("../../authMiddleware");

const router = express.Router();
console.log("auth routes loaded");

router.post("/signin", signIn);
router.post("/signup", signUp);
// router.get("/validate-token", verifyToken);

module.exports = router;
