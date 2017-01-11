module.exports = function (sequelize, DataTypes) {
  const Story = sequelize.define('Story', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    meta: {
      type: DataTypes.JSONB, // used by logic
      allowNull: true,
      defaultValue: null
    }
  }, {
    tableName: 'stories',
    timestamps: true,
    underscored: true
  });

  const User = sequelize.models.User;
  Story.belongsTo(User, {
    as: 'owner'
  });
  User.hasMany(Story, {
    as: 'stories'
  });

  return Story;
};
