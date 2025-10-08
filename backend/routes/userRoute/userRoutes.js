const express = require("express");
const { editProfile } = require("../../controllers/user/user");
const { updateCompanyInfo } = require("../../controllers/user/company");
const { updateBankDetails } = require("../../controllers/user/bank");

const router = express.Router();

router.put("/edit-profile", editProfile);
router.put("/edit-company", updateCompanyInfo);
router.put("/edit-bank", updateBankDetails);

module.exports = router;
