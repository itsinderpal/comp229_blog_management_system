const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { User } = require('../models/user');

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['token'];
  }
  return token;
};

const authenticateUser = (jwtPayload, done) => {
  return User.findById(jwtPayload.id)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      return done(err);
    });
};

const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET_KEY,
  },
  authenticateUser
);

passport.use(jwtStrategy);
