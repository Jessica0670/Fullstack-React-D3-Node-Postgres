
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tweet').del()
    .then(function () {
      // Inserts seed entries
      return knex('tweet').insert([
        {id: 1, message: 'Facebook is fun', time: '', score:'5', companyId: 1},
        {id: 2, message: 'Facebook is not fun', time: '', score:'-5', companyId: 1},
      ]);
    });
};
