const config = require('../config');
const Sequelize = require('sequelize');

console.log('config:', config);

const pg = new Sequelize(config.PG.database,
                         config.PG.username,
                         config.PG.passowrd, {
                           host: config.PG.hostname,
                           dialect: config.PG.dialect
                         });
const User = pg.import(`./user`);
//const LoginPassport = pg.import(`./login_passport`);

//LoginPassport.belongsTo(User);
//User.hasMany(LoginPassword);

const db = {
  pg,
  User,
  //LoginPassport,
  //Story
};

module.exports = db;
