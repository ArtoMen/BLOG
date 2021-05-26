const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/posts');

router.post('/create', passport.authenticate('jwt', { session: false }), controller.create);
// router.get('/like', controller.like);

module.exports = router;