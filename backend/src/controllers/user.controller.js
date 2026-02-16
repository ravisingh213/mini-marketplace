const userService = require("../services/user.service");

exports.createUser = async (req, res, next) => {
  try {
    const result = await userService.createUser(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};


