exports.up = function (knex) {
    return knex.schema.alterTable('users', table => {
        table.string('verification_token').notNullable().unique()
        table.boolean('verified').notNullable().defaultTo(false)
    })
}

exports.down = function (knex) {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('verification_token')
        table.dropColumn('verified')
    })
}
