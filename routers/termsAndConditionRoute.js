const express = require("express");
const termsAndConditionRouter = express.Router();

const { createTermsAndCondition } = require("../controllers/termsAndCondition");

termsAndConditionRouter.post("/api/createTermsAndCondition", createTermsAndCondition);

module.exports = termsAndConditionRouter;
