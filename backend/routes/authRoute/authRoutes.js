const express = require("express");
const { signIn } = require("../../controllers/signIn/signIn");
const { signUp } = require("../../controllers/signUp/signUp");

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);

module.exports = router;
