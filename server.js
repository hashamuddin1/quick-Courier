const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
require("./config/database");
const userRouter = require("./routers/userRoute");
const roleRouter = require("./routers/roleRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use([userRouter, roleRouter]);

app.listen(port, () => {
  console.log(
    `Our Server is running at port ${port} in Development Environment`
  );
});
