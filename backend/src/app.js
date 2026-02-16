const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", require("./routes/user.routes"));
app.use("/product", require("./routes/product.routes"));
app.use("/vendor", require("./routes/vendor.routes"));
app.use("/", require("./routes/payment.routes"));
app.use("/", require("./routes/webhook.routes"));
app.use("/", require("./routes/wallet.routes"));

app.use(require("./middlewares/error.middleware"));

module.exports = app;
