const knex = require('knex')
const knexfile = require('./knexfile')

let db_options = {
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        sslmode: 'require',
        ssl: {rejectUnauthorized: false}
    }
}

if (process.env.IS_HEROKU) {
    console.log('IS_HEROKU wurde gefunden')
    db_options.sslmode = 'require'
    db_options.ssl = {rejectUnauthorized: false}
}

const db = knex(db_options)

module.exports = db
