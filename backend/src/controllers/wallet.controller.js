const Wallet = require("../models/wallet.model");

exports.getVendorWallet = async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({
      ownerId: req.params.vendorId,
      ownerType: "vendor"
    });

    res.json(wallet || { balance: 0 });

  } catch (err) {
    next(err);
  }
};

exports.getPlatformWallet = async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({ ownerType: "platform" });
    res.json(wallet || { balance: 0 });
  } catch (err) {
    next(err);
  }
};
