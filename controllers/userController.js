const { users } = require("../models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSignUp = async (req, res) => {
  try {
    if (!req.body.emailAddress) {
      return res.status(400).send({
        success: false,
        message: "This Email Address Is Required",
      });
    }

    if (!req.body.phoneNumber) {
      return res.status(400).send({
        success: false,
        message: "This Phone Number Is Required",
      });
    }

    if (!req.body.fullName) {
      return res.status(400).send({
        success: false,
        message: "This First Name Is Required",
      });
    }

    const checkEmail = await users.findOne({
      emailAddress: req.body.emailAddress,
    });
    if (checkEmail) {
      return res.status(400).send({
        success: false,
        message: "This Email Address is already Exist",
      });
    }

    const checkPhone = await users.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    if (checkPhone) {
      return res.status(400).send({
        success: false,
        message: "This Phone Number is already Exist",
      });
    }

    const user = new users({
      emailAddress: req.body.emailAddress,
      phoneNumber: req.body.phoneNumber,
      fullName: req.body.fullName,
      password: req.body.password,
      country: req.body.country,
    });
    let saltPassword = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(user.password, saltPassword);
    user.password = encryptedPassword;

    await user.save();

    const token = jwt.sign(
      { _id: user._id, email: user.emailAddress },
      process.env.TOKEN_KEY,
      {
        expiresIn: "30d",
      }
    );

    return res.status(200).send({
      success: true,
      message: "User Registered Successfully",
      data: user,
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const userSignIn = async (req, res) => {
  try {
    if (!req.body.emailAddress) {
      return res.status(400).send({
        success: false,
        message: "Email Is Required",
      });
    }

    if (!req.body.password) {
      return res.status(400).send({
        success: false,
        message: "Password Is Required",
      });
    }

    const checkUser = await users.findOne({
      emailAddress: req.body.emailAddress,
    });

    if (!checkUser) {
      return res.status(400).send({
        success: false,
        message: "Invalid Email",
      });
    }

    if (
      checkUser &&
      (await bcrypt.compare(req.body.password, checkUser.password))
    ) {
      const token = jwt.sign(
        { _id: checkUser._id, emailAddress: checkUser.emailAddress },
        process.env.TOKEN_KEY,
        {
          expiresIn: "30d",
        }
      );

      return res.status(200).send({
        success: true,
        message: "User Login Successfully",
        data: checkUser,
        token,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { userSignUp, userSignIn };
