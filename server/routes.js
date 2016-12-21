const express = require('express');
const router = module.exports = express.Router();

router.get('*', function (req, res) {
  res.render('index', {
    script_src: 'public/bundle.js'
  });
});
