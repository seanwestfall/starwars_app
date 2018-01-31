var express = require('express');
var Q = require('q');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();

var port = process.env.PORT || 8080;
var url = "mongodb://localhost:27017/mydb";

var ObjectId = require('mongodb').ObjectID;
var mongoDb; // global mongoDb variable

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

    console.log('req.body', req.body);
    console.log('req.body.table', req.body.table);

    mongoDb.collection(req.body.table + "_favorites").insertOne(req.body, function(err, res) {
       if (err) throw err;
       console.log("1 record inserted");

       mainres.setHeader('Content-Type', 'text/plain');
       mainres.send("1 record inserted");
    });
});

app.get('/getFavorites', function (req, res) {  
  mongoDb.collections(function(e, collections) {
      if (e) throw e;
      var names = collections.filter(function (collection) { return /_favorites?/.test(collection.s.name) });
      console.log('collections', collections);
      console.log('names', names);
  
      var nameslength = names.length;
      console.log('nameslength', nameslength);
      var result_collections = [];
      var sendCounter = 0;
      names.forEach(function(collection) {
        mongoDb.collection(collection.s.name).find({}).toArray(function(err, result) {
          if (err) throw err;
           console.log('result', result);

           result_collections.push(result);
           sendCounter++;

           if(sendCounter == nameslength) {
            console.log('send fired!', result_collections);
            res.setHeader('Content-Type', 'application/json');
            res.send(result_collections);
           }
        });
      })
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

MongoClient.connect(url, function(err, db) {
  if (err) throw err;

  mongoDb = db.db("mydb"); // save open db to global object

  mongoDb.createCollection("favorites", function(err, res) {
     if (err) throw err;
     //db.close();
  });
});

var server = app.listen(port, function () {
   var host = server.address().address
   //var port = server.address().port

   console.log("wpromote star wars front end project listening at http://%s:%s", host, port)

})
