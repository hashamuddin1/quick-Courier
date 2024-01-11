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
  dashBoardKPI,
} = require("../controllers/listController");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

listRouter.post("/api/insertList", [verifyToken], insertList);
listRouter.get("/api/fetchPendingList", [verifyToken], fetchPendingList);
listRouter.patch("/api/approveList", [verifyAdmin], approveList);
listRouter.get("/api/dashBoardKPI", [verifyAdmin], dashBoardKPI);
listRouter.get(
  "/api/fetchAllActiveListByUser",
  [verifyToken],
  fetchAllActiveListByUser
);
listRouter.get("/api/fetchAllActiveList", fetchAllActiveList);
listRouter.get("/api/fetchActiveListById", fetchActiveListById);
listRouter.get("/api/fetchAllList", fetchAllList);

module.exports = listRouter;
