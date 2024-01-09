const express = require("express");
const userRouter = express.Router();

const {
  userSignUp,
  userSignIn,
  getUserProfile,
  fetchAllUser,
} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

userRouter.post("/api/userSignUp", userSignUp);
userRouter.post("/api/userSignIn", userSignIn);
userRouter.get("/api/getUserProfile", [verifyToken], getUserProfile);
userRouter.get("/api/fetchAllUser", [verifyToken], fetchAllUser);

module.exports = userRouter;
