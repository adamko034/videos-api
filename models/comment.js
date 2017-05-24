var mongoose = require('mongoose');
var Schema = mongoose.Schema

var commentSchema = new Schema({
    'content': String,
    'user': String,
    'videoId': String
});

module.exports = mongoose.model('Comment', commentSchema);