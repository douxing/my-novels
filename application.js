const config = require('./config');

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './server/views');

app.use(require('./server/routes'));

app.listen(config.PORT, function () {
  console.log(`application started on port: ${config.PORT}`);
});
