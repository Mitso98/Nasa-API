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

// const info = {
//   from: "mostafa.ahmed19293949@gmail.com",
//   to: "momo.ah6751@gmail.com",
//   subject: "test",
//   text: "test",
// };

// transport.sendMail(info, (err) => {
//   if (err) {
//     console.log("There is an error: ", err);
//   } else {
//     console.log("Sent");
//   }
// });

module.exports = mailer;
