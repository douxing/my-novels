const config = require('./server/config');
const express = require('express');
const app = express();

app.use('/public', express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');
app.set('views', './server/views');

app.use(require('./server/routes'));

let PORT = Number.parseInt(config.PORT);
app.listen(PORT, function () {
  console.log(`[${config.NODE_ENV}] application started on port: ${PORT}`);
});
