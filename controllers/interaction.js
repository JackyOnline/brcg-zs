var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var moment = require('moment');
var _ = require('underscore');
var util = require('../lib/util');
var knex = require('../lib/common/mysqlClient').knex;

module.exports = function (app) {
    app.use('/', router);


    //获取互动交流信息列表
    router.get('/inter/list', function (req, res, next) {
        var inter = req.query;
        var totlsize ;
        var sql = knex.select('*').from('interaction_info');

        //拼接sql
        if(inter.title){
            sql = sql.where('title','like','%'+req.query.title+'%');
        }
        if(inter.questioner){
            sql = sql.where('questioner',req.query.questioner);
        }
        if(inter.launch_timeS){
            sql = sql.where('launch_time','>=',req.query.launch_timeS);
        }
        if(inter.launch_timeE){
            sql = sql.where('launch_time','<=',req.query.launch_timeE);
        }
        if(inter.handle_state){
            sql = sql.where('handle_state',req.query.handle_state);
        }
        if(inter.handler){
            sql = sql.where('handler',req.query.handler);
        }
        if(inter.processing_timeS){
            sql = sql.where('processing_time','>=',req.query.processing_timeS);
        }
        if(inter.processing_timeE){
            sql = sql.where('processing_time','<=',req.query.processing_time);
        }
        if(inter.type){
            sql = sql.where('type',req.query.type);
        }
        if(req.query.qianduan){
            sql = sql.where('handle_state',3).where('open',1);
        }
        // 执行sql
        sql.then(function (reply) {
            totlsize = reply.length;
            sql = sql.orderBy('launch_time','desc').limit(10).offset(parseInt(req.query.recordStart));
            return sql;
        }).then(function (reply) {
            for(var i =0;i<reply.length;i++){
                reply[i].processing_time = moment(reply[i].processing_time).format('YYYY-MM-DD');
                reply[i].launch_time = moment(reply[i].launch_time).format('YYYY-MM-DD');
            }
            res.json({data: reply,totlsize:totlsize});
        }).catch(function (err) {
            next(err);
        });
    });

    //互动交流详情
    router.get('/inter/get', function (req, res, next) {
        var seq_no = req.query.seq_no;

        var sql = knex.select('*').from('interaction_info').where('seq_no',seq_no);
        // 执行sql
        sql.then(function (reply) {
            if(reply[0].launch_time){
                reply[0].launch_time = moment(reply[0].launch_time).format('YYYY-MM-DD HH:MM:SS');
            }
            if(reply[0].processing_time){
                reply[0].processing_time = moment(reply[0].processing_time).format('YYYY-MM-DD HH:MM:SS');
            }

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
        var sql = knex.select('*').from('interaction_info').where('seq_no',seq_no);
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