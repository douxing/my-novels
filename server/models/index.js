const config = require('../config');
const Sequelize = require('sequelize');
const pg = new Sequelize(config.PGCONNSTR);

const User = pg.import(`./user`);
const LoginPassport = pg.import(`./login_passport`);

const db = {
  pg,
  User,
  LoginPassport,
  Story
};

module.exports = db;
