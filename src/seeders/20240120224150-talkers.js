/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, _Sequelize) => queryInterface.bulkInsert('talkers',
    [
      {
        full_name: 'John',
        age: 35,
        email: 'john@test.com',
        password: 'teste123',
      },
      {
        full_name: 'Maria',
        age: 32,
        email: 'maria@test.com',
        password: 'teste2123',
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('talkers', null, {}),
};
