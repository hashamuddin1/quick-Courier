require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://uhasham71:pfioyzk907gjpu5g@cluster0.hd8cd4o.mongodb.net`
  )
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((e) => {
    console.log(e);
  });
