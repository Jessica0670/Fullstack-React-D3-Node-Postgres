'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Company; //requiring the methods
const config = require('../../config/development.json')
const app = express() //
const path = require('path')//
const pg = require('pg')

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:3000/';
const middleware = require('../middleware');
const Twit = require('twit');
const helper = require('../controllers/profiles.js')


//
app.set('view enginer', 'ejs');
app.set('views', path.join(__dirname, 'views'))

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
// module.exports = message;
