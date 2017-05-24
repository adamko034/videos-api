var express = require('express');
var Comment = require('../models/comment');
var bodyParser = require('body-parser');

var router = express.Router();

router.route('/videos/:id/comments').get(function(req, res) {
    var videoId = req.params.id;
    
    console.log('getting all comments for video: ' + videoId);

    Comment.find({'videoId': videoId}, function(err, comments) {
        if(err) {
            return res.send(err);
        }

        res.json(comments);
    })
});


router.route('/videos/:id/comments').post(function(req, res) {
    var videoId = req.params.id;
    var comment = new Comment(req.body);
    comment.videoId = videoId;

    console.log('Adding comment to video: ' + videoId)
    console.log(comment);

    comment.save(function(err){
        if(err) {
            return res.send(err);
        }

        res.json({message: 'Successfully save comment'});
    })
});

router.route('/comments/:id').delete(function(req, res) {
    var commentId = req.params.id
    
    console.log('Deleting comment ' + commentId)

    Comment.remove({_id: commentId}, function(err) {
        if(err) { return res.send(err)}

        res.json({message: 'Successfully deleted comment'})
    })
})

module.exports = router