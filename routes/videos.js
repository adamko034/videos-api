var Video = require('../models/video.js');
var express = require('express');
var router = express.Router();

router.route('/videos').get(function(req, res) {
    Video.find(function(err, video) {
        if(err) {
            return res.send(err);
        }

        res.json(video)
    });
});

module.exports = router;