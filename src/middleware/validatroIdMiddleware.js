const mongoose = require('mongoose');
exports.validateProductId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Invalid Product ID' });
  }

  next();
};
