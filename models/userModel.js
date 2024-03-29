const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "roles",
  },
  fullName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  lastUpdateLocation: {
    type: Date,
    required: true,
  },
});

const users = new mongoose.model("users", userSchema);

module.exports = { users };
