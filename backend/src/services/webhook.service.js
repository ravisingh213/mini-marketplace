const Payment = require("../models/payment.model");
const Wallet = require("../models/wallet.model");
const mongoose = require("mongoose");

exports.handleWebhook = async (paymentIntentId) => {

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const payment = await Payment.findOne({ paymentIntentId }).session(session);

    if (!payment) throw new Error("Payment not found");

    if (payment.status === "success") {
      await session.abortTransaction();
      return;
    }

    payment.status = "success";
    await payment.save({ session });

    await Wallet.updateOne(
      { ownerId: payment.vendorId, ownerType: "vendor" },
      { $inc: { balance: payment.vendorAmount } },
      { upsert: true, session }
    );

    await Wallet.updateOne(
      { ownerType: "platform" },
      { $inc: { balance: payment.platformFee } },
      { upsert: true, session }
    );

    await session.commitTransaction();

  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};
