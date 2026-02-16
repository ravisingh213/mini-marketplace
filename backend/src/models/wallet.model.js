const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  ownerId: mongoose.Schema.Types.ObjectId,
  ownerType: { type: String, enum: ["vendor", "platform"] },
  balance: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Wallet", walletSchema);
