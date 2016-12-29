module.exports = function (sequelize, DataTypes) {
  const User = sequelize.models.User;
  const LoginName = sequelize.define('LoginName', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    login_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'login_names',
    timestamps: true,
    underscored: true
  });

  LoginName.belongsTo(User);

  return LoginName;
};
