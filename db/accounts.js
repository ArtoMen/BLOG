const db = require('./db');

class User extends db {
    async register(data) {
        const crypto = require("crypto");
        let secretKey = crypto.randomBytes(64).toString('hex');
        let findKey = crypto.randomBytes(64).toString('hex');
        let ok = false;
        while (!ok) {
            try {
                if (!(await this.db.query(`select * from users where secretkey = $1`, [secretKey])).rows.length) ok = true;
                else secretKey = crypto.randomBytes(64).toString('hex');
            } catch (e) {
                console.error(e.stack);
                return 0;
            }
        }
        while (ok) {
            try {
                if (!(await this.db.query(`select * from users where findkey = $1`, [findKey])).rows.length) ok = false;
                else findKey = crypto.randomBytes(64).toString('hex');
            } catch (e) {
                console.error(e.stack);
                return 0;
            }

        }
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
            console.log()
            console.error(err.stack);
            return 0;
        }
        //create
        sql = 'INSERT INTO users(name, email, password, secretKey, findKey, active) VALUES($1, $2, $3, $4, $5, true) RETURNING *';
        values = [data['name'], data['email'], bcrypt.hashSync(data['password'], salt), secretKey, findKey];
        try {
            const res = await this.db.query(sql, values)
            return res.rows[0];
        } catch (err) {
            console.error(err);
            return 0;
        }
    }

    async login(data) {
        const bcrypt = require('bcryptjs');
        let sql = 'SELECT * FROM users WHERE email = $1';
        let values = [data['email']];
        try {
            const res = await this.db.query(sql, values);
            if (res.rows.length) {
                if (bcrypt.compareSync(data['password'], res.rows[0]['password'])) {
                    delete res.rows[0]['password'];
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

    async findUserWithKey(key) {
        try {
            const res = await this.db.query('SELECT id, name, email, secretkey FROM users WHERE findkey = $1', [key]);
            if (res.rows.length) {
                return res.rows[0];
            } else return 1;
        } catch (e) {
            console.error(e);
            return 0;
        }
    }

    async changePassword(user) {
        const bcrypt = require('bcryptjs');
        const salt = bcrypt.genSaltSync(10);
        try {
            await this.db.query('UPDATE users SET password = $1 WHERE id = $2', [bcrypt.hashSync(user.newPassword, salt), user.id]);
            return true;
        } catch (e) {
            console.log(e.stack);
            return false;
        }
    }

    async deletAccount(user) {
        try {
            await this.db.query('DELETE FROM users WHERE id = $1', [user.id]);
            return true;
        } catch (e) {
            console.log(e.stack);
            return false;
        }
    }

}

module.exports = new User();