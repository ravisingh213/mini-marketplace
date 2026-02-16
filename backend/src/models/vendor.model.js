const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
    onboardingUrl: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
        type: String,
        enum: ["not_connected", "pending", "active"],
        default: "not_connected"
    },
}, { timestamps: true });

module.exports = mongoose.model("Vendor", vendorSchema);
