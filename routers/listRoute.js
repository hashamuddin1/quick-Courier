const express = require("express");
const listRouter = express.Router();
const { insertList } = require("../controllers/listController");
const verifyToken = require("../middleware/verifyToken");

listRouter.post("/api/insertList", [verifyToken], insertList);

module.exports = listRouter;
