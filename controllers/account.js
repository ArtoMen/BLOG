const db = require('../db/users');


module.exports.login = async(req, res) => {
    const jwt = require('jsonwebtoken');
    const key = require('../config/config')
    if (!req.body.email || !req.body.password) {
        res.status(400).json({ success: true, register: false, error: true, errorCode: 200, message: 'Some fields are empty' });
        return;
    }
    if (!(/^[a-zA-Z0-9]+([a-zA-Z0-9.-_]{3,})+@+[a-z]+\.+[a-z]{2,}$/.test(req.body.email))) {
        res.status(415).json({ success: true, register: false, error: true, errorCode: 251, message: 'Invalid email' });
        return;
    }
    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w]).{6,}$/.test(req.body.password))) {
        res.status(415).json({ success: true, register: false, error: true, errorCode: 253, message: 'Invalid password' });
        return;
    }
    const result = await db.login({
        email: req.body.email,
        password: req.body.password
    });
    if (result === 0) res.status(500).json({ success: true, auth: false, error: true, errorCode: 500, message: 'Internal server error' });
    else if (result === 2) res.status(200).json({ success: true, auth: false, error: true, errorCode: 251, message: 'Wrong login or password' });
    else {
        const token = jwt.sign({ findKey: result['findkey'], secretKey: result['secretkey'] }, key.secretKey, { expiresIn: 60 * 60 * 24 * 30 });
        res.status(200).json({ success: true, auth: true, error: false, token: 'Bearer ' + token });
    }
}

module.exports.register = async(req, res) => {
    if (!req.body.email || !req.body.name || !req.body.password) {
        res.status(400).json({ success: true, register: false, error: true, errorCode: 200, message: 'Some fields are empty' });
        return;
    }
    if (!(/^[a-zA-Z0-9]+([a-zA-Z0-9.-_]{3,})+@+[a-z]+\.+[a-z]{2,}$/.test(req.body.email))) {
        res.status(415).json({ success: true, register: false, error: true, errorCode: 251, message: 'Invalid email' });
        return;
    }
    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w]).{6,}$/.test(req.body.password))) {
        res.status(415).json({ success: true, register: false, error: true, errorCode: 252, message: 'Invalid password' });
        return;
    }
    const result = await db.register({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    });
    if (result == 0) res.status(500).json({ success: true, register: false, error: true, errorCode: 500, message: 'Internal server error' });
    else if (result == 2) res.status(200).json({ success: true, register: false, error: true, errorCode: 253, message: 'Wrong login or password' });
    else res.status(200).json({ success: true, register: true, error: false });
}