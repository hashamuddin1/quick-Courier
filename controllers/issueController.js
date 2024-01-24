const { issues } = require("../models/issueModel");

const insertIssue = async (req, res) => {
  try {
    const createIssue = new issues({
      userId: req.user._id,
      subject: req.body.subject,
      complain: req.body.complain,
    });

    await createIssue.save();

    return res.status(200).send({
      success: true,
      message: "Issue has been Created Successfully",
      data: createIssue,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const fetchIssue = async (req, res) => {
  try {
    const getAllIssues = await issues.find().populate({
      path: "userId",
      select: "fullName emailAddress",
    });
    return res.status(200).send({
      success: true,
      message: "Fetch All Issues Successfully",
      data: getAllIssues,
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
  insertIssue,
  fetchIssue,
};
