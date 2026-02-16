const Product = require("../models/product.model");
const Vendor = require("../models/vendor.model");


exports.createProduct = async (productData) => {
    const { name, price, vendorId } = productData;

    const vendor = await Vendor.findOne({ _id: vendorId })

    console.log(vendor)

    if (!vendor) {
        return {
            status: false,
            message: "Vender Not OnBoard"
        };
    }

    let product = await Product.create({ name, price, vendorId });

    await product.save();

    return {
        status: true,
        product
    };
};

exports.getProduct = async () => {
    const product = await Product.find().populate({
        path: "vendorId",
        select: "status userId",
        populate: {
            path: "userId",
            select: "name"
        }
    });

    return {
        status: true,
        product
    };
};