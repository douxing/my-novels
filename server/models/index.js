const Sequelize = require('sequelize');
const config = require('../config');
const pg = new Sequelize(config.PGCONNSTR);

const User = pg.import(`./user`);
const LoginPassport = pg.import(`./login_passport`);

const db = {
  pg,
  User,
  LoginPassport
};

module.exports = db;
