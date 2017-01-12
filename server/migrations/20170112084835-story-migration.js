module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('stories', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },

      meta: {
        type: DataTypes.JSONB, // used by logic
        allowNull: true,
        defaultValue: null
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.dropTable('stories');
  }
};
