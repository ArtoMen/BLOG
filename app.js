const express = require('express');
const passport = require('passport');
const app = express();
const config = require('./config/config');
// Require Routes
const accountRoutes = require('./routes/account');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

// Other
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(`/${config.pathToUploads}`, express.static(config.pathToUploads));

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/comments', commentRoutes);

// OS
app.get('/', (req, res) => {
    res.send('ok!');
});


module.exports = app;