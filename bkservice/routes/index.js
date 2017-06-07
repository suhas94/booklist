var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//for login
router.post('/login', function(req, res, next) {

  var b = {};

  for (var key in req.body) {
    var splitted = key.split(',');
    console.log(splitted);
    var username = splitted[0]
    var password = splitted[1];
  }

  MongoClient.connect("mongodb://localhost:27017/users", function(err, db) {
    if(err) { return console.log(err); }

    var collection = db.collection('users');

    collection.find().toArray(function(err, items) {
          console.log(username, password);
          if (items[0].username === username && items[0].password === password) {
            console.log("trueeee");
            res.send({"message": "OK"});
            res.status(200);
          }
          else {
            res.status(404);
            res.send({"message": "user not found"});
            console.log("false");
          }

        db.close();
      });
  })
  // res.status(404);

});



router.post('/', function(req, res, next) {

  var b = {};

  for (var key in req.body) {
    var splitted = key.split(',');
    console.log(splitted);
    b[splitted[0]] = splitted[1];
  }

  MongoClient.connect("mongodb://localhost:27017/categories", function(err, db) {
    if(err) { return console.log(err); }

    var collection = db.collection('categories');

    collection.insert(b);
  })
  res.status(200);
  res.send({"message": "OK"});
});


router.get('/', function(req, res, next) {
  console.log(req.body)
  MongoClient.connect("mongodb://localhost:27017/categories", function(err, db) {
    if(err) { return console.log(err); }

    var collection = db.collection('categories');

    collection.find().toArray(function(err, items) {
        res.send(items);
        db.close();
      });
  })
  res.status(200);
});


module.exports = router;
