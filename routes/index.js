var express = require('express');
var router = express.Router();
var config = require('../config.json')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var Twit = require('twit')

var client = new Twit({
  consumer_key:         config.consumer_key,
  consumer_secret:      config.consumer_secret,
  access_token:         config.access_token,
  access_token_secret:  config.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

router.get('/search', function(req,res,next){
  let quer = req.query.q
  client.get('search/tweets', { q: quer, count: 1 }, function(error, data, response) {
    if (error) throw error;
  res.send(data.statuses)
  })


})

module.exports = router;
