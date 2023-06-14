const jwt = require("jsonwebtoken");
const mailer = require("../config/mailer");
const { JWT_SECRET, SMTP_USER } = process.env;

function generateEmailVerificationToken(email) {
  return jwt.sign({ email }, JWT_SECRET, {
    expiresIn: "1d",
  });
}

async function sendEmail(email, subject, message) {
  const mailOptions = {
    from: SMTP_USER,
    to: email,
    subject: subject,
    text: message,
  };

  await mailer.sendMail(mailOptions);
}

module.exports = {
  generateEmailVerificationToken,
  sendEmail,
};
