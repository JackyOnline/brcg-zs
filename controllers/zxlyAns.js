var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var moment = require('moment');
var _ = require('underscore');
var util = require('../lib/util');
var knex = require('../lib/common/mysqlClient').knex;

module.exports = function (app) {
    app.use('/', router);


    //获取客户咨询列表
    router.get('/zxlyAns/list', function (req, res, next) {
        var inter = req.query;
        var totlsize ;
        var sql = knex.select('*').from('online_message').where('state','!=','3');
        // 执行sql
        sql.then(function (reply) {
            totlsize = reply.length;
            sql = sql.orderBy('state','asc').orderBy('consultT','desc').limit(10).offset(parseInt(req.query.recordStart));
            return sql;
        }).then(function (reply) {
            for(var i =0;i<reply.length;i++){
                reply[i].consultT = moment(reply[i].consultT).format('YYYY-MM-DD HH:MM:SS');
            }
            res.json({data: reply,totlsize:totlsize});
        }).catch(function (err) {
            next(err);
        });
    });

    //修改咨询状态
    router.get('/zxlyAns/get', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sta = req.query.seq_no;
        if(sta==1){ var sql = knex.update({'state':2}).from('online_message').where('seq_no',seq_no);}
        else{var sql = knex.update({'state':3}).from('online_message').where('seq_no',seq_no);}
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //修改发布状态
    router.get('/inter/release', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var state = req.query.state;
        var mydate = new Date();
        mydate = moment().format('YYYY-MM-DD HH:mm:ss');
        var sql = knex.select('*').from('online_message').where('seq_no',seq_no);
        //拼接sql
        if(state == 2){
            sql = sql.update({state:3,processing_time:mydate,handle_state:4,});
        }
        // 执行sql
        sql.then(function (reply) {

            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });
    //回复
    router.get('/inter/reply', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var mydate = new Date();
        var xq_reply =req.query.xq_reply;
        var operator =req.query.operator;
        mydate = moment().format('YYYY-MM-DD HH:mm:ss');
        var sql = knex.select('*').from('interaction_info').where('seq_no',seq_no);
            sql = sql.update({reply:xq_reply,handle_state:3,handler:operator,processing_time:mydate});
        // 执行sql
        sql.then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });

    router.post('/inter/inpo', function (req, res, next) {
        var pro = req.body;
        // 拼接添加sql
        pro.launch_time = moment().format('YYYY-MM-DD HH:mm:ss');
        var sql = knex('interaction_info').insert(pro);
        sql.then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });

};