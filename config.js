if (!process.env.PGCONNSTR) {
  throw 'env.PGCONNSTR is NOT set...';
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  PGCONNSTR: process.env.PGCONNSTR
};
