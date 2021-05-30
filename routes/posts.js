const express = require('express');
const passport = require('passport');
const file = require('../middleware/upload');
const router = express.Router();
const controller = require('../controllers/posts');

router.post('/create', passport.authenticate('jwt', { session: false }), file.single('image'), controller.create);
router.post('/upload', passport.authenticate('jwt', { session: false }), file.single('image'), controller.upload);
router.get('/like/:id', passport.authenticate('jwt', { session: false }), controller.like);
router.post('/update', passport.authenticate('jwt', { session: false }), controller.update);
// router.get('/like/:id', passport.authenticate('jwt', { session: false }), controller.like);

// router.get('/like', controller.like);

module.exports = router;