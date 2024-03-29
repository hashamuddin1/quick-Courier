const { users } = require("../models/userModel");
const { roles } = require("../models/roleModel");
const { lists } = require("../models/listModel");
const { issues } = require("../models/issueModel");
const { applyList } = require("../models/applyListModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

    if (!req.body.state) {
      return res.status(400).send({
        success: false,
        message: "The State Is Required",
      });
    }

    if (!req.body.city) {
      return res.status(400).send({
        success: false,
        message: "The City Is Required",
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
      state: req.body.state,
      city: req.body.city,
      roleId: fetchRole._id,
      lastUpdateLocation: new Date(),
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
    const fetchRole = await roles.findOne({ roleName: "User" });
    const fetchUser = await users
      .find({
        roleId: fetchRole._id,
      })
      .select({
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

    await lists.deleteMany({ userId: req.query.userId });

    await issues.deleteMany({ userId: req.query.userId });

    await applyList.deleteMany({ userId: req.query.userId });

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

const deleteAccountByUser = async (req, res) => {
  try {
    await users.findOneAndDelete({ _id: req.user._id });

    await lists.deleteMany({ userId: req.user._id });

    await issues.deleteMany({ userId: req.user._id });

    await applyList.deleteMany({
      $or: [{ ownerId: req.user._id }, { userId: req.user._id }],
    });

    return res.status(200).send({
      success: true,
      message: "Account has been Deleted Successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const fetchAllUserByUser = async (req, res) => {
  try {
    const fetchRole = await roles.findOne({ roleName: "User" });
    const fetchUser = await users
      .find({
        roleId: fetchRole._id,
        _id: { $ne: req.user._id },
      })
      .select({
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

const updateLocationByUser = async (req, res) => {
  try {
    if (!req.body.state) {
      return res.status(400).send({
        success: false,
        message: "The State Is Required",
      });
    }

    if (!req.body.city) {
      return res.status(400).send({
        success: false,
        message: "The City Is Required",
      });
    }

    await users.findOneAndUpdate(
      { _id: req.user._id },
      {
        state: req.body.state,
        city: req.body.city,
        lastUpdateLocation: new Date(),
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Location Updated Successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const fetchUserByPhoneNumber = async (req, res) => {
  try {
    const fetchRole = await roles.findOne({ roleName: "User" });
    const phoneNumber = `${req.query.phoneNumber}`
      .replace(/[^\d-]/g, "")
      .trim();
    const formattedPhoneNumber = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+${phoneNumber}`;
    console.log(formattedPhoneNumber);
    const fetchUser = await users
      .findOne({
        roleId: fetchRole._id,
        phoneNumber: formattedPhoneNumber,
      })
      .select({
        password: 0,
      });

    return res.status(200).send({
      success: true,
      message: "User has been Fetched Successfully",
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

module.exports = {
  userSignUp,
  userSignIn,
  getUserProfile,
  fetchAllUser,
  deleteUser,
  deleteAccountByUser,
  fetchAllUserByUser,
  updateLocationByUser,
  fetchUserByPhoneNumber,
};
