const router = require("express").Router();
const controller = require("../controllers/wallet.controller");

router.get("/vendor/wallet/:vendorId", controller.getVendorWallet);
router.get("/platform/wallet", controller.getPlatformWallet);

module.exports = router;
