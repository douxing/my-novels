module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('login_passports', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },

      login_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('login_passports');
  }
};
