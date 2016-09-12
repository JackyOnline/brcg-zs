var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var moment = require('moment');
var _ = require('underscore');
var util = require('../lib/util');
var knex = require('../lib/common/mysqlClient').knex;

module.exports = function (app) {
    app.use('/', router);


    //获取文章列表
    router.get('/document/list', function (req, res, next) {
        var term = req.query;
        var totlsize ;
        var sql = knex.select('*').from('article_info').where('state','!=',3);

        //拼接sql
        if(term.title){
            sql = sql.where('title',req.query.title);
        }
        if(term.pubDate_s){
            sql = sql.where('pubDate_s','>=',req.query.pubDate_s);
        }
        if(term.pubDate_e){
            sql = sql.where('pubDate_e','<=',req.query.pubDate_e);
        }
        if(term.slMenu){
            sql = sql.where('slMenu',req.query.slMenu);
        }
        if(term.flMenu){
            sql = sql.where('flMenu',req.query.flMenu);
        }
        if(term.state){
            sql = sql.where('state',req.query.state);
        }
        if(term.publishJg){
            sql = sql.where('publishJg',req.query.publishJg);
        }
        // 执行sql
        sql.then(function (reply) {
            totlsize = reply.length;
            sql = sql.orderBy('pubDate','desc').limit(10).offset(parseInt(req.query.recordStart));
            return sql;
        }).then(function (reply) {
            for(var i =0;i<reply.length;i++){
                if(reply[i].pubDate){
                    reply[i].pubDate = moment(reply[i].pubDate).format('YYYY-MM-DD');
                }else{
                    reply[i].pubDate = '暂未发布';
                }

            }
            res.json({data: reply,totlsize:totlsize});
        }).catch(function (err) {
            next(err);
        });
    });


    //获取seq_no的文档内容
    router.get('/document/get', function (req, res, next) {
        var seq_no = req.query.seq_no;

        var sql = knex.select('*').from('article_info').where('seq_no',seq_no);
        // 执行sql
        sql.then(function (reply) {
            if(reply[0].pubDate){
                reply[0].pubDate = moment(reply[0].pubDate).format('YYYY-MM-DD HH:MM:SS');
            }
            if(reply[0].setDate){
                reply[0].setDate = moment(reply[0].setDate).format('YYYY-MM-DD HH:MM:SS');
            }
            if(reply[0].revokeDate){
                reply[0].revokeDate = moment(reply[0].revokeDate).format('YYYY-MM-DD HH:MM:SS');
            }
            if(reply[0].opDate){
                reply[0].opDate = moment(reply[0].opDate).format('YYYY-MM-DD HH:MM:SS');
            }

            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    router.post('/document/inpo', function (req, res, next) {
        var pro = req.body;
        // 拼接添加sql
        var sql = knex('article_info');
        //如果文章已存在
        if(pro.setDate){
            pro.setDate = moment().format('YYYY-MM-DD HH:mm:ss');
        }
        if(pro.pubDate){
            pro.pubDate = moment().format('YYYY-MM-DD HH:mm:ss');
        }
        pro.opDate = moment().format('YYYY-MM-DD HH:mm:ss');
        if(pro.seq_no==0){
            sql =  sql.where('seq_no',pro.seq_no);
            sql = sql.update(pro);
        }
        //不存在，则新建文章
        else{
            sql =  sql.insert(pro);
        }
        sql.then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });

    //修改发布状态
    router.get('/document/release', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var state = req.query.state;
        var mydate = new Date();
        mydate = moment().format('YYYY-MM-DD HH:mm:ss');
        var sql = knex('article_info').where('seq_no',seq_no);
        //拼接sql
        if(state == 1){
            sql = sql.update({state:1,pubDate:mydate,revokeDate:null,opDate:mydate});
        }else if(state == 2){
            sql = sql.update({state:2,pubDate:null,revokeDate:mydate,opDate:mydate});
        }else if(state == 3){
            sql = sql.update({state:3,opDate:mydate});
        }
        // 执行sql
        sql.then(function (reply) {

            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });


    //获取seq_no的文档内容
    router.get('/document/keyw', function (req, res, next) {
        var keyWord = req.query.keyWord;
        var seq_no = req.query.seq_no;

        knex.select('*').from('article_info').where('keyWord',keyWord).where('state',1).where('seq_no','!=',seq_no).orderBy('pubDate','desc').limit(3).then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //全局搜索
    router.get('/document/globalQuery', function (req, res, next) {
        var term = req.query;
        var totlsize ;
        var sql = knex.select('*').from('article_info').where('state','=',1);

        //拼接sql
        if(term.title){
            sql = sql.where('title','like','%'+req.query.title+'%');
        }
        if(term.pubDate_s){
            sql = sql.where('pubDate_s','>=',req.query.pubDate_s);
        }
        if(term.pubDate_e){
            sql = sql.where('pubDate_e','<=',req.query.pubDate_e);
        }
        // 执行sql
        sql.then(function (reply) {
            totlsize = reply.length;
            sql = sql.orderBy('pubDate','desc').limit(10).offset(parseInt(req.query.recordStart));
            return sql;
        }).then(function (reply) {
            for(var i =0;i<reply.length;i++){
                reply[i].pubDate = moment(reply[i].pubDate).format('YYYY-MM-DD');

            }
            res.json({data: reply,totlsize:totlsize});
        }).catch(function (err) {
            next(err);
        });
    });
};