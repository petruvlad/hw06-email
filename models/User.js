const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // alte câmpuri ale utilizatorului
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // alte câmpuri ale utilizatorului
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
