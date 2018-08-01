const jwt = require('jsonwebtoken')
const config = require('../config/config');

module.exports = (req, res, next) => {
  let auth = req.get('Authorization');
  if (auth && req.url !== '/auth/registration') {
    let token = auth.substring(7);
    jwt.verify(token, config.secretOrKey, { ignoreExpiration: false }, function (err, decoded) {
      if (err) {
        res.status(401).json({ message: "Token not verify" });
      } else {
        next();
      }
    });
  }
  else {
    next();
  }
}