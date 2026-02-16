const router = require("express").Router();
const controller = require("../controllers/webhook.controller");

router.post("/webhook", controller.webhook);

module.exports = router;
