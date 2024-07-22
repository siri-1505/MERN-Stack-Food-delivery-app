const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../model/User');
const jwt = require('jsonwebtoken');

const validateRegisterUser = [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('name').isLength({ min: 6 }).withMessage('Name must be at least 6 characters long')
];

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'User already exists, try with another email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const payload = { userId: savedUser._id, email: savedUser.email };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn:'15m'});
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    return res.status(200).json({
      message: 'User registered successfully',
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = registerUser;


  const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Enter all fields" });
    }
  
    try {
      const userExist = await User.findOne({ email });
      if (!userExist) {
        return res.status(400).json({ Login: false, message: 'Invalid email. Please sign up.' });
      }
  
      const comparedPassword = await bcrypt.compare(password, userExist.password);
      if (!comparedPassword) {
        return res.status(400).json({ Login: false, message: 'Incorrect password.' });
      }
  
      // Generate tokens
      const accessToken = jwt.sign(
        { email: userExist.email, id: userExist._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );
  
      const refreshToken = jwt.sign(
        { email: userExist.email, id: userExist._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
      );
  
      // Set cookies
      res.cookie('accessToken', accessToken, {
        maxAge: 15 * 60 * 1000, // 15 minutes
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
      });
  
      res.cookie('refreshToken', refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
      });
  
      return res.status(200).json({ Login: true, message: 'Login successful', accessToken, refreshToken });
    } catch (err) {
      return res.status(500).json({ Login: false, message: err.message });
    }
  };
  const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  };
  
module.exports = { registerUser, validateRegisterUser, loginUser,logoutUser };
