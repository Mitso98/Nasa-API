const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
const { SMTP_USER, SMTP_PASS } = process.env;

const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

module.exports = mailer;
