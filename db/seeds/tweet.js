let data = require('../../server/controllers/profiles')
let tweet = data.messages;
let test = data.test;
//require controller file for api data variable here
exports.seed = function(knex, data, Promise) {
  console.log(data, 'DATAAA')
  // console.log('inside tweet seed file', data[0].created_at)
  return knex('tweet')
  .then(function () {
    return knex('tweet').insert(
      [
      {message: data[0].text, time: data[0].created_at, score:'5', companyId: 1}
      // ,
      // {message: data[1].text, time: data[1].created_at, score:'-5', companyId: 1},
      // {message: data[2].text, time: data[2].created_at, score:'2', companyId: 2},
      // {message: data[3].text, time: data[3].created_at, score:'2', companyId: 1},
      // {message: data[4].text, time: data[4].created_at, score:'2', companyId: 3},
      // {message: data[5].text, time: data[5].created_at, score:'2', companyId: 3},
      // {message: data[6].text, time: data[6].created_at, score:'2', companyId: 1},
      // {message: data[7].text, time: data[7].created_at, score:'2', companyId: 2},
      // {message: data[8].text, time: data[8].created_at, score:'2', companyId: 1},
      // {message: data[9].text, time: data[9].created_at, score:'2', companyId: 1}
    ]
  );
  })
};

  // // return models.Profile.fetch()
  //   .then((profile) => {
  //     console.log(data[0].text, 'inside tweetjs')
  //
  //     if (profile) {
  //       throw profile;
  //     }
  //     return models.Profile.forge({
  //       message: data[0].text,
  //       time: data[0].created_at,
  //       score:'5',
  //       companyId: 1
  //     })
  //     // .then(() => {
  //     //    knex.select().from(‘tweet’)
  //          .then((t) => {
  //            console.log(item, 'itemmmmmm')
  //               res.send(item)
  //             })
  //     // .done();
  //   // })
  //   .error(err => {
  //     console.error('ERROR: failed to create profile');
  //     throw err;
  //   })
