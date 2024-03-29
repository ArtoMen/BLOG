const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/comments');

router.post('/create', passport.authenticate('jwt', { session: false }), controller.create);

module.exports = router;