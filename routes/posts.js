const express = require('express');
const passport = require('passport');
const file = require('../middleware/upload');
const router = express.Router();
const controller = require('../controllers/posts');

router.post('/create', passport.authenticate('jwt', { session: false }), file.single('image'), controller.create);
// router.get('/like', controller.like);

module.exports = router;