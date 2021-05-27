// const { Client } = require('pg');
const db = require('../db/posts');
module.exports.create = (req, res) => {
    const result = db.create(req.user, req.body.text, req.file.path);
    if (result) res.status(200).json({ success: true, status: true, error: false });
    else res.status(200).json({ success: true, status: true, error: false, errorCode: 500, message: 'Internal server error' });
}

module.exports.upload = (req, res) => {
    res.status(200).json({ success: true, status: true, error: false, fileName: req.file.path });
}