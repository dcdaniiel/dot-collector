exports.up = function (knex) {
  return knex.schema.createTable('evaluations', (table) => {
    table.uuid('id').primary();
    table.timestamp('created_at').notNullable();
    table.uuid('rated_id').references('users.id');
    table.uuid('evaluator_id').references('users.id');
    table.uuid('event_id').references('events.id');
    table.uuid('attribute_id').references('attributes.id');
    table.string('description');
    table.integer('note').notNullable();
    table.string('status').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('evaluations');
};
