const mongoose = require("mongoose");

const termsAndConditionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

const termsAndCondition = new mongoose.model(
  "termsAndCondition",
  termsAndConditionSchema
);

module.exports = { termsAndCondition };
