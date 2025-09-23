const express = require("express");
// const verifyToken = require("../../authMiddleware");
const { signIn } = require("../../controllers/signin/signIn");
const { signUp } = require("../../controllers/signup/signUp");

const router = express.Router();
console.log("auth routes loaded");

router.post("/signin", signIn);
router.post("/signup", signUp);
// router.get("/validate-token", verifyToken);

module.exports = router;
