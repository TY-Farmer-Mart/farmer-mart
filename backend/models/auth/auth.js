const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true, // needed during register
      trim: true,
    },
    alternateEmail: {
      type: String,
      default: "",
      trim: true,
    },
    alternateContact: {
      type: String,
      default: "",
      trim: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "vendor", "consultant"],
      default: "user",
    },
    gstNumber: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true, // always required for register
    },
    about: {
      type: String,
      default: "",
    },

    address: { type: String },
    dob: { type: Date },
    profilePic: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema, "users");
