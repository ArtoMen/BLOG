class db {
    constructor() {
        const { Client } = require('pg')
        this.db = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'blog',
            password: 'root',
            port: 5432,
        });
        this.db.connect()
        console.log('DataBase connected!');
    }
}

module.exports = db;