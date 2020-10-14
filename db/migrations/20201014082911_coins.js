exports.up = function (knex) {
  return knex.schema.createTable('coins', (table) => {
    table.uuid('id').primary();
    table
      .uuid('author_id')
      .references('accounts.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
    table
      .uuid('transfer_id')
      .references('transfers.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
    table.integer('quantity').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('coins');
};
