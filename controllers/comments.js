const db = require('../db/comments');

module.exports.create = async(req, res) => {
    if (req.body.post_id < 0 || req.body.text) {
        res.status(400).json({ success: true, status: false, error: true, errorCode: 200, message: 'Some fields are empty' });
        return;
    }
    const result = db.create(req.user.id, req.body.post_id, req.body.text);
    if (result === 0) res.status(500).json({ success: true, status: false, error: false, errorCode: 500, message: 'Internal server error' });
    else res.status(200).json({ success: true, status: true, error: false, comment: result });
}