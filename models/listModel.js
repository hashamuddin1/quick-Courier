const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  baseCountry: {
    type: String,
    required: true,
  },
  baseCity: {
    type: String,
    required: true,
  },
  destinationCountry: {
    type: String,
    required: true,
  },
  destinationCity: {
    type: String,
    required: true,
  },
  receivingDate: {
    type: Date,
    required: true,
  },
  destinationLocation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Active", "Pending"],
    default: "Pending",
  },
});

const lists = new mongoose.model("lists", listSchema);

module.exports = { lists };
