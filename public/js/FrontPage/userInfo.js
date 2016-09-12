/**
 * Created by Jacky on 2016/8/9.
 */
//添加用户
$(function () {
    debugger
    var $p_id = $("#yhxx_page");
    $("#RelatedaAccount").show();
    $(document).ready(function(){
        //账号是否重复
        $("#userName").blur(function(){
            //是否空
            //$(this).css("background-color","#ff7575");
            //是否重复
            debugger;
            var userName = $p_id.find("#userName").val();
            //debugger;
            //var le = $p_id.find("#userName").val().length;
            debugger;
            $.ajax({
                type: "get",
                url: '/user/select?userName='+userName,
                dataType: "json",
                data:{},
                success: function (data) {

                    if(data.data.length > 0){
                        var label=document.getElementById("UNLabel");
                        debugger;
                        label.innerHTML="已有账号";
                        $("#UNLabel").css("color","red");
                        //}else if(le == 0){
                        //    var label = document.getElementById("UNLabel");
                        //    debugger;
                        //    label.innerHTML = "输入账号";
                        //    debugger;
                        //    $("#UNLabel").css("color", "red");
                        //    debugger;
                    } else {
                        var label = document.getElementById("UNLabel");
                        label.innerHTML = "账号可用";
                        $("#UNLabel").css("color", "green");
                    }
                    debugger;
                },
                error:function (data) {
                    debugger;
                }
            })

        });

        //$("#userName").blur(function(){
        //    var le = $p_id.find("#userName").val().length;
        //    debugger;
        //    if(le =0){
        //        $p_id.find("#userName").val("请输入账号");
        //    }else{
        //    }
        //    debugger;
    });
    //密码过短
    $("#password").blur(function(){
        var le = $p_id.find("#password").val().length;
        debugger;
        if(le < 6){
            var label=document.getElementById("PWLabel");
            label.innerHTML="密码过短";
            $("#PWLabel").css("color","red");
        }else{
            var label=document.getElementById("PWLabel");
            label.innerHTML="";
        }
        debugger;
    });
    //密码是否一致
    $("#passwordC").blur(function(){
        var pw = $p_id.find("#password").val();
        var pwc = $p_id.find("#passwordC").val();
        debugger;
        if(pw == pwc){
            var label=document.getElementById("PWCLabel");
            label.innerHTML="";
        }else{
            var label=document.getElementById("PWCLabel");
            label.innerHTML="不一致";
            $("#PWCLabel").css("color","red");
        }
        debugger;
    });
    //添加
    $p_id.find("#insert_button").on('click',function(){
        debugger;
        var data ={
            seq_no : $p_id.find("#userName").val(),
            userName : $p_id.find("#userName").val(),
            password : $p_id.find("#password").val(),
            nickName : $p_id.find("#nickName").val(),
            realName : $p_id.find("#realName").val(),
            sex : $p_id.find('input:radio:checked').val(),
            acwsType:1,
            //关联账号
            account2 : $p_id.find("#account2").val(),
            password2 : $p_id.find("#password2").val(),
            account3 : $p_id.find("#account3").val(),
            password3 : $p_id.find("#password3").val(),
            account4 : $p_id.find("#account4").val(),
            password4 : $p_id.find("#password4").val(),
        }
        debugger;
        $.ajax({
            type: "post",
            url: '/user/insert',
            dataType: "json",
            data:data,
            success: function (data) {
                alert("注册成功");
            },
            error:function (data) {

                alert("注册失败");
            }
        })
    });

})