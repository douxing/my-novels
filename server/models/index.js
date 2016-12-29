const Sequelize = require('sequelize');
const config = require('../config');
const pg = new Sequelize(config.PGCONNSTR);

const User = pg.import(`./user`);
const LoginName = pg.import(`./login_name`);

const db = {
  pg,
  User,
  LoginName
};

module.exports = db;
