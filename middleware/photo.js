const Product = require('../models/Product');

module.exports = async function (req, res, next) {
  try {
    const product = await Product.findById(req.params.productId);

    if (product.photo.data) {
      res.set('Content-Type', product.photo.contentType);
      return res.send(product.photo.data);
    }

    next();
  } catch (error) {
    console.log('error photo aasdasda');
  }
};
