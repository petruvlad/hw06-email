const express = require("express");
const router = express.Router();
const Joi = require("joi");
const User = require("../models/User");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

const schema = Joi.object({
  email: Joi.string().email().required(),
});


router.post("/verify", async (req, res) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Missing required field email" });
    }

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    await sendVerificationEmail(email, user.verificationToken);

    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
