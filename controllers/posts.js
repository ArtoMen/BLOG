// const { Client } = require('pg');
// const db = require('../db/post');
module.exports.create = (req, res) => {
    res.status(200).json({ test: req.user });
}