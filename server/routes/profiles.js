'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Profiles; //requiring the methods


const Twit = require('twit');
const helper = require('../controllers/profiles.js')
var T = new Twit({
  consumer_key:         'hPwQLGT14IDfrhKJ6FtjVYni7',
  consumer_secret:      'RE1jam20D7J4whwh94TT1vPddPfyhq8Gye5DQZAoXqFI5fdO3t',
  access_token:         '957040105226555392-VCJq4UtXbn5xqG8jsWUHSm4zFKMzuc0',
  access_token_secret:  'DrGtYziXg38BaNmvlj2w9JkaXQffciScncga0ANSSJwcF',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

// let params = { q: 'banana since:2011-07-11', count: 100 }
// T.get('search/tweets', params , getTweets())
//
// function getTweets(err, data, response) {
//   console.log('test inside get tweets', data, response)
// }


//q is used for the search, count is how many tweets...etc
router.route('/')
T.get('search/tweets', { q: 'banana since:2011-07-11', count: 3 }, function(err, data, response) {
  console.log(data)
})
// T.get('search/tweets', params , getTweets())

  // .get(ProfileController.getAll) //running methods from controllers/profiles.js
  // .post(ProfileController.create)
  ;

router.route('/:id')
  .get(ProfileController.getOne)
  .put(ProfileController.update)
  // .delete(ProfileController.deleteOne)
  ;

module.exports = router;
