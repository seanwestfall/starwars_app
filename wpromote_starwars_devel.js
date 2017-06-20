var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();

var port = process.env.PORT || 8080;
var url = "mongodb://localhost:27017/mydb";

var mongoDb; // global mongoDb variable

// set assets folder
app.use(express.static('assets'));

// For POST request parsing
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.sendFile( __dirname + "/index.html" );
});

app.post('/saveToFavorites', function (req, res) {
  mongoDb.collection("favorites").insertOne(req.body, function(err, res) {
    if (err) throw err;
    console.log("1 record inserted");
    //mongoDb.close();
  });
});

app.get('/getFavorites', function (req, res) {
  mongoDb.collection("favorites").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);

    res.setHeader('Content-Type', 'application/json');
    res.send(result);

    //mongoDb.close();
  });
});

MongoClient.connect(url, function(err, db) {
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
