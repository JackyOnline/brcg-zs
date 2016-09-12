var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var moment = require('moment');
var _ = require('underscore');
var Promise = require("bluebird");
var knex = require('../lib/common/mysqlClient').knex;
var BusinessError = require('../lib/common/errors/businessError');
var util = require('../lib/util.js');


module.exports = function (app) {
    app.use('/', router);
    //未处理消息数
    router.get('/index/newIn', function (req, res, next) {
        knex.select('*').from('interaction_info').where('state','1').then(function (reply) {
            var len = reply.length;
            res.json(len);
        }).catch(function (err) {
            next(err);
        });
    });
    //新增用户数
    router.get('/index/newUs', function (req, res, next) {
        var data = new Date();
        data.setMonth(data.getMonth()-1);
        data = moment(data).format('YYYY-MM-DD');
        knex.select('*').from('user_info').where('regTime','>=',data).then(function (reply) {
            var len = reply.length;
            res.json(len);
        }).catch(function (err) {
            next(err);
        });
    });

    //总用户数
    router.get('/index/sumUs', function (req, res, next) {
        knex.select('*').from('user_info').then(function (reply) {
            var len = reply.length;
            res.json(len);
        }).catch(function (err) {
            next(err);
        });
    });

    //最新文章
    router.get('/index/newDo', function (req, res, next) {
        knex.select('*').from('article_info').orderBy('pubDate','desc').limit(10).then(function (reply) {
            for(var i =0;i<reply.length;i++){
                reply[i].pubDate = moment(reply[i].pubDate).format('YYYY-MM-DD HH:MM:SS');
            }
            res.json({data:reply});
        }).catch(function (err) {
            next(err);
        });
    });
};