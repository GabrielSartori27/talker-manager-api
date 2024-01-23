'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('talks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      watchedAt: {
        allowNull: false,
        type: Sequelize.DATE,
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
      }
    });
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('talks');
  },
};