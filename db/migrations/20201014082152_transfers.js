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
    table.string('description');
    table.integer('value').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('transfers');
};
