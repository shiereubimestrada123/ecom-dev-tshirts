const User = require('../models/User');

module.exports = async function (req, res, next) {
  try {
    const user = await User.findById(req.user.id);

    if (user.role === 0) {
      return res
        .status(401)
        .json({ msg: 'You are not authorized to perform this action.' });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ msg: 'You are not authorized to perform this action.' });
  }
};
