const { users } = require("../models/userModel");
const { roles } = require("../models/roleModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const PROCESS = process.env;
const stripe = require("stripe")(PROCESS.STRIPE_SECRET_KEY);

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

    if (!req.body.accountNumber) {
      return res.status(400).send({
        success: false,
        message: "The Account Number Is Required",
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

    const account = await stripe.accounts.create({
      type: "custom",
      country: "US",
      email: req.body.emailAddress,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_profile: {
        name: req.body.fullName,
        support_email: req.body.emailAddress,
      },
      business_type: "individual",
      individual: {
        verification: {
          additional_document: {
            front: "file_identity_document_success",
          },
          document: {
            front: "file_identity_document_success",
          },
        },
        email: req.body.emailAddress,
      },
      external_account: {
        account_number: req.body.accountNumber,
        object: "bank_account",
        country: "US",
        currency: "usd",
        routing_number: "110000000",
      },

      tos_acceptance: {
        date: Math.floor(Date.now() / 1000),
        ip: req.connection.remoteAddress,
      },
    });

    const user = new users({
      emailAddress: req.body.emailAddress,
      phoneNumber: req.body.phoneNumber,
      fullName: req.body.fullName,
      password: req.body.password,
      country: req.body.country,
      roleId: fetchRole._id,
      accountId: account.id,
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

const fetchAllUser = async (req, res) => {
  try {
    const fetchUser = await users.find().select({
      password: 0,
    });

    return res.status(200).send({
      success: true,
      message: "All User has been Fetched Successfully",
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

const deleteUser = async (req, res) => {
  try {
    const getUser = await users.findOne({ _id: req.query.userId });
    if (!getUser) {
      return next(CustomError.createError("User Does Not Exist", 400));
    }

    await users.findOneAndDelete({ _id: req.query.userId });

    return res.status(200).send({
      success: true,
      message: "User has been Deleted Successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  userSignUp,
  userSignIn,
  getUserProfile,
  fetchAllUser,
  deleteUser,
};
