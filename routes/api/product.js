const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

const Product = require('../../models/Product');
const User = require('../../models/User');

router.post('/create/:userId', auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (user.id !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: 'Image could not be uploaded',
        });
      }

      const { name, description, price, category, quantity, shipping } = fields;

      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !quantity ||
        !shipping
      ) {
        return res.status(400).json({
          error: 'All fields are required',
        });
      }

      let product = new Product(fields);

      if (files.photo) {
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: 'Image should be less than 1mb in size',
          });
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }

      product.save((err, result) => {
        if (err) {
          console.log('PRODUCT CREATE ERROR ', err);
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(result);
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
