const express = require("express");
const listRouter = express.Router();
const {
  insertList,
  fetchPendingList,
  approveList,
  fetchAllActiveList,
  fetchAllActiveListByUser,
} = require("../controllers/listController");
const verifyToken = require("../middleware/verifyToken");

listRouter.post("/api/insertList", [verifyToken], insertList);
listRouter.get("/api/fetchPendingList", [verifyToken], fetchPendingList);
listRouter.patch("/api/approveList", [verifyToken], approveList);
listRouter.get(
  "/api/fetchAllActiveListByUser",
  [verifyToken],
  fetchAllActiveListByUser
);
listRouter.get("/api/fetchAllActiveList", fetchAllActiveList);

module.exports = listRouter;
