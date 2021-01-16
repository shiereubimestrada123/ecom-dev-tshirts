const express = require('express');
const router = express.Router();
const Mail = require('../../models/Mail');
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { email } = req.body;

  Mail.findOne({ email }).then((user) => {
    if (!user) {
      Mail.create({ email }).then((newUser) => {
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        });

        let mailOptions = {
          from: process.env.MAIL_USER,
          to: newUser.email,
        };

        transporter
          .sendMail(mailOptions)
          .then(() =>
            res.json({ msg: 'Email sent, please check your inbox to confirm' })
          );
      });
    } else {
      res.json({ msg: 'Your email was already confirmed' });
    }
  });
});

module.exports = router;
