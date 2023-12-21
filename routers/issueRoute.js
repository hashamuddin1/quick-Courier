const express = require("express");
const issueRouter = express.Router();
const { insertIssue } = require("../controllers/issueController");
const verifyToken = require("../middleware/verifyToken");

issueRouter.post("/api/insertIssue", [verifyToken], insertIssue);

module.exports = issueRouter;
