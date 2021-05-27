const db = require('./db');
const moment = require('moment');

class Post extends db {
    async create(user, text, image) {
        try {
            const sql = 'INSERT INTO posts(user_id, text_post, date_create, date_update, image, update) VALUES($1, $2, $3, $4, $5, false)';
            const time = moment().format('YYYY-MM-DD HH:mm:ss');
            const params = [user.id, text, time, time, image];
            await this.db.query(sql, params);
            return 1;
        } catch (e) {
            console.log(e);
            return 0;
        }
    }

}

module.exports = new Post();