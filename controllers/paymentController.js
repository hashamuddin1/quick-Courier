const PROCESS = process.env;
const stripe = require("stripe")(PROCESS.STRIPE_SECRET_KEY);
const { lists } = require("../models/listModel");

const createPayment = async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      name: req.body.cardHolderName,
      email: req.user.emailAddress,
    });

    const param = {};
    param.card = {
      number: req.body.cardNumber,
      exp_month: req.body.expMonth,
      exp_year: req.body.expYear,
      cvc: req.body.cvc,
    };

    stripe.tokens.create(param, function (err, token) {
      if (token) {
        stripe.customers.createSource(
          customer.id,
          { source: token.id },
          async function (err, card) {
            if (err) {
              console.log(err);
              return res.status(400).send({
                success: false,
                message: "Something went wrong",
              });
            }
          }
        );
      }
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 10 * 100,
      currency: "usd",
      customer: customer.id,
      payment_method_types: ["card"],
    });

    await stripe.paymentIntents.confirm(paymentIntent.id, {
      payment_method: "pm_card_visa",
    });

    return res.status(200).send({
      success: true,
      message: "Payment has been Created Successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const releasePayment = async (req, res) => {
  try {
    const fetchList = await lists.findOne({ _id: req.body.listId });
    if (!fetchList) {
      return res.status(400).send({
        success: false,
        message: "This List Not Found",
      });
    }

    await lists.findOneAndUpdate(
      { _id: req.body.listId },
      {
        status: "Done",
      }
    );

    return res.status(200).send({
      success: true,
      message: "Payment has been Transfered",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { createPayment, releasePayment };
