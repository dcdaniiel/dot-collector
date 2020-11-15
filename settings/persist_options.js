const { db } = require('../src/db');

const persist_options =
  process.env.test_persist_option === 'memory' ? ['memory'] : ['knex', db];

module.exports = { persist_options };
