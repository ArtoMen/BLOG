const db = require('./db');

class user extends db {
    async register(data) {
        const crypto = require("crypto");
        const secretKey = crypto.randomBytes(64).toString('hex');
        const findKey = crypto.randomBytes(64).toString('hex');
        console.log(findKey);
        const bcrypt = require('bcryptjs');
        const salt = bcrypt.genSaltSync(10);
        let sql = 'SELECT email FROM users WHERE email = $1';
        let values = [data['email']];
        try {
            const res = await this.db.query(sql, values);
            if (res.rows.length) {
                return 2;
            }
        } catch (err) {
            console.error(err.stack);
            return 0;
        }
        //create
        sql = 'INSERT INTO users(name, email, password, secretKey, findKey) VALUES($1, $2, $3, $4, $5) RETURNING *';
        values = [data['name'], data['email'], bcrypt.hashSync(data['password'], salt), secretKey, findKey];
        try {
            const res = await this.db.query(sql, values)
            console.log('create user', res.rows[0]);
            return 1;
        } catch (err) {
            console.error(err.stack);
            return 0;
        }
    }

    async login(data) {
        const bcrypt = require('bcryptjs');
        const jwt = require('jsonwebtoken');
        let sql = 'SELECT * FROM users WHERE email = $1';
        let values = [data['email']];
        try {
            const res = await this.db.query(sql, values);
            if (res.rows.length) {
                if (bcrypt.compareSync(data['password'], res.rows[0]['password'])) {

                    delete res.rows[0]['password'];
                    delete res.rows[0]['findkey'];
                    delete res.rows[0]['secretkey'];
                    return res.rows[0];
                } else return 2;
            } else {
                return 2;
            }
        } catch (err) {
            console.error(err.stack);
            return 0;
        }
    }
}

module.exports = new user();