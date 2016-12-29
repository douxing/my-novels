module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password_salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING, // reserved
      allowNull: true
    },
    role: {
      type: DataTypes.STRING, // reserved
      allowNull: true
    },
    meta: {
      type: DataTypes.JSONB, // used by logic
      allowNull: true,
      defaultValue: null
    }
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true
  });

  return User;
};
