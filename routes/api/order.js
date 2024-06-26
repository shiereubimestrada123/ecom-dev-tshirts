const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const addOrderToUserHistory = require('../../middleware/addOrderToUserHistory');
const decreaseQuantity = require('../../middleware/decreaseQuantity');

const User = require('../../models/User');
const { Order, CartItem } = require('../../models/Order');

router.post(
  '/create/:userId',
  [
    check('order.name', 'Name is required').not().isEmpty(),
    check('order.email', 'Email is required').not().isEmpty(),
    check('order.address', 'Address is required').not().isEmpty(),
    check('order.contact', 'Contact number is required').not().isEmpty(),
  ],
  auth,
  addOrderToUserHistory,
  decreaseQuantity,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      products,
      total,
      name,
      email,
      address,
      contact,
      transactionId,
    } = req.body.order;

    try {
      const user = await User.findById(req.params.userId);

      req.body.order.user = req.user.id;
      const order = new Order({
        transactionId,
        products,
        total,
        name,
        email,
        address,
        contact,
      });

      await order.save();

      res.json(order);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/list/:userId', auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    const orders = await Order.find()
      .populate('user', '_id name address')
      .sort('-createdAt');

    if (!orders) {
      return res.status(400).json({
        error: 'Orders not found',
      });
    }

    res.json(orders);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
