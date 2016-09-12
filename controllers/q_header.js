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
    router.get('/header/select', function (req, res, next) {
        var LoginAccount = req.query.LoginAccount;
        var LoginPassword = req.query.LoginPassword;
        knex.select('nickName').from('user_info').where('userName', LoginAccount).where('password',LoginPassword).then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });
};