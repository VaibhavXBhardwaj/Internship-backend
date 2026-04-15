const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const err = new Error('Email already in use');
    err.status = 409;
    throw err;
  }

  const user = await User.create({ name, email, password });
  const token = signToken(user._id);

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  };
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  const token = signToken(user._id);

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  };
};