const router = require("express").Router();
const controller = require("../controllers/payment.controller");

router.post("/create-payment", controller.createPayment);
router.get("/payment/:id", controller.getPaymentStatus);

module.exports = router;
