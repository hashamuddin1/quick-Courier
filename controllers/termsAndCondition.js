const { termsAndCondition } = require("../models/termsAndCondition");

const createTermsAndCondition = async (req, res) => {
  try {
    const checkTermsAndCondition = await termsAndCondition.find();
    if (checkTermsAndCondition) {
      return res.status(400).send({
        success: false,
        message: "Terms and Conditions are Already Created",
      });
    }

    const insertTermsAndCondition = new termsAndCondition({
      content: req.body.content,
    });

    await insertTermsAndCondition.save();

    return res.status(200).send({
      success: true,
      message: "Terms And Condition has been Created Successfully",
      data: insertTermsAndCondition,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { createTermsAndCondition };
