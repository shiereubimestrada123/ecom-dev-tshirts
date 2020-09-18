const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const addOrderToUserHistory = require('../../middleware/addOrderToUserHistory');

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
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { products, total, name, email, address, contact } = req.body.order;

    try {
      const user = await User.findById(req.params.userId);

      req.body.order.user = req.user.id;
      const order = new Order({
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

module.exports = router;
