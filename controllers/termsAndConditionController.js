const { termsAndCondition } = require("../models/termsAndCondition");

const createTermsAndCondition = async (req, res) => {
  try {
    const checkTermsAndCondition = await termsAndCondition.findOne();
    if (checkTermsAndCondition) {
      await termsAndCondition.findOneAndUpdate(
        { _id: checkTermsAndCondition._id },
        {
          content: req.body.content,
        },
        { new: true }
      );
    } else {
      const insertTermsAndCondition = new termsAndCondition({
        content: req.body.content,
      });

      await insertTermsAndCondition.save();
    }

    return res.status(200).send({
      success: true,
      message: "Terms And Condition has been Created Successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getTermsAndCondition = async (req, res) => {
  try {
    const fetchTermsAndCondition = await termsAndCondition.findOne();

    return res.status(200).send({
      success: true,
      message: "Fetch Terms And Condition Successfully",
      data: fetchTermsAndCondition,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { createTermsAndCondition, getTermsAndCondition };
