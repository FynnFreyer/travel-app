const knex = require('knex')
const knexfile = require('./knexfile')

const db = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL
})

module.exports = db
