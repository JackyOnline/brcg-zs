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
    //查询
    router.get('/admin/list', function (req, res, next) {
        var accounts = req.query.accounts;
        var totlsize ;
        var sql = knex.select('*').from('admin_info');

        if(accounts){
            sql = sql.where('nickname',accounts);
        }

        // 执行sql
        sql.then(function (reply) {
            totlsize = reply.length;
            sql = sql.orderBy('seq_no').limit(10).offset(parseInt(req.query.recordStart));
            return sql;
        }).then(function (reply) {
            res.json({data: reply,totlsize:totlsize});
        }).catch(function (err) {
            next(err);
        });
    });

    //获取管理员详情
    router.get('/admin/get', function (req, res, next) {
        var seq_no = req.query.seq_no;

        var sql = knex.select('*').from('admin_info').where('seq_no',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //更新管理员详情
    router.post('/admin/update', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var ad = req.body;
        var sql = knex('admin_info');

        if(seq_no!=0){
            if(seq_no == 1){
                sql = sql.where('seq_no',seq_no).update({
                    nickname:ad.nickname,
                    accounts:ad.accounts,
                    password:ad.password
                });
            }else{
                sql = sql.where('seq_no',seq_no).update(ad);
            }
        }else{
            ad.state = 1;
            sql = sql.insert(ad);
        }


        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

};