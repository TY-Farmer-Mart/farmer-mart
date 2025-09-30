// const mongoose = require("mongoose");

// const authSchema = new mongoose.Schema({
//   name: {
//     type: String,
//   },
//   email: {
//     type: String,
//     unique: true, // email should be unique for login
//   },
//   contact: {
//     type: String,
//   },
//   role: {
//     type: String,
//     default: "user",
//   },
// });

// module.exports = mongoose.model("auth", authSchema, "auth");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // needed during register
      trim: true,
    },
    email: {
      type: String,
      required: true, // needed during register & login
      unique: true,
      lowercase: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true, // needed during register
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: true, // always required for register
    },
    about: {
      type: String,
      default: "",
    },

    // 🔮 Future fields (optional now, can be used later)
    address: { type: String },
    dob: { type: Date },
    profilePic: { type: String }, // can store image URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema, "users");
// "users" = collection name in MongoDB
