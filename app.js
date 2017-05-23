var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var videos = require('./routes/videos.js');
var app = express();

var dbName = 'videosDb';
var connectionString = 'mongodb://localhost:27017/' + dbName;

mongoose.connect(connectionString);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded());
app.use('/api', videos);

app.get('/', function (req, res) {
    res.send('<html><head></head><body>\
               <form action="/api/videobb" method="POST" enctype="multipart/form-data">\
                <input type="text" name="title" placeholder="title"><br />\
                <input type="text" name="description" placeholder="description"><br />\
                <input type="text" name="user" placeholder="loginname"><br />\
                <input type="file" name="file"><br />\
                <input type="submit">\
              </form>\
            </body></html>');
  res.end();
});

module.exports = app;