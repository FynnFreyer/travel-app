const knex = require('knex')
const knexfile = require('./knexfile')

const db_options = {
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        sslmode: 'require',
        ssl: {rejectUnauthorized: false} // heroku needs this
    }
}

module.exports = db
