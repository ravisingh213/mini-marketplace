const webhookService = require("../services/webhook.service");
const generateSignature = require("../utils/generateSignature");

exports.webhook = async (req, res, next) => {
  try {
    const signature = req.headers["x-webhook-signature"];
    const expected = generateSignature(req.body);

    if (signature !== expected)
      throw new Error("Invalid signature");


    await webhookService.handleWebhook(req.body.paymentIntentId);

    res.json({ received: true });

  } catch (err) {
    next(err);
  }
};
