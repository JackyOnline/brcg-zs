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
        //首页
    router.get('/home', function (req, res){
        res.render('FrontPage/home',{code:0,text:""});
    });
    //全局查找
    router.get('/globalQuery', function (req, res){
        res.render('FrontPage/globalQuery',{title:req.query.title});
    });
    //菜单列表
    router.get('/menu', function (req, res){

        knex.select('*').from('op_menu_info').where('parent_menu_seq',req.query.flMenu).then(function (reply) {
            //结果菜单
            var menus = new Array();
            //二级菜单名字
            var meName = '';
            //临时二级菜单
            var slM = new Array();

            for(var i=0;i<reply.length;i++){
                //菜单分割
                var str = new Array();
                var str = reply[i].menu_name.split("·");
                //根据菜单名处理
                if(str.length == 1){
                    menus.push(reply[i]);
                }else if(str.length > 1){
                    if(meName != str[0]){
                        meName = str[0]
                        slM.menu_name = str[0];
                        slM.type = '菜单';
                        menus.push(slM);
                        reply[i].menu_name = str[1];
                    }
                    reply[i].menu_name = str[1];
                    reply[i].tlMenu = 1;
                    menus.push(reply[i]);
                }
            }
            res.render('FrontPage/menu',{menus:menus,flMenu:req.query.flMenu});
        }).catch(function (err) {
            next(err);
        });

    });
    //用户信息
    router.get('/bzzx', function (req, res){
        res.render('FrontPage/bzzx',{code:0,text:""});
    });
    //在线考试
    router.get('/gsal', function (req, res){
        res.render('FrontPage/gsal',{code:0,text:""});
    });
    //考试系统
    router.get('/gswh', function (req, res){
        res.render('FrontPage/gswh',{code:0,text:""});
    });
    //内容列表
    router.get('/gywn', function (req, res){
        res.render('FrontPage/gywn',{flMenu:req.query.flMenu});
    });
    //详细内容
    router.get('/index', function (req, res){
        res.render('FrontPage/index',{seq_no:req.query.seq_no});
    });
    //调查列表
    router.get('/lxwm', function (req, res){
        res.render('FrontPage/lxwm',{code:0,text:""});
    });
    //调查内容
    router.get('/investigateInfo', function (req, res){
        res.render('FrontPage/investigateInfo',{seq_no:req.query.seq_no});
    });
    //互动交流
    router.get('/interaction', function (req, res) {
        res.render('FrontPage/interaction',{slMenu:req.query.slMenu});
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
    //用户管理
    router.get('/userList', function (req, res){
        //        res.render('userManager',{type:req.body.type});
        res.render('userList',{code:0,text:""});
    });
    //调查列表
    router.get('/investigateArray', function (req, res){
        res.render('investigateArray',{code:0,text:""});
    });
    //调查内容
    router.get('/investigate', function (req, res){
        res.render('investigate',{seq_no:req.query.seq_no});
    });

    //互动交流
    router.get('/communicate', function (req, res) {
        res.render('communicate',{code:0,text:""});
    });
    //管理员权限
    router.get('/communicate', function (req, res) {
        res.render('communicate',{code:0,text:""});
    });
    //互动交流列表
    router.get('/interactionList', function (req, res) {
        res.render('interactionList',{code:0,text:""});
    });
    //题目列表
    router.get('/questionList', function (req, res) {
        res.render('questionList',{code:0,text:""});
    });
    //关键字管理列表
    router.get('/keyWordList', function (req, res) {
        res.render('keyWordList',{code:0,text:""});
    });
    //管理员权限列表
    router.get('/adminList', function (req, res) {
        res.render('adminList',{code:0,text:""});
    });
    //内容列表
    router.get('/docList', function (req, res) {
        res.render('docList',{code:0,text:""});
    });
    //文档详细页
    router.get('/docManager', function (req, res) {
        if(req.query.seq_no){
            res.render('docManager',{seq_no:req.query.seq_no});
        }else{
            res.render('docManager',{seq_no:0});
        }
    });

};