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


    /*********************前端*********************/
    //主页
    router.get('/index', function (req, res){
        res.render('FrontPage/index',{seq_no:req.query.seq_no});
    });
    //帮助中心
    router.get('/bzzx', function (req, res){
        res.render('FrontPage/bzzx',{code:0,text:""});
    });
    //公司案例
    router.get('/gsal', function (req, res){
        res.render('FrontPage/gsal',{code:0,text:""});
    });
    //公司文化
    router.get('/gswh', function (req, res){
        res.render('FrontPage/gswh',{code:0,text:""});
    });
    //公司简介
    router.get('/gywn', function (req, res){
        res.render('FrontPage/gywn',{flMenu:req.query.flMenu});
    });
    //联系我们
    router.get('/lxwm', function (req, res){
        res.render('FrontPage/lxwm',{flMenu:req.query.flMenu});
    });
    //联系我们
    router.get('/zxly', function (req, res){
        res.render('FrontPage/zxly',{flMenu:req.query.flMenu});
    });
    /*********************后台*********************/

        //后台登陆页面
    router.get('/', function (req, res) {
        res.render('login',{code:0,text:""});
    });
    //登录
    router.get('/index', function (req, res) {
        var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
        var Stamp = new Date();
        var user = {};
        user.name = "系统管理员";
        user.mm_dd = (Stamp.getMonth() + 1) +"月"+Stamp.getDate()+ "日";
        user.Week = dayNames[Stamp.getDay()];
        res.render('index',user);
    });
    //留言回复
    router.get('/zxlyAns', function (req, res){
        res.render('zxlyAns',{code:0,text:""});
    });
    //用户管理
    router.get('/gsalPO', function (req, res){
        res.render('gsalPO',{code:0,text:""});
    });
};