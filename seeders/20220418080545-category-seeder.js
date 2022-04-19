'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [
      {
        name: 'NodeJs'
      }, {
        name: "VueJs"
      },
      {
        name: 'ReactJs'
      },
      {
        name: "ReactNative"
      },
      {
        name: 'Lalavel'
      },
      {
        name: "Flutter"
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', {}, null);
  }
};
