const express = require("express");
const listRouter = express.Router();
const {
  insertList,
  fetchPendingList,
  approveList,
  fetchAllActiveList,
  fetchAllActiveListByUser,
  fetchActiveListById,
  fetchAllList,
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
listRouter.get("/api/fetchActiveListById", fetchActiveListById);
listRouter.get("/api/fetchAllList", fetchAllList);

module.exports = listRouter;
