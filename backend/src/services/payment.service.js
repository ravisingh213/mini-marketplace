const Payment = require("../models/payment.model");
const Product = require("../models/product.model");
const Vendor = require("../models/vendor.model");
const { v4: uuidv4 } = require("uuid");
const simulateWebhook = require("../utils/simulateWebhook");

exports.createPayment = async ({ productId, customerId }) => {

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  const vendor = await Vendor.findById(product.vendorId);
  if (!vendor || vendor.status !== "active")
    throw new Error("Vendor not active");

  const amount = product.price;
  const platformFee = amount * 0.10;
  const vendorAmount = amount - platformFee;

  const paymentIntentId = uuidv4();

  const payment = await Payment.create({
    productId,
    customerId,
    vendorId: vendor._id,
    amount,
    platformFee,
    vendorAmount,
    paymentIntentId
  });

  simulateWebhook(paymentIntentId);

  return payment;
};
