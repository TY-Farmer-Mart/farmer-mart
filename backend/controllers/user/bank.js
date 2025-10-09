const Bank = require("../../models/bank/bankModal");

const getBankDetails = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("user id for bank fetch", id);

    if (!id) {
      return res.status(400).json({ message: "Bank id is required" });
    }

    const bank = await Bank.findOne({ userId: id });

    if (!bank) {
      return res.status(404).json({ message: "Bank details not found" });
    }

    res.status(200).json({
      message: "Bank details fetched successfully",
      bank,
    });
  } catch (err) {
    console.error("Error fetching bank details:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};
const updateBankDetails = async (req, res) => {
  try {
    const {
      id,
      accountHolderName,
      accountNumber,
      ifscCode,
      bankName,
      branchName,
    } = req.body;

    if (!id) return res.status(400).json({ message: "User id is required" });

    const bank = await Bank.findOneAndUpdate(
      { userId: id },
      { accountHolderName, accountNumber, ifscCode, bankName, branchName },
      { upsert: true, new: true }
    );

    res
      .status(200)
      .json({ message: "Bank details updated successfully", bank });
  } catch (err) {
    console.error("Error updating bank details:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { updateBankDetails, getBankDetails };
