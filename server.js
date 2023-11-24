const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
require("./config/database");
const userRouter = require("./routers/userRoute");
const roleRouter = require("./routers/roleRoute");
const listRouter = require("./routers/listRoute");
const paymentRouter = require("./routers/paymentRoute");
const termsAndConditionRouter = require("./routers/termsAndConditionRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use([
  userRouter,
  roleRouter,
  listRouter,
  paymentRouter,
  termsAndConditionRouter,
]);

app.listen(port, () => {
  console.log(
    `Our Server is running at port ${port} in Development Environment`
  );
});
