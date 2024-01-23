const express = require("express");
const termsAndConditionRouter = express.Router();

const {
  createTermsAndCondition,
  getTermsAndCondition,
} = require("../controllers/termsAndConditionController");
const verifyAdmin = require("../middleware/verifyAdmin");

termsAndConditionRouter.post(
  "/api/createTermsAndCondition",
  [verifyAdmin],
  createTermsAndCondition
);
termsAndConditionRouter.get("/api/getTermsAndCondition", getTermsAndCondition);

module.exports = termsAndConditionRouter;
