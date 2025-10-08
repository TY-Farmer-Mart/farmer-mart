const express = require("express");
const { editProfile } = require("../../controllers/user/user");
const { updateCompanyInfo } = require("../../controllers/user/company");
const { updateBankDetails } = require("../../controllers/user/bank");

const router = express.Router();

router.put("/edit-profile/:id", editProfile);
router.put("/company/:id", updateCompanyInfo);
router.put("/bank/:id", updateBankDetails);

module.exports = router;
