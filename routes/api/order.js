const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const User = require('../../models/User');
const { Order, CartItem } = require('../../models/Order');

router.post('/create/:userId', auth, async (req, res) => {
  console.log('CREATE ORDER: ', req.body);

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
});

module.exports = router;
