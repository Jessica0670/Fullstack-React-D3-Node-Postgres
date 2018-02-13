const models = require('../../db/models');
const tweetSeed = require('../../db/seeds/tweet.js')
const middleware = require('../middleware');
const Twit = require('twit');
const helper = require('../controllers/profiles.js')
const knex  = require('knex')(require('../../knexfile'));
var sentiment = require('sentiment');



let company = {};
let messages = [];
let res = []; //for post data
let dummyMessages = [];
//export variable with api data
// let params = { q: '#facebook', count: 100 }



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
    language: 'en',
    place: {country: 'United States'}
  }
  // var stream = T.stream('statuses/filter', params)
  var stream = T.stream('statuses/sample')

  stream.on('tweet', function (tweet) {
    //change tweet to messages?? to work with getT
    // console.log(tweet)
    let phrase = tweet.text
    sentiment(phrase, function (err, result) {
        sentiResponse = 'sentiment(' + phrase + ') === ' + result.score;
        // console.log(result.score, 'inside sentiment')
        // res.send(response);
        tweetSeed.seed(knex, tweet, result.score)

    });

  })
}


//render data from db
module.exports.render = (req, res) => {
  console.log('inside render')
  //stream data to db
  // module.exports.getStream()
  // module.exports.search()
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
//filter data by company instead of id
//render search data scores to d3

module.exports.filterDB = (req, res) => {
  // let string = value typed in search
  console.log(req.params.term, 'params!!!!') //==> {id: '5555'} //change to string
  knex('tweet')
  // .where({
  //   id: req.params.term
  //   // id: '5555'
  // })
  .select('message', 'score')
  // models.Profile.where({ message: req.params.term
  //   // , message contains string
  // }).fetchAll()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      // let resultsForGraph = [];
      // for(var i = 0; i < profile.length; i++){
      //   if(profile[i].message.indexOf(req.params.term) >= 0){
      //     console.log('HERE', req.params.term)
      //     // resultsForGraph.push(profile[i].score)
      //   }
      // }
      console.log(profile[0].score, 'message inside filter')
      //res.render all data that match string
      res.status(200).send(profile);
    })
    .error(err => {
      console.log(err, 'error inside filter')
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};




//searches db by id.....
module.exports.search = (req, res) => {
  // let string = value typed in search
  console.log(req.params, 'params!!!!') //==> {id: '5555'} //change to string
  models.Profile.where({ id: req.params.id
    // , message contains string
  }).fetchAll()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      //res.render all data that match string
      res.status(200).send(profile);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};



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
