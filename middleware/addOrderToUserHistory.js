const User = require('../models/User');

module.exports = async function (req, res, next) {
  try {
    let history = [];

    req.body.order.products.forEach((item) => {
      history.push({
        _id: item._id,
        name: item.name,
        description: item.description,
        category: item.category,
        quantity: item.count,
        amount: req.body.order.total,
      });
    });

    User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { history: history } },
      { new: true },
      (error, data) => {
        if (error) {
          return res.status(400).json({
            error: 'Could not update user purchase history',
          });
        }
        next();
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: 'You are not authorized to perform this action.' });
  }
};
