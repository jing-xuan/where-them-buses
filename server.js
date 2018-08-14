var express = require('express');
var request = require('request');
var apiConfig = require('./config.js');
var fs = require('fs');

var app = express();
app.use(express.static('public'));

function readContent(callback) {
  fs.readFile("/path-to-your-testdata/data.txt", "utf8", function (err, content) {
    if (err) return callback(err)
    callback(null, content)
  })
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '\\views\\index.html');
});

app.get('/:busCode', function(req, res){
  var data;
  var call = {
    url: apiConfig.apiUrl + req.params.busCode,
    method: 'GET',
    headers: {
      'AccountKey': apiConfig.AccountKey,
      'Accept' : 'application/json'
    }
  }
  request(call, function(err, r, body){
    console.log(body);
    var jsonObj = JSON.parse(body);
    var d = new Date();
    console.log(d.getTime());
    res.render('bus.ejs', {data: jsonObj});
  });/**
  readContent(function (err, content) {
    //console.log(content);
    var jsonObj = JSON.parse(content);
    res.render('index.ejs', {data: jsonObj});
  });**/
});

app.listen(80);
console.log("listening at port 80");
