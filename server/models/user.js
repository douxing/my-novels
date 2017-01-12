module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('user', {
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true
  });

  return User;
};
