'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Profiles; //requiring the methods
const config = require('../../config/development.json')

const Twit = require('twit');
const helper = require('../controllers/profiles.js')
var T = new Twit({
  consumer_key:         'hPwQLGT14IDfrhKJ6FtjVYni7',
  consumer_secret:      'RE1jam20D7J4whwh94TT1vPddPfyhq8Gye5DQZAoXqFI5fdO3t',
  access_token:         '957040105226555392-VCJq4UtXbn5xqG8jsWUHSm4zFKMzuc0',
  access_token_secret:  'DrGtYziXg38BaNmvlj2w9JkaXQffciScncga0ANSSJwcF',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

var stream = T.stream('statuses/sample')


//q is used for the search, count is how many tweets, time...etc
//use time ago 5 min for 3 months
router.route('/')
T.get('search/tweets', { q: 'yes since:2011-07-11', count: 10 }, function(err, data, response) {
  console.log(data, data.statuses[0].created_at)
  // res.save(777)
})
//set up schema here to format data to be saved to the db//

//////TWEET overload, needs filtering//////
// stream.on('tweet', function (tweet) {
//   console.log(tweet, 'tweet!!!')
// })
///////////////////////////////////////

  // .get(ProfileController.getAll) //running methods from controllers/profiles.js
  // .post(ProfileController.create)
  ;

router.route('/:id')
  .get(ProfileController.getOne)
  .put(ProfileController.update)
  // .delete(ProfileController.deleteOne)
  ;

module.exports = router;
