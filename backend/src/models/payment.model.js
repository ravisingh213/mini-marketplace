const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  amount: Number,
  platformFee: Number,
  vendorAmount: Number,
  paymentIntentId: { type: String, unique: true, index: true },
  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
