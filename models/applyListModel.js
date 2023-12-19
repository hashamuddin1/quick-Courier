const mongoose = require("mongoose");

const applyListSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "lists",
  },
  status: {
    type: String,
    enum: ["applied", "rejected", "accepted", "completed"],
    required: true,
    default: "applied",
  },
  rate: {
    type: Number,
    required: true,
  },
});

const applyList = new mongoose.model("applyList", applyListSchema);

module.exports = { applyList };
