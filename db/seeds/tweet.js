let data = require('../../server/controllers/profiles')
let tweet = data.messages;
//require controller file for api data variable here
exports.seed = function(knex, Promise) {
  return knex('tweet').del()
    .then(function () {
      return knex('tweet').insert([
        {id: 1, message: tweet, time: '', score:'5', companyId: 1},
        {id: 2, message: 'Facebook is not fun', time: '', score:'-5', companyId: 1},
        {id: 3, message: 'APPLE!!!', time: '', score:'2', companyId: 2},
        {id: 4, message: ':(', time: '', score:'2', companyId: 1},
        {id: 5, message: ':)', time: '', score:'2', companyId: 3}

      ]);
    })
};
