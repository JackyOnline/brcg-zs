var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var moment = require('moment');
var _ = require('underscore');
var util = require('../lib/util');
var knex = require('../lib/common/mysqlClient').knex;

module.exports = function (app) {
    app.use('/', router);


    //获取调查管理表
    router.get('/inv/list', function (req, res, next) {
        var inter = req.query;
        var totlsize ;
        var sql = knex.select('*').from('investigate_info');

        //拼接sql
        if(inter.title){
            sql = sql.where('title','like','%'+req.query.title+'%');
        }

        if(inter.beginTime){
            inter.beginTime = moment().format('YYYY-MM-DD 00:00:00');
            sql = sql.where('beginTime','<=',inter.beginTime);
        }
        if(inter.endTime){
            inter.endTime = moment().format('YYYY-MM-DD 23:59:59');
            sql = sql.where('endTime','>=',inter.endTime);
        }

        // 执行sql
        sql.then(function (reply) {
            totlsize = reply.length;
            sql = sql.orderBy('beginTime','desc').limit(10).offset(parseInt(req.query.recordStart));
            return sql;
        }).then(function (reply) {
            for(var i =0;i<reply.length;i++){
                reply[i].beginTime = moment(reply[i].beginTime).format('YYYY-MM-DD');
                reply[i].endTime = moment(reply[i].endTime).format('YYYY-MM-DD');
            }
            res.json({data: reply,totlsize:totlsize});
        }).catch(function (err) {
            next(err);
        });
    });

    //新建调查信息
    router.post('/inv/newInv', function (req, res, next) {
        var inver = req.body;
        inver.beginTime = moment().format('YYYY-MM-DD 00:00:00');
        inver.endTime = moment().format('YYYY-MM-DD 23:59:59');
        knex('investigate_info').insert(inver).then(function (reply) {
            res.json({data: '添加成功'});
        }).catch(function (err) {
            next(err);
        });
    });

    //删除调查信息
    router.get('/inv/delete', function (req, res, next) {
        var seq_no = req.query.seq_no;
        knex('investigate_info').where('seq_no',seq_no).del().then(function (reply) {
            res.json({data: '删除成功'});
        }).catch(function (err) {
            next(err);
        });
    });

    //查询调查信息
    router.get('/inv/select', function (req, res, next) {
        var seq_no = req.query.seq_no;
        knex('investigate_info').where('seq_no',seq_no).then(function (reply) {
            reply[0].beginTime = moment(reply[0].beginTime).format('YYYY-MM-DD');
            reply[0].endTime = moment(reply[0].endTime).format('YYYY-MM-DD');
            reply[0].myDate = moment(new Date()).format('YYYY-MM-DD');

            var IPArray = new Array();
            IPArray = reply[0].IPList.split(',');
            reply[0].IPList = IPArray;
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //调查投票
    router.get('/inv/poll', function (req, res, next) {
        var ans = req.query.ans;
        var seq_no = req.query.seq_no;
        var IP = ','+req.query.IP;
        var sql;

        if(ans == 'A'){
            sql = knex.raw('UPDATE investigate_info set Aquantity = Aquantity + 1 , IPList = concat(IPList, "'+IP+'") WHERE seq_no = '+seq_no);
        } else if(ans == 'B'){
            sql = knex.raw('UPDATE investigate_info set Bquantity = Bquantity + 1 , IPList = concat(IPList, "'+IP+'") WHERE seq_no = '+seq_no);
        } else if(ans == 'C'){
            sql = knex.raw('UPDATE investigate_info set Cquantity = Cquantity + 1 , IPList = concat(IPList, "'+IP+'") WHERE seq_no = '+seq_no);
        } else if(ans == 'D'){
            sql = knex.raw('UPDATE investigate_info set Dquantity = Dquantity + 1 , IPList = concat(IPList, "'+IP+'") WHERE seq_no = '+seq_no);
        }
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });


};