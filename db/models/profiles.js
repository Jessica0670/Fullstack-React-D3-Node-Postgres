const db = require('../');

const Profile = db.Model.extend({
  tableName: 'company',
  auths: function() { //do i need this??
    return this.hasMany('Auth');
  }
});

module.exports = db.model('Profile', Profile);
