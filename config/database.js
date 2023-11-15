//DATABASE CONNECTION
require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(`${process.env.DATABASE_CONNECTION_STRING}`)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((e) => {
    console.log(e);
  });
