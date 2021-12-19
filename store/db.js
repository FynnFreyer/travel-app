const knex = require('knex')
const knexfile = require('./knexfile')

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: false
    }
})

module.exports = db
