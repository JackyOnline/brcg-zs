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

    //新增留言
    router.post('/gsalPo/insert', function (req, res, next) {
        var pro = req.body;
        mydate = moment().format('YYYY-MM-DD HH:mm:ss');
        pro.time = mydate;
        var sql = knex('case_show').insert(pro);
        // 执行sql
        sql.then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });
    //登录验证
    router.post('/gsalPo/select', function (req, res, next) {
        var pro = req.body;
        var sql = knex('case_show');
        sql.then(function (reply) {
            if (pro.name == 'admin' && pro.password == 'rcg188') {
                res.json({data: '1'})
            } else {
                res.json({data: '错误'})
            }
        }).catch(function (err) {
            next(err);
        });
    });
};
