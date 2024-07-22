const jwt = require('jsonwebtoken');
const User = require('../model/User');

const verifyUser = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  const token = authHeader && authHeader.split(' ')[1];
 

  if (!token) return res.sendStatus(401); // No token provided

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    
    return res.sendStatus(403); 
  }
};

module.exports = verifyUser;
