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

      const category = await Category.findOne({ name: req.body.name });

      if (category) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Category name already exists' }] });
      }

      const newCategory = new Category({ name: req.body.name });

      await newCategory.save();

      res.json(newCategory);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();

    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:categoryId', async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);

    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
