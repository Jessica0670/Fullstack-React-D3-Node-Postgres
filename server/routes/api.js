'use strict';
const express = require('express');
const router = express.Router();
// var app = express()
// console.log('inside twit.js')
// const Twit = require('twit');
// const helper = require('../controllers/profiles.js')

// var T = new Twit({
//   consumer_key:         'hPwQLGT14IDfrhKJ6FtjVYni7',
//   consumer_secret:      'RE1jam20D7J4whwh94TT1vPddPfyhq8Gye5DQZAoXqFI5fdO3t',
//   access_token:         '957040105226555392-VCJq4UtXbn5xqG8jsWUHSm4zFKMzuc0',
//   access_token_secret:  'DrGtYziXg38BaNmvlj2w9JkaXQffciScncga0ANSSJwcF',
//   timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
// })
//
// let params = { q: 'banana since:2011-07-11', count: 100 }
// T.get('search/tweets', params , getTweets())
//
// function getTweets(err, data, response) {
//   console.log(T, 'test inside get tweets', data, response)
// }

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

module.exports = router;

// app.listen(3000, () => console.log('Twitter app listening on port 3000!'))
