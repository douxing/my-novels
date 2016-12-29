const client_config = require('../client/config');

if (!process.env.PGCONNSTR) {
  throw 'env.PGCONNSTR is NOT set...';
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV | 'development',
  PGCONNSTR: process.env.PGCONNSTR,
  PORT: Number.parseInt(process.env.PORT),
  ACCOUNT_COOKIE: client_config.ACCOUNT_COOKIE
}
