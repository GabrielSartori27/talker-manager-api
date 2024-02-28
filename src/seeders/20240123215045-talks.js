/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, _Sequelize) => queryInterface.bulkInsert('talks',
      [
        {
          watched_at: '2024-02-25',
          rate: 4.5,
          talker_id: 1,
        },
        {
          watched_at: '2024-01-21',
          rate: 5,
          talker_id: 2,
        },
      ],
      {}),

  down: async (queryInterface, _Sequelize) => queryInterface.bulkDelete('talks', null, {}),
};
