/**
 * Created by Jacky on 2016/8/9.
 */
//添加用户
$(function () {
    var $p_id = $("#header_page");
    $("#signIn").hide();
    $p_id.find("#sign").on('click',function(){
        $p_id.find("#signIn").show();
    });
    $p_id.find("#reg").on('click',function(){
        location.href="/userInfo";
    });
    $p_id.find("#reply").on('click',function(){
        //登陆
        var LoginAccount = $p_id.find("#LoginAccount").val();
        var LoginPassword = $p_id.find("#LoginPassword").val();
        debugger;
        $.ajax({
            type: "get",
            url: '/header/select?LoginAccount='+LoginAccount+"&LoginPassword="+LoginPassword,
            dataType: "json",
            data:{},
            success: function (data) {
                if(data.data.length == 0){
                    var label=document.getElementById("signLabel");
                    label.innerHTML="账号或密码错误";
                    $("#signLabel").css("color","red");
                    debugger;
                } else {
                    $("#signIn").hide();
                    $p_id.find("#UNLabel").show();
                    debugger;
                    $p_id.find("#UNLabel").append("<b>"+data.data[0].nickName+"</b>");
                    $("#sign").hide();
                    $("#reg").hide();
                }
                debugger;
            },
            error:function (data) {
            }
        })
    });
    $p_id.find("#return").on('click',function(){
        $p_id.find("#signIn").hide();
    });
})