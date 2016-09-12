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
    //获取一级菜单下的二级菜单
    router.get('/menuList/get', function (req, res, next) {
        var flMenu = req.query.flMenu;

        knex.select('*').from('op_menu_info').where('parent_menu_seq',flMenu).then(function (reply) {

            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //获取三级菜单（同命名规则的二级菜单****·****）
    router.get('/slMenuList/get', function (req, res, next) {
        var flMenu = req.query.flMenu;

        knex.select('*').from('op_menu_info').where('parent_menu_seq',flMenu).then(function (reply) {

            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

};