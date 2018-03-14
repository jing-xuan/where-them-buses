var express = require('express');
var request = require('request');
var apiConfig = require('./config.js');
var fs = require('fs');

var app = express();
app.use(express.static('public'));

function readContent(callback) {
  fs.readFile("/JX/CS/Where-is-my-bus/data.txt", "utf8", function (err, content) {
    if (err) return callback(err)
    callback(null, content)
  })
}

app.get('/', function(req, res){
  var data;
  var call = {
    url: apiConfig.url + '=59439',
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
    res.render('index.ejs', {data: jsonObj});
  });/**
  readContent(function (err, content) {
    //console.log(content);
    var jsonObj = JSON.parse(content);
    res.render('index.ejs', {data: jsonObj});
  });**/
});

app.listen(80);
console.log("listening at port 80");
