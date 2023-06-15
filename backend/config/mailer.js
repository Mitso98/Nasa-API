const nodemailer = require("nodemailer");

const { SMTP_USER, SMTP_PASS } = process.env;

const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

module.exports = mailer;
