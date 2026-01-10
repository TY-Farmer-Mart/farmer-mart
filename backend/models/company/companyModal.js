const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    companyName: { type: String, required: true },
    companyType: { type: String },
    gstNumber: { type: String },
    pan: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    googleBusiness: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pinCode: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema, "companies");

