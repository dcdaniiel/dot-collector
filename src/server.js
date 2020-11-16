require('dotenv').config();

const { startServer } = require('./api');

const start = startServer(process.env.PORT, 'knex');

module.exports = start;
