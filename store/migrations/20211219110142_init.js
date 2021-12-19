
exports.up = function(knex) {
  return knex.schema
      .createTable('users', table => {
          table.increments('id')
          table.string('email', 254).notNullable().unique()
          table.string('salt', 128).notNullable()
          table.string('pw_hash', 2048).notNullable()
          table.timestamps(true, true)
      })
      .createTable('travels', table => {
          table.increments('id')
          table.string('name', 255).notNullable()
          table.date('start').notNullable()
          table.date('end').notNullable()
          table.string('destination', 16).notNullable()
          table.timestamps(true, true)
      })
      .createTable('travels_made_by', table => {
          table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable()
          table.integer('travel_id').references('id').inTable('travels').onDelete('CASCADE').notNullable()
          table.timestamps(true, true)
      })
};

exports.down = function(knex) {
  return knex.schema
      .dropTable('travels_made_by')
      .dropTable('travels')
      .dropTable('users')
};
