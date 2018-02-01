let data = require('../../server/controllers/profiles')
exports.seed = function(knex, Promise) {
  return knex('tweet').del()
    .then(function () {
      // Inserts seed entries
      return knex('tweet').insert([
        {id: 1, message: 'Facebook is fun', time: '', score:'5', companyId: 1},
        {id: 2, message: 'Facebook is not fun', time: '', score:'-5', companyId: 1},
        {id: 3, message: 'APPLE!!!', time: '', score:'2', companyId: 2},
        {id: 4, message: ':(', time: '', score:'2', companyId: 1},
        {id: 5, message: ':)', time: '', score:'2', companyId: 3}

      ]);
    })
};
