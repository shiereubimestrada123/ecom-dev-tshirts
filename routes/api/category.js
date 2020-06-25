const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

const Category = require('../../models/Category');
const User = require('../../models/User');

router.post(
  '/create/:userId',
  [auth, admin, [check('name', 'Category name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.params.userId);

      if (user.id !== req.user.id) {
        return res.status(403).json({ msg: 'Access denied' });
      }

      const newCategory = new Category({ name: req.body.name });

      await newCategory.save();

      res.json(newCategory);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
