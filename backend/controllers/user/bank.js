const Bank = require("../../models/bank/bankModal");

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

module.exports = { updateBankDetails };
