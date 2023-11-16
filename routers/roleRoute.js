const express = require("express");
const roleRouter = express.Router();

const { createRole } = require("../controllers/roleController");

roleRouter.post("/api/createRole", createRole);

module.exports = roleRouter;
