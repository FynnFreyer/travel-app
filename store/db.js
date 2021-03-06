const knex = require('knex')

let db_options = {
    client: 'pg',
    connection: {connectionString: process.env.DATABASE_URL}
}

if (process.env.NODE_ENV === 'production') {
    db_options.connection.sslmode = 'require'
    db_options.connection.ssl = {rejectUnauthorized: false}
}

const db = knex(db_options)

module.exports = db
