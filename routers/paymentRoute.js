const express = require("express");
const paymentRouter = express.Router();
const { createPayment } = require("../controllers/paymentController");
const verifyToken = require("../middleware/verifyToken");

paymentRouter.post("/api/createPayment", [verifyToken], createPayment);

module.exports = paymentRouter;
