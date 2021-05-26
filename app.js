const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
// Require Routes
const accountRoutes = require('./routes/account');


// Other
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/account', accountRoutes);

// OS
app.get('/', (req, res) => {
    res.send('ok!');
});

module.exports = app;