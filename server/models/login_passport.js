module.exports = function (sequelize, DataTypes) {
  const LoginPassport = sequelize.define('LoginPassport', {
    /* id: {
     *   type: DataTypes.UUID,
     *   defaultValue: DataTypes.UUIDV1,
     *   primaryKey: true
     * },
     * login_name: {
     *   type: DataTypes.STRING,
     *   allowNull: false,
     *   unique: true
     * }*/
  }, {
    tableName: 'login_passports',
    timestamps: true,
    underscored: true
  });

  const User = sequelize.models.User;
  LoginPassport.belongsTo(User, {
    as: 'user'
  });
  User.hasMany(LoginPassport, {
    as: 'login_passports'
  });

  return LoginPassport;
};
