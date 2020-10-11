exports.up = function (knex) {
  return knex.schema.createTable('attributes', (table) => {
    table.uuid('id').primary();
    table.timestamp('created_at').notNullable();
    table.string('name', 100).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('attributes');
};
