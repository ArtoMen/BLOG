const db = require('./db');

class comments extends db {
    async create(user_id, post_id, text) {
        try {
            const time = moment().format('YYYY-MM-DD HH:mm:ss');
            const sql = 'INSERT INTO comments(user_id, date_create, date_update, update, post_id, text) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
            const data = [user_id, time, time, false, post_id, text];
            return await (await this.db.query(sql, data)).rows[0];
        } catch (e) {
            console.log(e);
            return 0;
        }
    }
}

module.exports = new comments();