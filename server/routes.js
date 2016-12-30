const express = require('express');
const router = module.exports = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cookieParser = require('cookie-parser');

const userCtrl = require('./controllers/userController');

const apiRouter = express.Router();

apiRouter.use(cookieParser());

apiRouter.post('/login', jsonParser, userCtrl.login);
apiRouter.delete('/logout', jsonParser, userCtrl.logout);

router.use('/api', apiRouter);

router.get('*', function (req, res) {
  res.render('index', {
    script_src: 'public/bundle.js'
  });
});
