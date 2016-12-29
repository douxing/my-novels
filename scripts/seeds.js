const co = require('co');
const crypto = require('crypto');

// set connection string before require
// process.env.PGCONNSTR = 'postgres://dx@localhost/my-novels-dev';
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


  //     email: 'douxing1983@163.com',

  let users = {};
  [
    users.dx
  ] = yield [db.User.create({
    nickname: 'dx',
    password_salt: password_salt,
    hashed_password: hashed_password,
  })];

  users.dx.login_names = [];
  users.dx.login_names[0] = yield db.LoginName.create({
    login_name: 'dou.xing1983@163.com',
    user_id: users.dx.id
  });

  console.info('Seeds done...');
}).catch((err) => {
  console.error(`error on seeds:`, err);
});
