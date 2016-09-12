var express = require('express');
var router = express.Router();
var Grid = require('gridfs-stream');
var mongoClient = require('../lib/common/mongoClient');
var fs = require('fs');
var gm = require('gm');
var Busboy = require('busboy');
var uuid = require('node-uuid');
//var gfs = Grid(mongoClient.connection.db, mongoClient.mongoose.mongo);
module.exports = function (app) {
    app.use('/', router);

    router.get('/', function (req, res, next) {
        res.send('Hello');
    });

    router.get('/upload/:id', function (req, res, next) {
        var readstream = gfs.createReadStream({
            filename: req.params.id
        });
        res.set('Content-Type', 'image/jpeg');
        readstream.on('error', function (err) {
            next(err);
        }).pipe(res).on('end', function (res) {
        });
    });

    router.post("/upload", function (req, res, next) {
        var busboy = new Busboy({headers: req.headers, limits: {fileSize: 10000000}});
        var newfilename = uuid.v1()+ '.jpg';
        busboy.on('error', function (err) {
            res.end();
        }).on('file', function (fieldname, file, filename, encoding, mimetype) {

            var writestream = gfs.createWriteStream({
                filename: newfilename
            });
            file.pipe(writestream).on('end', function (err) {
                console.log(err);
            });

            console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
            file.on("end", function () {
            })
        }).on('finish', function (err) {
            res.json({date:newfilename})
        });
        req.pipe(busboy);
    })

    router.post("/upload/video", function (req, res, next) {
        var busboy = new Busboy({headers: req.headers, limits: {fileSize: 10000000}});

        var newfilename = uuid.v1()
        busboy.on('error', function (err) {
            res.end();
        }).on('file', function (fieldname, file, filename, encoding, mimetype) {
            var filetype =filename.substring(filename.lastIndexOf('.') + 1);
            newfilename = newfilename +'.'+filetype;
            var writestream = gfs.createWriteStream({
                filename: newfilename
            });
            file.pipe(writestream).on('end', function (err) {
                console.log(err);
            });

            console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
            file.on("end", function () {
            })
        }).on('finish', function (err) {
            res.json({date:newfilename})
        });
        req.pipe(busboy);
    })


    router.get('/release/app', function (req, res, next) {
        queryService.getReleaseFileSize().then(function (size) {
            res.setHeader('Content-Length', size.toString());

            var readstream = gfs.createReadStream({
                filename: 'fzr.apk'
            });
            readstream.on('error', function (err) {
                next(err);
            }).pipe(res).on('end', function (res) {
            });
        }).catch(next);
    });


    router.get('/release/appversion', function (req, res, next) {
        var readstream = gfs.createReadStream({
            filename: 'version.json'
        });
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        readstream.on('error', function (err) {
            next(err);
        }).pipe(res).on('end', function (res) {
        });
    });


};