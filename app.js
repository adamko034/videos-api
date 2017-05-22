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

module.exports = app;