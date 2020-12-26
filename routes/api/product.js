const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const photo = require('../../middleware/photo');

const Product = require('../../models/Product');
const User = require('../../models/User');

router.put('/:productId/user/:userId', auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    let product = await Product.findById(req.params.productId);

    if (user.id !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: 'Image could not be uploaded',
        });
      }

      product = Object.assign(product, fields);
      // console.log(req);
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
    console.log('errorrrr');
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

router.post('/create/:userId', auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (user.id !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    let form = new formidable.IncomingForm();
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

router.post('/by/search', async (req, res) => {
  try {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = req.body.skip;

    const products = await Product.find()
      .select('-photo')
      .populate('category')
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);

    if (!products) {
      return res.status(400).json({
        error: 'Products not found',
      });
    }

    res.json({ size: products.length, products });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:productId/user/:userId', auth, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId)
      .select('-photo')
      .populate('category');
    const user = await User.findById(req.params.userId);

    await product.remove();

    res.json({ msg: 'Product removed' });
  } catch (error) {
    console.log(error);
  }
});

router.get('/carousel', async (req, res) => {
  try {
    const products = await Product.find({})
      .select('-photo')
      .sort({ sold: -1 })
      .limit(3);

    res.json(products);
  } catch (error) {
    console.log(error);
  }
});

router.get('/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId)
      .select('-photo')
      .populate('category');

    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.get('/photo/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (product.photo.data) {
      res.set('Content-Type', product.photo.contentType);
      res.send(product.photo.data);
    }

    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    const products = await Product.find()
      .select('-photo')
      .populate('category')
      .sort([[sortBy, order]])
      .limit(limit);
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
