const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  let auth = req.get('Authorization');
  if (auth && req.url !== '/users') {
    let token = auth.substring(7);
    jwt.verify(token, 'tasmanianDevil', { ignoreExpiration: false }, function (err, decoded) {
      if (err) {
        res.status(401).json({ message: "token not verify" });
      } else {
        next();
      }
    });
  }
  else {
    next();
  }
}