const Vendor = require("../models/vendor.model");

exports.onboardVendor = async (userId) => {
    let vendor = await Vendor.findOne({ userId });

    if (!vendor) {
        vendor = await Vendor.create({ userId });
    }

    vendor.status = vendor?.onboardingUrl ? "active" : "pending";
    vendor.onboardingUrl = "https://mock-onboarding.com/start";
    const venderResult = await vendor.save();

    return {
        status: true,
        vendor: venderResult
    };
};

exports.getVendorStatus = async (userId) => {
    const vendor = await Vendor.findOne({ userId });
    if (!vendor) return { status: "not_connected" };
    return { status: vendor.status };
};
