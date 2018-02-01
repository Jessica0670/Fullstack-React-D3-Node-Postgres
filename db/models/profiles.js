const db = require('../');

const Company = db.Model.extend({
  tableName: 'company',
  tableName: 'tweet'
  // ,
  // auths: function() { //do i need this??
  //   return this.hasMany('tweet');
  // }
});

module.exports = db.model('Company', Company);
// module.exports = db.model('Tweet', Tweet);
