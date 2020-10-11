const { v1: uuid } = require('uuid');

exports.seed = (knex) =>
  knex('attributes')
    .del()
    .then(() =>
      knex('attributes').insert([
        {
          id: uuid(),
          created_at: new Date(),
          name: 'Attribute_1',
        },
        {
          id: uuid(),
          created_at: new Date(),
          name: 'Attribute_2',
        },
      ])
    );
