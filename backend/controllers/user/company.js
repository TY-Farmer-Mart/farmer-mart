const Company = require("../../models/company/companyModal");

const updateCompanyInfo = async (req, res) => {
  try {
    const {
      id,
      companyName,
      companyType,
      gstNumber,
      address,
      city,
      state,
      country,
      pinCode,
    } = req.body;

    if (!id) return res.status(400).json({ message: "User id is required" });

    const company = await Company.findOneAndUpdate(
      { userId: id },
      {
        companyName,
        companyType,
        gstNumber,
        address,
        city,
        state,
        country,
        pinCode,
      },
      { upsert: true, new: true }
    );

    res
      .status(200)
      .json({ message: "Company info updated successfully", company });
  } catch (err) {
    console.error("Error updating company info:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { updateCompanyInfo };
