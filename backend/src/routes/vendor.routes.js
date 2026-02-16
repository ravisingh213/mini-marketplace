const router = require("express").Router();
const controller = require("../controllers/vendor.controller");

router.post("/onboard", controller.onboardVendor);
router.get("/:userId", controller.getVendorStatus);

module.exports = router;
