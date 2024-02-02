const express = require("express");
const userRouter = express.Router();

const {
  userSignUp,
  userSignIn,
  getUserProfile,
  fetchAllUser,
  deleteUser,
  deleteAccountByUser,
} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

userRouter.post("/api/userSignUp", userSignUp);
userRouter.post("/api/userSignIn", userSignIn);
userRouter.get("/api/getUserProfile", [verifyToken], getUserProfile);
userRouter.get("/api/fetchAllUser", [verifyAdmin], fetchAllUser);
userRouter.delete("/api/deleteUser", [verifyAdmin], deleteUser);
userRouter.delete(
  "/api/deleteAccountByUser",
  [verifyToken],
  deleteAccountByUser
);

module.exports = userRouter;
