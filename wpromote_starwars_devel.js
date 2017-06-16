var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static('assets'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/index.html" );
})

var server = app.listen(port, function () {
   var host = server.address().address
   //var port = server.address().port

   console.log("wpromote star wars front end project listening at http://%s:%s", host, port)

})
