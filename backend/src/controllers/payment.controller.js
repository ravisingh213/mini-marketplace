const paymentService = require("../services/payment.service");
const Payment = require("../models/payment.model");

exports.createPayment = async (req, res, next) => {
  try {
    const payment = await paymentService.createPayment(req.body);
    res.json(payment);
  } catch (err) {
    next(err);
  }
};

exports.getPaymentStatus = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) throw new Error("Payment not found");
    res.json({ status: payment.status });
  } catch (err) {
    next(err);
  }
};
