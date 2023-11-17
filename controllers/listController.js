const { lists } = require("../models/listModel");

const insertList = async (req, res) => {
  try {
    const createList = new lists({
      userId: req.user._id,
      baseCountry: req.body.baseCountry,
      baseCity: req.body.baseCity,
      destinationCountry: req.body.destinationCountry,
      destinationCity: req.body.destinationCity,
      receivingDate: req.body.receivingDate,
      destinationLocation: req.body.destinationLocation,
      description: req.body.description,
      price: req.body.price,
    });

    await createList.save();

    return res.status(200).send({
      success: true,
      message: "List has been Created Successfully",
      data: createList,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const fetchPendingList = async (req, res) => {
  try {
    const getPendingList = await lists.find({
      userId: req.user._id,
      status: "Pending",
    });

    return res.status(200).send({
      success: true,
      message: "Fetch All Pending List Of A User Successfully",
      data: getPendingList,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const approveList = async (req, res) => {
  try {
    const fetchList = await lists.findOne({ _id: req.body.listId });
    if (!fetchList) {
      return res.status(400).send({
        success: false,
        message: "This List Not Found",
      });
    }

    await lists.findByIdAndUpdate(
      { _id: req.body.listId },
      { status: "Active" },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "List has been Approved Successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { insertList, fetchPendingList, approveList };
