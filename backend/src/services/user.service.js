const User = require("../models/user.model");

exports.createUser = async (userData) => {
    const { name, email, password, role } = userData;
    let user = await User.create({ name, email, password, role });

    await user.save();

    return {
        status: true,
        user
    };
};

