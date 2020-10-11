const db = require('../db');

module.exports = {
  persistorProviderSettings:
    process.env.settings === 'dev' ? ['memory'] : ['knex', db],
};
