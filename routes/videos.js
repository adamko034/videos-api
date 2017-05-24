var Video = require('../models/video');
var express = require('express');
var Busboy = require('busboy')
var path = require('path')
var os = require('os')
var fs = require('fs');
var appRoot = require('app-root-path')
var router = express.Router();

router.route('/videos').get(function(req, res) {
    Video.find(function(err, video) {
        if(err) {
            return res.send(err);
        }

        res.json(video)
    });
});

router.route('/videos').post(function(req, res) {
    var video = new Video(req.body);
    console.log(req.body)
    console.log('saving video: ' + video.title + video.description + video.user)

    video.save(function(err) {
        if (err) {
            return res.send(err);
        }

        res.send({message: 'Video saved!'})
    })
});

router.route('/videos/:id').get(function(req, res) {
    var id = req.params.id;

    console.log('searching for video: ' + id)

    Video.findById({_id: id}, function(err, video){ 
        if (err) {
            return res.send(err);
        }

        res.json(video);
    })
})

router.route('/videobb').post(function(req, res) {
    var busboy = new Busboy({headers: req.headers});
    var video = new Video();

    busboy.on('file', function(fieldname, file, filename) {
        var saveTo = path.join(appRoot.resolve('videos'), filename)
        
        console.log('uploading file to: ' + saveTo)

        file.pipe(fs.createWriteStream(saveTo));

        video.filePath = saveTo;
    });

    busboy.on('field', function(fieldname, val) {
        console.log('field: ' + fieldname + '  value: ' + val)

        video[fieldname] = val
    });

    busboy.on('finish', function() {
        console.log('saving video: ')
        console.log(video)
        
        video.save(function(err) {
            if(err) {
                res.writeHead(500, {Connection: 'close'});
                return res.send(err);
            }
        })

        res.writeHead(303, {Connection: 'close', Location: '/'});
        res.end();
    });

    req.pipe(busboy);
});

router.route('/videos/:id/stream').get(function(req, res) {
    var id = req.params.id;

    console.log('searching for video: ' + id)

    Video.findById({_id: id}, function(err, video){ 
        if (err) {
            return res.send(err);
        }

        movieStream = fs.createReadStream(video.filePath);
        movieStream.on('open', function () {
            res.writeHead(206, {
                "Content-Type": "video/mp4"
            });

            movieStream.pipe(res);
        });
    })
});

router.route('/videos/:id').delete(function(req,res) {
    var id = req.params.id;

    console.log('removing video:' + id)

    Video.remove({_id: id}, function(err){
        if (err) {
            return res.send(err);
        }

        res.json({message: 'Successfulyy deleted.'});
    })
});

module.exports = router;