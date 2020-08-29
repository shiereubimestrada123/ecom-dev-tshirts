const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const braintree = require('braintree');
const User = require('../../models/User');
const mongoose = require('mongoose');

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox, // Production
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

router.get('/getToken/:userId', async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
      const user = await User.findById(req.params.userId);
    }

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

router.post('/payment/:userId', async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
      const user = await User.findById(req.params.userId);
    }

    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    // charge
    let newTransaction = gateway.transaction.sale(
      {
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true,
        },
      },
      (error, result) => {
        if (error) {
          res.status(500).json(error);
        } else {
          res.json(result);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
