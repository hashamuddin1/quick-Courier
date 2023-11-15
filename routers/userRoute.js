const express = require("express");
const userRouter = express.Router();

const {
  userSignUp,
  userSignIn,
  getUserProfile,
} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

userRouter.post("/api/userSignUp", userSignUp);
userRouter.post("/api/userSignIn", userSignIn);
userRouter.get("/api/getUserProfile", [verifyToken], getUserProfile);

module.exports = userRouter;
