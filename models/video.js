var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = new Schema({
    title: String,
    user: String,
    description: String
});

module.exports = mongoose.model('Video', videoSchema);