const users = require("../../models/auth/auth.js");

// Get Profile Details
const getProfile = async (req, res) => {
  console.log("passed id for profile from fe", req.body);
  try {
    console.log("testing>>>>>>>>>>>>>>>>>>>>>>>>>>>>>...", req)
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User id is required" });
    }

    const user = await users.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// Edit Profile
const editProfile = async (req, res) => {
  try {
    const {
      id,
      name,
      contact,
      alternateContact,
      alternateEmail,
      address,
      about,
    } = req.body;

    console.log("data from front end in req body", req.body);

    if (!id) return res.status(400).json({ message: "User id is required" });

    const updatedUser = await users.findByIdAndUpdate(
      id,
      { name, contact, alternateContact, alternateEmail, address, about },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { editProfile, getProfile };
