const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        reqiured: true
    },
    email: { type: String, unique: true, required: true },
    password: {
        type: String,
        required: true
    },
    role: { type: String, enum: ["customer", "vendor", "admin"], required: true }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
