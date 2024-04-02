const User = require('../models/User');
const { sendVerificationEmail } = require('../utils/emailUtils');


exports.sendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }

  try {
  
    const existingUser = await User.findOne({ email });

  
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

 
    if (existingUser.verify) {
      return res.status(400).json({ message: "Verification has already been passed" });
    }

   
    const verificationToken = uuidv4();

  
    existingUser.verificationToken = verificationToken;
    await existingUser.save();

   
    sendVerificationEmail(email, verificationToken);

    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.verifyUser = async (req, res) => {
  const { verificationToken } = req.params;

  try {
   
    const existingUser = await User.findOne({ verificationToken });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    existingUser.verify = true;
    existingUser.verificationToken = null;
    await existingUser.save();

    return res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
