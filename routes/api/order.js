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
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('contact', 'Contact number is required').not().isEmpty(),
  ],
  auth,
  addOrderToUserHistory,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.params.userId);

      req.body.order.user = req.user.id;
      const order = new Order(req.body.order);

      await order.save();

      res.json(order);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
