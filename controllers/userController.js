const { users } = require("../models/userModel");
const { roles } = require("../models/roleModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("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");

const userSignUp = async (req, res) => {
  try {
    if (!req.body.emailAddress) {
      return res.status(400).send({
        success: false,
        message: "The Email Address Is Required",
      });
    }

    if (!req.body.phoneNumber) {
      return res.status(400).send({
        success: false,
        message: "The Phone Number Is Required",
      });
    }

    if (!req.body.fullName) {
      return res.status(400).send({
        success: false,
        message: "The First Name Is Required",
      });
    }

    if (!req.body.password) {
      return res.status(400).send({
        success: false,
        message: "The Password Is Required",
      });
    }

    if (!req.body.country) {
      return res.status(400).send({
        success: false,
        message: "The Country Is Required",
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

    const fetchRole = await roles.findOne({ roleName: "User" });

    const user = new users({
      emailAddress: req.body.emailAddress,
      phoneNumber: req.body.phoneNumber,
      fullName: req.body.fullName,
      password: req.body.password,
      country: req.body.country,
      roleId: fetchRole._id,
    });
    let saltPassword = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(user.password, saltPassword);
    user.password = encryptedPassword;

    await user.save();

    const token = jwt.sign(
      { _id: user._id, emailAddress: user.emailAddress },
      process.env.TOKEN_KEY,
      {
        expiresIn: "30d",
      }
    );

    const msg = {
      to: req.body.emailAddress,
      from: {
        name: "QUICK COURIER",
        email: "hasham@tecizeverything.com",
      },
      subject: "Welcome to Quick Courier",
      templateId: "d-3f53814d4b874ba5b2af6b993fb24a1e",
      dynamicTemplateData: {
        userName: req.body.fullName,
      },
    };

    sgMail.send(msg).then(() => {
      return res.status(200).send({
        success: true,
        message: "User Registered Successfully",
        data: user,
        token,
      });
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

const getUserProfile = async (req, res) => {
  try {
    const fetchUser = await users.findOne({ _id: req.user._id }).select({
      password: 0,
    });

    return res.status(200).send({
      success: true,
      message: "User Data has been Fetched Successfully",
      data: fetchUser,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { userSignUp, userSignIn, getUserProfile };
