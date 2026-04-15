const authService = require('./auth.service');

exports.register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).json({ message: 'Account created successfully', ...result });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).json({ message: 'Login successful', ...result });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res) => {
  res.status(200).json({ user: req.user });
};