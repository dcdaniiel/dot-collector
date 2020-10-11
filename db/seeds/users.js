const { v1: uuid } = require('uuid');

exports.seed = (knex) =>
  knex('users')
    .del()
    .then(() =>
      knex('users').insert([
        {
          id: uuid(),
          created_at: new Date(),
          name: 'seed_user_1',
          birthday: '2020-01-01',
          email: 'seed_user_1@test.com',
          password: 'PSSWD',
        },
        {
          id: uuid(),
          created_at: new Date(),
          name: 'seed_user_2',
          birthday: '2020-01-01',
          email: 'seed_user_2@test.com',
          password: 'PSSWD',
        },
      ])
    );
