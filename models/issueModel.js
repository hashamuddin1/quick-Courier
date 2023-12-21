const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  complain: {
    type: String,
    required: true,
  },
});

const issues = new mongoose.model("issue", issueSchema);

module.exports = { issues };
