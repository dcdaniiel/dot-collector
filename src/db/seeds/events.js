const { v1: uuid } = require('uuid');

exports.seed = (knex) =>
  knex('events')
    .del()
    .then(() =>
      knex('events').insert([
        {
          id: uuid(),
          created_at: new Date(),
          name: 'Event-1',
        },
        {
          id: uuid(),
          created_at: new Date(),
          name: 'Event-2',
        },
      ])
    );
