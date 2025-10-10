const express = require("express");
const { editProfile, getProfile } = require("../../controllers/user/user");
const {
  updateCompanyInfo,
  getCompanyDetails,
} = require("../../controllers/user/company");
const {
  updateBankDetails,
  getBankDetails,
} = require("../../controllers/user/bank");

const router = express.Router();

router.put("/edit-profile", editProfile);
router.put("/edit-company", updateCompanyInfo);
router.put("/edit-bank", updateBankDetails);
router.post("/get-profile", getProfile);
router.post("/get-companies", getCompanyDetails);
router.post("/get-banks", getBankDetails);

module.exports = router;
