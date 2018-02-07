const models = require('../../db/models');
const tweetSeed = require('../../db/seeds/tweet.js')
const middleware = require('../middleware');
const Twit = require('twit');
const helper = require('../controllers/profiles.js')
const knex  = require('knex')(require('../../knexfile'));
var sentiment = require('sentiment');

var T = new Twit({
  consumer_key:         'hPwQLGT14IDfrhKJ6FtjVYni7',
  consumer_secret:      'RE1jam20D7J4whwh94TT1vPddPfyhq8Gye5DQZAoXqFI5fdO3t',
  access_token:         '957040105226555392-VCJq4UtXbn5xqG8jsWUHSm4zFKMzuc0',
  access_token_secret:  'DrGtYziXg38BaNmvlj2w9JkaXQffciScncga0ANSSJwcF',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
                                  //can i use this for storing data every 5 min
})

let company = {};
let messages = [];
let res = []; //for post data
let dummyMessages = [];
//export variable with api data
let params = { q: '#facebook', count: 100 }



//get twitter data and send to db
// module.exports.getT = (req, resp) => {
// T.get('search/tweets', params, function(error, data , response) {
//     let tweets = data.statuses;
//       console.log(tweets[0].text)
//       tweets.forEach(tweet => {
//         messages.push(tweet)
//       })
//       console.log(messages[0].text)
//       tweetSeed.seed(knex, messages)
// });
// }
//STREAM twitter data and send to db
module.exports.getStream = (req, resp) => {
  let params = {
    track: 'facebook,Facebook,#facebook,#Facebook',
    // id: '2306250325,474763492,960421733021831200,960682751321022500'
    // ,
    language: 'en',
    place: {country: 'United States'}
  }
  // var stream = T.stream('statuses/filter', params)
  stream.on('tweet', function (tweet) {
    //change tweet to messages?? to work with getT
    // console.log(tweet)
    tweetSeed.seed(knex, tweet)
    let phrase = tweet.text
    sentiment(phrase, function (err, result) {
        sentiResponse = 'sentiment(' + phrase + ') === ' + result.score;
        // console.log(sentiResponse, 'inside sentiment')
        // res.send(response);
    });
  })
}

// app.get('/testSentiment',
//     function (req, res) {
//         var response = "<HEAD>" +
//           "<title>Twitter Sentiment Analysis</title>\n" +
//           "</HEAD>\n" +
//           "<BODY>\n" +
//           "<P>\n" +
//           "Welcome to the Twitter Sentiment Analysis app.  " +
//           "What phrase would you like to analzye?\n" +
//           "</P>\n" +
//           "<FORM action=\"/testSentiment\" method=\"get\">\n" +
//           "<P>\n" +
//           "Enter a phrase to evaluate: <INPUT type=\"text\" name=\"phrase\"><BR>\n" +
//           "<INPUT type=\"submit\" value=\"Send\">\n" +
//           "</P>\n" +
//           "</FORM>\n" +
//           "</BODY>";
//         var phrase = req.query.phrase;
//         if (!phrase) {
//             res.send(response);
//         } else {
//             sentiment(phrase, function (err, result) {
//                 response = 'sentiment(' + phrase + ') === ' + result.score;
//                 res.send(response);
//             });
//         }
//     });


//render data from db
module.exports.render = (req, res) => {
  console.log('inside render')
  module.exports.getStream()
  models.Profile.fetchAll() ///constraints here!!
    .then(profiles => {
      company.id = 1
      company.name = "Facebook"
      let renderData = [];
      profiles.models.forEach(item => {
        if(renderData.length <= 10){
          renderData.push(item.attributes)
        } else {
          renderData.splice(0, 1)
          renderData.push(item.attributes)
          // console.log(renderData, 'rendering data')
          // { id: 2694,
          //   message: '@ccciru Si la buscas por el buscador de facebook t aparece gorda !!!',
          //   time: 2018-02-05T20:15:15.000Z,
          //   score: '5',
          //   companyId: 1 }
        }
      })
      res.render('body.ejs', {renderData: renderData, company: company})
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      console.log('rendering error')
      res.status(503).send(err);
    });

}

//get and filter messages from the db!! works
module.exports.getAll = (req, res) => {
  console.log('inside getAll')
  // console.log(messages)//works
  models.Profile.where({companyId: 1}).fetchAll( //filter api data here from pg
    //select * from tweet where (with related tweet)
    {withRelated:['company']}
  ) ///constraints here!!
    .then(profiles => {
      // console.log(profiles.models[0].attributes)
      let companyTable = []
      profiles.models.forEach(item => {
        // console.log(item.attributes, 'llll')
        companyTable.push(item.attributes)
        dummyMessages.push(item.attributes.message)
      })
      console.log(dummyMessages, 'dummy') //company objects/table
      //change to api data?
      // res.render('company.ejs', {messages: dummyMessages, company: company})
      //^^^^^^ not working yet to filter for rendering
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      console.log('getAll error')
      res.status(503).send(err);
    });
};

// module.exports.postData = (req, res) => {
//   // console.log('here')
//   // message.push(this.getT());
//   console.log('here')
//   console.log('ADDED!!')
//   console.log(messages)
//
// }

module.exports.addTweet = (req, res) => {
  console.log('ADDED!!')
  models.Profile.forge({ message: res.statuses.text })
    .save()
    .then(result => {
      console.log('inside promise line 21')
      res.status(201).send(result);
    })
    .catch(err => {
      if (err) {
        res.status(500).send(err);
      }
    });
};

module.exports.create = (req, res) => {
  console.log('CREATED!!')
  models.Profile.forge({ username: req.body.username, password: req.body.password })
    .save()
    .then(result => {
      res.status(201).send(result.omit('password'));
    })
    .catch(err => {
      if (err.constraint === 'users_username_unique') {
        return res.status(403);
      }
      res.status(500).send(err);
    });
};

module.exports.getOne = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      res.status(200).send(profile);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      return profile.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};



// module.exports.deleteOne = (req, res) => {
//   models.Profile.where({ id: req.params.id }).fetch()
//     .then(profile => {
//       if (!profile) {
//         throw profile;
//       }
//       return profile.destroy();
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(503).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };
module.exports.test = "test";
module.exports.messages = messages;
