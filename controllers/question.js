var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var moment = require('moment');
var _ = require('underscore');
var util = require('../lib/util');
var knex = require('../lib/common/mysqlClient').knex;

module.exports = function (app) {
    app.use('/', router);
    //获取题目列表
    router.get('/question/list', function (req, res, next) {
        var term = req.query;
        var totlsize ;
        var sql = knex.select('*').from('question_info').where('state','!=',3);
        //拼接sql
        if(term.question){
            sql = sql.where('question',req.query.question);
        }
        if(term.score){
            sql = sql.where('score',req.query.score);
        }
        if(term.state){
            sql = sql.where('state',req.query.state);
        }
        // 执行sql
        sql.then(function (reply) {
            totlsize = reply.length;
            sql = sql.orderBy('seq_no','desc').limit(10).offset(parseInt(req.query.recordStart));
            return sql;
        }).then(function (reply) {
            res.json({data: reply,totlsize:totlsize});
        }).catch(function (err) {
            next(err);
        });
    });
    //修改发布状态
    router.get('/question/release', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var state = req.query.state;
        var sql = knex('question_info').where('seq_no',seq_no);
        //拼接sql
        if(state == 1){
            sql = sql.update({state:1,});
        }else if(state == 2){
            sql = sql.update({state:2,});
        }else if(state == 3){
            sql = sql.update({state:3,});
        }
        // 执行sql
        sql.then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });
//添加
    router.post('/question/insert', function (req, res, next) {
        var pro = req.body;
        var sql = knex('question_info').insert(pro);
        // 执行sql
        sql.then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });
};