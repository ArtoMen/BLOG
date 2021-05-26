const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const app = express();
// Require Routes
const accountRoutes = require('./routes/account');
const postRoutes = require('./routes/posts');


// Other
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
require('./middleware/passport')(passport);

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/account', accountRoutes);

// OS
app.get('/', (req, res) => {
    res.send('ok!');
});

module.exports = app;