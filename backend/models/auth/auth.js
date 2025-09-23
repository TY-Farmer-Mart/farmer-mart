const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true, // email should be unique for login
  },
  contact: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("auth", authSchema, "auth");
// last "auth" ensures it uses your existing collection
