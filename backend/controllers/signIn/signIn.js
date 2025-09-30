const jwt = require("jsonwebtoken");
const users = require("../../models/auth/auth.js");
const bcrypt = require("bcryptjs");

const SECRET_KEY =
  "signINSecretKeyForJWTsignINSecretKeyForJWTsignINSecretKeyForJWTsignINSecretKeyForJWT";

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("email from body", email);

    // 1. Find user by email
    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 3. Generate token
    const token = jwt.sign(
      {
        email: user.email,
      },
      SECRET_KEY,
      { expiresIn: "5s" }
    );

    // 4. Return token
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        password: user.password,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signIn };
