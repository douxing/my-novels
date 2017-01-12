// this file handles sequelize related env
const url = require('url');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

let username = 'postgres';
let password = null;
let database = `my-novels-${process.env.NODE_ENV}`;
let hostname = 'localhost';

if (process.env.PGCONNSTR) {
  const urlObj = url.parse(process.env.PGCONNSTR);
  let auth = [];
  if (urlObj.auth) {
    auth = urlObj.auth.split(':');
  }

  username = auth[0] || username;
  password = auth[1] || password;

  database = urlObj.pathname.substr(1) || database;
  hostname = urlObj.hostname || hostname;
}

const env = {
  username: username,
  password: password,
  database: database,
  hostname: hostname,
  dialect: 'postgres'
};

module.exports = {
  development: env,
  test: env,
  production: env
};
