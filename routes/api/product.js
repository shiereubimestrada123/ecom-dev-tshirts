const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

router.post(
  '/',
  [
    auth,
    admin,
    [
      check('name', 'Product name is required').not().isEmpty(),
      check('description', 'Product description is required').not().isEmpty(),
      check('price', 'Product price is required').not().isEmpty(),
      check('shipping', 'Product shipping is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log('12312');
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
