const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "vladut.petru27@yahoo.com",
    pass: process.env.PASSWORD,
  },
});

async function sendVerificationEmail(email, verificationToken) {
  const mailOptions = {
    from: "vladut.petru27@yahoo.com",
    to: email,
    subject: "Verify your email address",
    html: `<p>Click <a href="http://yourwebsite.com/users/verify/${verificationToken}">here</a> to verify your email address.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}
module.exports = sendVerificationEmail;
