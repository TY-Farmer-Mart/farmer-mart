const users = require("../../models/auth/auth.js");

// Edit Profile
const editProfile = async (req, res) => {
  try {
    const { id, name, contact, altContact, altEmail, address, about } =
      req.body;

    if (!id) return res.status(400).json({ message: "User id is required" });

    const updatedUser = await users.findByIdAndUpdate(
      id,
      { name, contact, altContact, altEmail, address, about },
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

module.exports = { editProfile };

module.exports = { profileEdit };
