var express = require('express');
var Q = require('q');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();

var port = process.env.PORT || 8080;
var url = "mongodb://localhost:27017/mydb";

var ObjectId = require('mongodb').ObjectID;
var mongoDb; // global mongoDb variable

// Prod Setup
var mongo_uri = process.env.MONGOLAB_URI;

// set assets folder
app.use(express.static('assets'));
app.use(express.static('dist'));

// For POST request parsing
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.sendFile( __dirname + "/index.html" );
});

app.post('/saveToFavorites', function (req, mainres) {
    req.body.notes = ""; // initialize notes

    mongoDb.collection("favorites").insertOne(req.body, function(err, res) {
       if (err) throw err;
       console.log("1 record inserted");

       mainres.setHeader('Content-Type', 'text/plain');
       mainres.send("1 record inserted");
    });
});

app.get('/getFavorites', function (req, res) {  

  mongoDb.collection("favorites").find({}).toArray(function(err, result) {
      if (err) throw err;
       console.log('result', result);

       res.setHeader('Content-Type', 'application/json');
       res.send(result);
  });
});

app.get('/deleteFavorite/:id', function (req, res) {  

  var id = req.params.id;  
  mongoDb.collection("favorites").remove( {"_id": ObjectId(id)});
  
  res.setHeader('Content-Type', 'text/plain');
  res.send("record deleted");
});

app.post('/saveNotes', function (req, res) {  

  var notes = req.body.notes;
  var id = req.body.id;
  mongoDb.collection("favorites").remove( {"_id": ObjectId(id)});
  
  res.setHeader('Content-Type', 'text/plain');
  res.send("record updated");
});

MongoClient.connect(mongo_uri, function(err, db) {
  if (err) throw err;

  mongoDb = db; // save open db to global object

  db.createCollection("favorites", function(err, res) {
     if (err) throw err;
     //db.close();
  });
});

var server = app.listen(port, function () {
   var host = server.address().address
   //var port = server.address().port

   console.log("wpromote star wars front end project listening at http://%s:%s", host, port)

})
