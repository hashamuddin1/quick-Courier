const express = require("express");
const userRouter = express.Router();

const { userSignUp } = require("../controller/userController");

userRouter.post("/api/userSignUp", userSignUp);

module.exports = userRouter;
