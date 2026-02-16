const vendorService = require("../services/vendor.service");

exports.onboardVendor = async (req, res, next) => {
    try {
        const result = await vendorService.onboardVendor(req.body.userId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.getVendorStatus = async (req, res, next) => {
    try {
        const result = await vendorService.getVendorStatus(req.params.userId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};
