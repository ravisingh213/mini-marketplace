const productService = require("../services/product.service");

exports.createProduct = async (req, res, next) => {
    try {
        const result = await productService.createProduct(req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const result = await productService.getProduct();
        res.json(result);
    } catch (err) {
        next(err);
    }
};


