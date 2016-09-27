var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var moment = require('moment');
var _ = require('underscore');
var util = require('../lib/util');
var knex = require('../lib/common/mysqlClient').knex;

module.exports = function (app) {
    app.use('/', router);


    //获取案例列表
    router.get('/gsal/list', function (req, res, next) {
        var inter = req.query;
        var totlsize ;
        var sql = knex.select('*').from('case_show');
        // 执行sql
        sql.then(function (reply) {
            totlsize = reply.length;
            sql = sql.orderBy('time','desc').limit(9).offset(parseInt(req.query.recordStart));
            return sql;
        }).then(function (reply) {
            for(var i =0;i<reply.length;i++){
                reply[i].time = moment(reply[i].time).format('YYYY-MM-DD HH:MM:SS');
            }
            res.json({data: reply,totlsize:totlsize});
        }).catch(function (err) {
            next(err);
        });
    });

    //获取案例详情
    router.get('/gsal/get', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex.select('*').from('case_show').where('seq_no',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
};