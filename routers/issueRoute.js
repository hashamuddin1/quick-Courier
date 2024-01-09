const express = require("express");
const issueRouter = express.Router();
const { insertIssue, fetchIssue } = require("../controllers/issueController");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

issueRouter.post("/api/insertIssue", [verifyToken], insertIssue);
issueRouter.get("/api/fetchIssue", [verifyAdmin], fetchIssue);

module.exports = issueRouter;
