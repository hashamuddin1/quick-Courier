const express = require("express");
const issueRouter = express.Router();
const { insertIssue, fetchIssue } = require("../controllers/issueController");
const verifyToken = require("../middleware/verifyToken");

issueRouter.post("/api/insertIssue", [verifyToken], insertIssue);
issueRouter.get("/api/fetchIssue", [verifyToken], fetchIssue);

module.exports = issueRouter;
