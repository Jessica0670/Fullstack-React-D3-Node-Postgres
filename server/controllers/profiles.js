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

//STREAM twitter data and send to db
//also creates sentiment and runs seen function
module.exports.getStream = (req, resp) => {
  let params = {
    track: 'facebook,Facebook,#facebook,#Facebook',
    language: 'en',
    place: {country: 'United States'}
  }
  // var stream = T.stream('statuses/filter', params)
  var stream = T.stream('statuses/sample')

  stream.on('tweet', function (tweet) {

    let phrase = tweet.text
    sentiment(phrase, function (err, result) {
        sentiResponse = 'sentiment(' + phrase + ') === ' + result.score;
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
      console.log(renderData, 'render DATA line 66')
      //renderData ==>
      // [{ id: 33015,
      // message: 'cock up your bumper',
      // username: '__nketiah',
      // time: 2018-02-14T00:24:24.000Z,
      // score: '-5',
      // companyId: 1 }]

      //sends data to ejs
      res.render('body.ejs', {renderData: renderData, company: company})
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      console.log('rendering error')
      res.status(503).send(err);
    });

}

module.exports.filterDB = (req, res) => {
  // let string = value typed in search
  knex('tweet')
  // .where({
  //   id: req.params.term
  //   // id: '5555'
  // })
  .select('message', 'score', 'time')
  // models.Profile.where({ message: req.params.term
  //   // , message contains string
  // }).fetchAll()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      console.log(profile[0], 'message inside filter')
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
  console.log(req.params, 'params!!!!')
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
  models.Profile.where({companyId: 1}).fetchAll( //filter api data here from pg
    {withRelated:['company']}
  )
    .then(profiles => {
      let companyTable = []
      profiles.models.forEach(item => {
        companyTable.push(item.attributes)
        dummyMessages.push(item.attributes.message)
      })
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
