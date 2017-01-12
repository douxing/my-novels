process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV !== 'development'
    && process.env.NODE_ENV !== 'test'
    && process.env.NODE_ENV !== 'production') {
  console.error(`invalid NODE_ENV: ${NODE_ENV}`);
  throw `invalid NODE_ENV: ${NODE_ENV}`;
}

const client_config = require('../../client/config');
const sequelize_config = require('./sequelize.config');


module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PG: sequelize_config[process.env.NODE_ENV],
  PORT: Number.parseInt(process.env.PORT),
  ACCOUNT_COOKIE: client_config.ACCOUNT_COOKIE,

  // N.B. change this every time your restart your server
  HMAC_SECRET: process.env.MY_NOVELS_SECRET
            ||'Und wenn du lange in einen Abgrund blickst, '
            + 'blickt der Abgrund auch in dich hinein.'
};
