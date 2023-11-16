const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
  },
});

const roles = new mongoose.model("roles", roleSchema);

module.exports = { roles };
