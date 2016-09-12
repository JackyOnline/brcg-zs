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
    //查询重名
    router.get('/user/select', function (req, res, next) {
        var userName = req.query.userName;
        knex.select('userName').from('user_info').where('userName', userName).then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });

    //查询详情
    router.get('/user/selectxq', function (req, res, next) {
        var seq_no = req.query.seq_no;
        knex.select('*').from('user_info').where('seq_no', seq_no).then(function (reply) {
            reply[0].regTime = moment(reply[0].regTime).format('YYYY-MM-DD HH:MM:SS');
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });

    //查询重名
    router.get('/user/change', function (req, res, next) {
        var userName = req.query.userName;
        var acwsType = req.query.acwsType;
        knex('user_info').where('userName', userName).update('acwsType',acwsType).then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });

    //添加
    router.post('/user/insert', function (req, res, next) {
        var pro = req.body;
        var mydate = new Date();
        mydate = moment().format('YYYY-MM-DD HH:mm:ss');
        pro.regTime = mydate;
        // 拼接添加sql
        var sql = knex('user_info').insert(pro);
        // 执行sql
        sql.then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });

    });
    //获取用户列表
    router.get('/userList/list', function (req, res, next) {
        var term = req.query;
        var totlsize ;
        var sql = knex.select('*').from('user_info');

        //拼接sql
        if(term.userName){
            sql = sql.where('userName',req.query.userName);
        }
        if(term.mobile){
            sql = sql.where('mobile',req.query.mobile);
        }
        if(term.nickName){
            sql = sql.where('nickName',req.query.nickName);
        }
        if(term.regTimeS){
            sql = sql.where('regTime','>=',req.query.regTimeS);
        }
        if(term.regTimeE) {
            sql = sql.where('regTime','<=',req.query.regTimeE);
        }
        if(term.sex){
            sql = sql.where('sex',req.query.sex);
        }
        if(term.realName){
            sql = sql.where('realName',req.query.realName);
        }
        if(term.status){
            sql = sql.where('status',req.query.status);
        }
        if(term.acwsType){
            sql = sql.where('acwsType',req.query.acwsType);
        }
        // 执行sql
        sql.then(function (reply) {
            totlsize = reply.length;
            sql = sql.orderBy('regTime').limit(10).offset(parseInt(req.query.recordStart));
            return sql;
        }).then(function (reply) {
            for(var i =0;i<reply.length;i++){
                reply[i].regTime = moment(reply[i].regTime).format('YYYY-MM-DD');
            }
            res.json({data: reply,totlsize:totlsize});
        }).catch(function (err) {
            next(err);
        });
    });
};