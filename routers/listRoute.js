const express = require("express");
const listRouter = express.Router();
const {
  insertList,
  fetchPendingList,
  approveList,
  fetchAllActiveList,
} = require("../controllers/listController");
const verifyToken = require("../middleware/verifyToken");

listRouter.post("/api/insertList", [verifyToken], insertList);
listRouter.get("/api/fetchPendingList", [verifyToken], fetchPendingList);
listRouter.patch("/api/approveList", [verifyToken], approveList);
listRouter.get("/api/fetchAllActiveList", [verifyToken], fetchAllActiveList);

module.exports = listRouter;
