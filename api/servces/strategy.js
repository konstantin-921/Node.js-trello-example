const models = require('../../models/sequelize');
const passport = require('passport');
const passportJWT = require("passport-jwt");

function Strategy() {

  const ExtractJwt = passportJWT.ExtractJwt;
  const JwtStrategy = passportJWT.Strategy;

  this.jwtOptions = {}
  this.jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  this.jwtOptions.secretOrKey = 'tasmanianDevil';

  this.strategy = new JwtStrategy(this.jwtOptions, function (jwt_payload, next) {
    models.Users.findAll({
      where: {
        id: `${jwt_payload.user}`,
      }
    })
      .then((users) => {
        let user = users[0];
        if (user) {
          next(null, user);
        } else {
          next(null, false);
        }
      });
  });

  passport.use(this.strategy);
}

module.exports = new Strategy();

