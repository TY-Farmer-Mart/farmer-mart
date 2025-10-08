const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    accountHolderName: { type: String, required: true },
    accountNumber: { type: Number, required: true },
    ifscCode: { type: String, required: true },
    bankName: { type: String },
    branchName: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bank", bankSchema, "banks");
