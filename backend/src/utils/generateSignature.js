const crypto = require("crypto");

module.exports = (payload) => {
  return crypto
    .createHmac("sha256", process.env.WEBHOOK_SECRET)
    .update(JSON.stringify(payload))
    .digest("hex");
};
