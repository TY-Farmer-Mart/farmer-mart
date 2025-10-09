const Company = require("../../models/company/companyModal");
// Get Company Details
const getCompanyDetails = async (req, res) => {
  try {
    const { id } = req.body;

    console.log("user id for company fetch", id);

    if (!id) {
      return res.status(400).json({ message: "Company id is required" });
    }

    const company = await Company.findOne({ userId: id });

    if (!company) {
      return res.status(404).json({ message: "Company details not found" });
    }

    res.status(200).json({
      message: "Company details fetched successfully",
      company,
    });
  } catch (err) {
    console.error("Error fetching company details:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

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

module.exports = { updateCompanyInfo, getCompanyDetails };
