const express = require("express");
const paymentRouter = express.Router();
const {
  createPayment,
  releasePayment,
} = require("../controllers/paymentController");
const verifyToken = require("../middleware/verifyToken");

paymentRouter.post("/api/createPayment", [verifyToken], createPayment);
paymentRouter.post("/api/releasePayment", [verifyToken], releasePayment);

module.exports = paymentRouter;
