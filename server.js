//get the packages we need.
var express = require('express');
var app = express();
var ig = require('instagram-node').instagram();

//config the app, tell node where to look for site resources.
app.use(express.static(__dirname + '/public'));

//set the view engine to ejs
app.set('view engine', 'ejs');

//configure instagram app w/ client-id
ig.use({
  client_id: '98767aab19f1438a9749bff380624076',
  client_secret: '59fa64bf08ff4535bdd91404248b97b9'
});

//set the routes
//home page route - popular images
app.get('/', function(req, res) {
  //use the instagram package to get popular media
  ig.media_popular(function(err, medias, remaining, limit) {
    //render the home page and pass in the popular images
    res.render('pages/index', { grams: medias});
  });
});

//start server
app.listen(8080);
console.log('App started. Load http://localhost:8080 in browser');
