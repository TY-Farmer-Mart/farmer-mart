const bcrypt = require("bcryptjs");
const users = require("../../models/auth/auth.js");

const signUp = async (req, res) => {
  const { name, email, contact, role, password, confirmPassword, about } =
    req.body;

  // 1. Basic validation
  if (!name || !email || !contact || !password) {
    return res
      .status(400)
      .json({ message: "All required fields must be filled" });
  }

  try {
    // 2. Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create new user
    const newUser = new users({
      name,
      email,
      contact,
      role,
      password: hashedPassword,
      about,
    });

    await newUser.save();

    // 5. Send success response
    res
      .status(201)
      .json({ message: "Sign up successful", userId: newUser._id });
  } catch (err) {
    console.error("Error in signup:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { signUp };
