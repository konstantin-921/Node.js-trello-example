const express = require('express');
const router = module.exports = express.Router();
const passport = require('passport');
const Controller = require('../controller/auth');

router.get('/auth/login', Controller.login);

router.post('/auth/registration', Controller.addUser);

router.post('/auth/secret', passport.authenticate('jwt', { session: false }), Controller.secret);
