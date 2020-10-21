exports.up = function (knex) {
  return knex.schema.createTable('transfers', (table) => {
    table.uuid('id').primary();
    table
      .uuid('from_account')
      .references('accounts.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
    table
      .uuid('to_account')
      .references('accounts.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
    table.string('type').notNullable();
    table.string('description');
    table.integer('value').notNullable();
    table.timestamp('created_at').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('transfers');
};
