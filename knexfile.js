const config = require('config');
// const knex = require('knex')('developmentknex')
module.exports = config['knex'];

//development or production environments
//query to get messages that match ??? then send to server
