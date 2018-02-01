'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Profiles; //requiring the methods
const config = require('../../config/development.json')
const app = express() //
const path = require('path')//
const pg = require('pg')

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:3000/';

const Twit = require('twit');
const helper = require('../controllers/profiles.js')

var T = new Twit({
  consumer_key:         'hPwQLGT14IDfrhKJ6FtjVYni7',
  consumer_secret:      'RE1jam20D7J4whwh94TT1vPddPfyhq8Gye5DQZAoXqFI5fdO3t',
  access_token:         '957040105226555392-VCJq4UtXbn5xqG8jsWUHSm4zFKMzuc0',
  access_token_secret:  'DrGtYziXg38BaNmvlj2w9JkaXQffciScncga0ANSSJwcF',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
                                  //can i use this for storing data every 5 min
})
//
app.set('view enginer', 'ejs');
app.set('views', path.join(__dirname, 'views'))
//

let params = { q: '#facebook', count: 5 }
//use time ago 5 min for 3 months
let company = {}
router.route('/')
.get(ProfileController.getAll) //running methods from controllers/profiles.js
// .post(ProfileController.create)
  // T.get('search/tweets', params, function(err, data, res) {
  //   let tweets = data.statuses;
  //   // let company = {};
  //   // create dummy data
  //     company.id = 1
  //     company.name = "Facebook"
  //     console.log(company)
  //     // res.json(company)///why doesnt res.json work?
  //
  // });
    // response.render("company", {company: companyData});
//next get tweets about the company to render with ejs



  // let formattedData = {}
  // for(var i = 0; i < tweets.length; i++){
  //   formattedData = {
  //     id: tweets[i].id_str,
  //     user: tweets[i].user.screen_name,
  //     message: tweets[i].text,
  //     time: tweets[i].created_at
  //   }
  //   console.log(formattedData)
  // }



// let getData = T.get('statuses/user_timeline', params, function(err, data, res){
//   data.forEach(user => {
//     // let name = user.user.name.split(" ")
//     let name = user.user.name.replace(/[^\w\s]/gi, '').split(' ')
//     name = name.filter((n) => { return n.length >= 1 });
//     let formattedData = {
//      user_id: user.user.id_str,
//      first: name[0],
//      last: name[name.length - 1],
//      display: user.user.screen_name,
//      message: user.text
//     }
//     console.log(formattedData)
//   })
// })








router.route('/:id')
  .get(ProfileController.getOne)
  .put(ProfileController.update)
  // .delete(ProfileController.deleteOne)
  ;

module.exports = router;
