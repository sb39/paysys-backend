const { validationResult } = require('express-validator');

module.exports = () => async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw errors.array();
    }
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
