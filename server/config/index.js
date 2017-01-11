const client_config = require('../../client/config');

if (!process.env.PGCONNSTR) {
  throw 'env.PGCONNSTR is NOT set...';
}

const HMAC_SECRET = 'Und wenn du lange in einen Abgrund blickst, '
                 + 'blickt der Abgrund auch in dich hinein.';

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PGCONNSTR: process.env.PGCONNSTR,
  PORT: Number.parseInt(process.env.PORT),
  ACCOUNT_COOKIE: client_config.ACCOUNT_COOKIE,
  HMAC_SECRET: process.env.HMAC_SECRET || HMAC_SECRET
}
