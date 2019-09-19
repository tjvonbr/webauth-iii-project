const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: "You are prohibited from viewing this content." })
      } else {
        req.user = { username: decodedToken.username };
        next()
      }
    });
  } else {
    res.status(400).json({ message: "You haven't provided any credentials." })
  }
};