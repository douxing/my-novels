const co = require('co');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const {
  User,
  LoginPassport
} = require('../models');

const {
  ACCOUNT_COOKIE,
  HMAC_SECRET
} = require('../config');

exports.login = function (req, res) {
  co(function * () {
    let user = null;
    let now = Math.floor(Date.now() / 1000);

    let {
      grant_type
    } = req.body;

    if (grant_type === 'cookie') {
      let token = null;
      try {
        token = yield new Promise((resolve, reject) => {
          jwt.verify(req.cookies[ACCOUNT_COOKIE], HMAC_SECRET, (err, decoded) => {
            if (err) {
              reject(err);
            } else {
              resolve(decoded);
            }
          });
        });
      } catch (err) {
        res.status(401).json({
          errors: [{
            title: 'unauthorized'
          }]
        });
        return;
      }

      if (now > token.iat + 3600) {
        res.status(401).json({
          errors: [{
            title: 'unauthorized',
          }]
        });
        return;
      }

      if (token.id) {
        user = yield User.findById(token.id, {
          attributes: ['id', 'nickname',
                       'status', 'role', 'meta']
        });
      }

      if (!user) {
        res.status(401).json({
          errors: [{
            title: 'unauthorized'
          }]
        });
        return;
      }
    } else if (grant_type === 'password') {
      let login_passport = null;

      if (req.body.login_name && req.body.password) {
        login_passport = yield LoginPassport.findOne({
          where: {
            login_name: req.body.login_name
          },
          include: [{
            model: User,
            as: 'user'
          }]
        });
      }

      if (!login_passport) {
        res.status(401).json({
          errors: [{
            title: 'unauthorized123'
          }]
        });
        return;
      }

      user = login_passport.user;

      let hashed_password = crypto.createHash('sha256')
                                  .update(req.body.password)
                                  .update(user.password_salt)
                                  .digest('base64');

      if (hashed_password !== user.hashed_password) {
        res.status(401).json({
          errors: [{
            title: 'unauthorized'
          }]
        });
        return;
      }
    } else {
      res.status(401).json({
        errors: [{
          title: 'unauthorized'
        }]
      });
      return;
    }

    user.meta = user.meta || {};
    let last_login_at = user.meta.last_login_at || null;
    user.meta.last_login_at = now;

    yield user.save();

    res.cookie(ACCOUNT_COOKIE, jwt.sign({
      id: user.id
    }, HMAC_SECRET));

    res.status(200).json({
      data: {
        type: 'users',
        id: `${user.id}`,
        attributes: {
          nickname: user.nickname,
          role: user.role,
          status: user.status,
          last_login_at
        }
      }
    });
  }).catch((err) => {
    console.error(`[${__filename}] error:`, err);
    res.status(500).json({
      errors: [{
        title: 'internal error'
      }]
    });
  });
}

exports.logout = function (req, res) {
  co(function * () {
    res.clearCookie(ACCOUNT_COOKIE);
    res.status(200).json({
      data: null
    });
  }).catch((err) => {
    console.error(`[${__filename}] error:`, err);
    res.status(500).json({
      errors: [{
        title: 'internal error'
      }]
    });
  });
}

exports.create = function (req, res) {
  co(function * () {
    let account = null;
    let now = Math.floor(Date.now() / 1000);

    let {
      grant_type
    } = req.body;

    if (grant_type === 'cookie') {
      let account_cookie = req.cookies[ACCOUNT_COOKIE];
      if (!account_cookie) {
        res.status(401).json({
          errors: [{
            title: 'unauthorized'
          }]
        });
        return;
      }

      let token = null;
    } else if (grant_type === 'password') {
      if (req.body.email && req.body.password) {
        account = yield Personnel.findOne({
          where: {
            email: req.body.email
          },
          attributes: ['id', 'nickname', 'status',
                       'role', 'last_login_at',
                       'password_salt', 'hashed_password']
        });
      }

      if (!account) {
        res.status(404).json({
          errors: [{
            title: 'unauthorized'
          }]
        });
      }

      let hashed_password = crypto.createHash('sha256')
                                  .update(req.body.password)
                                  .update(account.password_salt)
                                  .digest('base64');

      if (hashed_password !== account.hashed_password) {
        res.status(401).json({
          errors: [{
            title: 'unauthorized'
          }]
        });
        return;
      }
    } else {
      console.error(`[${__filename}] unknown grant type: ${grant_type}`);
      res.status(401).json({
        errors: [{
          title: 'unauthorized'
        }]
      });
      return;
    }

    yield Personnel.update({
      last_login_at: new Date()
    }, {
      where: {
        id: account.id
      }
    });

    res.cookie(ACCOUNT_COOKIE, jwt.sign({
      id: account.id
    }, HMAC_SECRET));

    res.status(200).json({
      data: {
        type: 'personnels',
        id: account.id,
        attributes: {
          nickname: account.nickname,
          role: account.role,
          status: account.status,
          last_login_at: account.last_login_at
        }
      }
    });
  }).catch((err) => {
    console.error(`[${__filename}] unknown error:`, err);
    res.status(500).json({
      errors: [{
        title: 'internal error'
      }]
    });
  })
};

exports.destroy = function (req, res) {
  co(function * () {
    res.clearCookie(ACCOUNT_COOKIE);
    res.status(200).json({
      data: null
    });
  }).catch((err) => {
    console.error(`[${__filename}] error:`, err);
    res.status(500).json({
      errors: [{
        title: 'internal error'
      }]
    });
  })
};

