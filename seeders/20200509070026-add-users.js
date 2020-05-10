'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        username : "user",
        email : "user@test.com",
        password : "user",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username : "admin",
        email : "admin@admin.com",
        password : "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username : "asd",
        email : "asd@asd.com",
        password : "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ]

  return queryInterface.bulkInsert('Users', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
