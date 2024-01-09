const jwt = require("jsonwebtoken");
const { users } = require("../models/userModel");
const { roles } = require("../models/roleModel");
const config = process.env;
const verifyAdmin = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
    const fetchRole = await users
      .findOne({ _id: req.user._id })
      .select({ roleId: 1 });
    const checkRole = await roles
      .findOne({ _id: fetchRole.roleId })
      .select({ roleName: 1 });
    if (checkRole.roleName !== "Admin") {
      return res
        .status(400)
        .send({ message: "This Action Only be performed by Admin" });
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyAdmin;
