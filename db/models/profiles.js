const db = require('../');

const Profile = db.Model.extend({
  // console.log('inside db/models/profiles.js')
  tableName: 'profiles'
  // ,
  // auths: function() {
  //   return this.hasMany('Auth');
  // }
});

module.exports = db.model('Profile', Profile);
