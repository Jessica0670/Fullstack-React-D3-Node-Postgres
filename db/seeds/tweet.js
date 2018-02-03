let data = require('../../server/controllers/profiles')
let tweet = data.messages;
let test = data.test;
//require controller file for api data variable here
exports.seed = function(knex, data, Promise) {
  console.log('inside tweet seed file')
  return knex('tweet')
    .then(function () {
      return knex('tweet').insert(
        [
        {message: data[0].text, time: '', score:'5', companyId: 1},
        {message: data[1].text, time: '', score:'-5', companyId: 1},
        {message: data[2].text, time: '', score:'2', companyId: 2},
        {message: data[3].text, time: '', score:'2', companyId: 1},
        {message: data[4].text, time: '', score:'2', companyId: 3},
        {message: data[5].text, time: '', score:'2', companyId: 3}
        // {id: 7, message: messages[0].text, time: '', score:'2', companyId: 1}
      ]
    );
    })
};
