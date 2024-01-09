const express = require("express");
const roleRouter = express.Router();
const verifyToken = require("../middleware/verifyToken");

const { createRole, allRole } = require("../controllers/roleController");

roleRouter.post("/api/createRole", [verifyToken], createRole);
roleRouter.get("/api/allRole", [verifyToken], allRole);

module.exports = roleRouter;
