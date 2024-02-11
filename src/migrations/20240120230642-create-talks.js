/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('talks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      watchedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        field: 'watched_at',
      },
      rate: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      talkerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'talker_id',
        references: {
          model: 'talkers',
          key: 'id',
        },
      },
    }),

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('talks'),
};