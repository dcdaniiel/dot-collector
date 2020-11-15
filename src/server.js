require('dotenv').config();

const { server } = require('./api');

const start = server(process.env.PORT, 'knex');

module.exports = start;
