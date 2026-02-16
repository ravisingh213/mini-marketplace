const axios = require("axios");
const generateSignature = require("./generateSignature");

module.exports = function simulateWebhook(paymentIntentId) {

  setTimeout(async () => {

    const payload = {
      eventType: "payment.success",
      paymentIntentId
    };

    const signature = generateSignature(payload);

    await axios.post("http://localhost:5000/webhook", payload, {
      headers: {
        "x-webhook-signature": signature
      }
    });

  }, 4000);
};
