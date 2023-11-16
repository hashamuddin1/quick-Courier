const { roles } = require("../models/roleModel");

const createRole = async (req, res) => {
  try {
    const checkRole = await roles.findOne({
      roleName: req.body.roleName,
    });
    if (checkRole) {
      return res.status(400).send({
        success: false,
        message: "This Role is already Exist",
      });
    }

    const insertRole = new roles({
      roleName: req.body.roleName,
    });

    await insertRole.save();

    return res.status(200).send({
      success: true,
      message: "Role has been Created Successfully",
      data: insertRole,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { createRole };
