const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  console.log('mail');
});

module.exports = router;
