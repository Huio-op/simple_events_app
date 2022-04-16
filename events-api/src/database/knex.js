require('dotenv').config();

let knex;

knex = require('knex')({
  client: 'pg',
  connection: process.env.DB_URL,
  log: {
    warn(message) {
      console.log(`Knex: ${message}`);
    },
    error(message) {
      console.log(`Knex:  ${message}`);
    },
    deprecate(message) {
      console.log(`Knex: ${message}`);
    },
    debug(message) {
      console.log(`Knex: ${message}`);
    },
  },
  pool: {
    min: 1,
    max: 2,
    afterCreate: function (connection, callback) {
      connection.query(`SET TIMEZONE = 'America/Sao_Paulo';`, function (err) {
        callback(err, connection);
      });
    },
  },
});

module.exports = knex;
