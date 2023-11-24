const express = require("express");
const termsAndConditionRouter = express.Router();

const {
  createTermsAndCondition,
  getTermsAndCondition,
} = require("../controllers/termsAndConditionController");
const verifyToken = require("../middleware/verifyToken");

termsAndConditionRouter.post(
  "/api/createTermsAndCondition",
  [verifyToken],
  createTermsAndCondition
);
termsAndConditionRouter.get("/api/getTermsAndCondition", getTermsAndCondition);

module.exports = termsAndConditionRouter;
