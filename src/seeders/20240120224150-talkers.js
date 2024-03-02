/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, _Sequelize) => queryInterface.bulkInsert('talkers',
    [
      {
        full_name: 'Admin',
        age: 35,
        email: 'admin@email.com',
        password: '$2b$10$C/QWbn.hg7VQ2aa72tnNeu8js6e10auhbky4ikZEtxEHAL33Gs5Wu',
        // password: test123
      },
      {
        full_name: 'Admin2',
        age: 32,
        email: 'admin2@email.com',
        password: '$2b$10$MtYZacwLBIDrTDnw3tscSOBT.aslqlV9PFK9ckRp/4BpIDTz/XZNO',
        // password: test321
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('talkers', null, {}),
};
