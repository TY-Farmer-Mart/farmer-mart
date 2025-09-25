const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: Number,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema, "auth");
