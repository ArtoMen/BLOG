const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/account');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/changePassword', passport.authenticate('jwt', { session: false }), controller.changePassword);
router.get('/delete', passport.authenticate('jwt', { session: false }), controller.delete);

module.exports = router;