exports.up = function (knex) {
  return knex.schema.createTable('accounts', (table) => {
    table.uuid('id').primary();
    table
      .uuid('user_id')
      .references('users.id')
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .unique();
    table.timestamp('created_at').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('accounts');
};
