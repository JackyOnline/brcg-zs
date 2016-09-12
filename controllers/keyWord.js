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

    //新增关键字
    router.post('/keyWord/insert', function (req, res, next) {
        var key_word = req.body.key_word;
        // 拼接添加sql
        var sql = knex.select("*").from('keyword_info').where('key_word',key_word);

        sql.then(function (reply) {
            if (reply.length > 0) {
                return {data: '已存在'};
            } else {
                return knex('keyword_info').insert({'key_word':key_word});
            }
        }).then(function (reply) {
            if(reply.data == '已存在'){
                res.json({data: '已存在'});
            }else{
                res.json({data: '成功'});
            }
        }).catch(function (err) {
            next(err);
        });

    });
    //获取关键字列表
    router.get('/keyWord/list', function (req, res, next) {
        var term = req.query;
        var totlsize ;
        var sql = knex.select('*').from('keyword_info');
        //拼接sql
        if(term.key_wordList){
            sql = sql.where('key_word',req.query.key_wordList);
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

    router.get('/keyWord/select', function (req, res, next) {
        var sql = knex.select('*').from('keyword_info');
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //删除
    router.get('/keyWord/del', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex('keyword_info').where('seq_no',seq_no);
        //拼接sql
        sql = sql.del().then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });


};
