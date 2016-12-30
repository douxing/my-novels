const co = require('co');
const crypto = require('crypto');

// set connection string before require
// process.env.PGCONNSTR = 'postgres://name@localhost/my-novels-dev';
if (!process.env.PGCONNSTR) {
  throw '[seed error] set environment PGCONNSTR before you go...'
}

const db = require('../server/models');

co(function * () {
  yield db.pg.sync({ force: true });

  let password_salt = crypto.randomBytes(16).toString('base64');
  let hashed_password = crypto.createHash('sha256')
                              .update('123456')
                              .update(password_salt)
                              .digest('base64');

  let users = {};
  [
    users.admin
  ] = yield [db.User.create({
    nickname: 'admin',
    password_salt: password_salt,
    hashed_password: hashed_password,
  })];

  users.admin.login_passports = [];
  users.admin.login_passports[0] = yield db.LoginPassport.create({
    login_name: 'admin@unknown.com',
    user_id: users.admin.id
  });

  console.info('Seeds done...');
}).catch((err) => {
  console.error(`error on seeds:`, err);
});
