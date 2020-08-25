const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const braintree = require('braintree');
const User = require('../../models/User');

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox, // Production
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

router.get('/getToken/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
