//require("dotenv").config()

const jwt = require('jsonwebtoken');

//const jwtKey = process.env.JWT_SECRET;
  

module.exports = {
  authenticate,
  generateToken
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) return res.status(400).json(err);

      req.decoded = decodedToken;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}

function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
    };
    const options = {
      expiresIn: '1d',
    };
    
    const secret = process.env.JWT_SECRET; 
    return jwt.sign(payload, secret, options);
  }

