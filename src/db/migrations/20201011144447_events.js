exports.up = function (knex) {
  return knex.schema.createTable('events', (table) => {
    table.uuid('id').primary();
    table.timestamp('created_at').notNullable();
    table.string('name', 100).notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('events');
};
