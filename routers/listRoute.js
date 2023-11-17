const express = require("express");
const listRouter = express.Router();
const {
  insertList,
  fetchPendingList,
} = require("../controllers/listController");
const verifyToken = require("../middleware/verifyToken");

listRouter.post("/api/insertList", [verifyToken], insertList);
listRouter.get("/api/fetchPendingList", [verifyToken], fetchPendingList);

module.exports = listRouter;
