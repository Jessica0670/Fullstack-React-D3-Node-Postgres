const models = require('../../db/models');
const tweetSeed = require('../../db/seeds/tweet.js')
const middleware = require('../middleware');
const Twit = require('twit');
const helper = require('../controllers/profiles.js')
const knex  = require('knex')(require('../../knexfile'));
var T = new Twit({
  consumer_key:         'hPwQLGT14IDfrhKJ6FtjVYni7',
  consumer_secret:      'RE1jam20D7J4whwh94TT1vPddPfyhq8Gye5DQZAoXqFI5fdO3t',
  access_token:         '957040105226555392-VCJq4UtXbn5xqG8jsWUHSm4zFKMzuc0',
  access_token_secret:  'DrGtYziXg38BaNmvlj2w9JkaXQffciScncga0ANSSJwcF',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
                                  //can i use this for storing data every 5 min
})


// app.locals({
//     test: {
//         title: 'ExpressBootstrapEJS'
//     }
// });

let company = {};
let messages = [];
let res = []; //for post data
let dummyMessages = [];
//export variable with api data
let params = { q: '#facebook', count: 10 }



//get twitter data
module.exports.getT = (req, res) => {
T.get('search/tweets', params, function(error, data , response) {
    let tweets = data.statuses;
    // create dummy data
      company.id = 1
      company.name = "Facebook"
      console.log(tweets[0].text)
      tweets.forEach(tweet => {
        messages.push(tweet)
      })
      // console.log(messages[0].text)
      // let promise = new Promise;
      tweetSeed.seed(knex, messages)
      module.exports.getAll()
      res.render('company.ejs', {messages: messages, company: company})
  // }
});
}

//send messages to the db //or send to seed with global var
module.exports.postData = (req, res) => {
  // console.log('here')
  // message.push(this.getT());
  console.log('here')
  console.log('ADDED!!')
  console.log(messages)

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
