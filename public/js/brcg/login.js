/**
 * Created by Administrator on 2016/7/29.
 */
$(function() {
    var $p_id = $("#login_page");
    $p_id.find('#dl').on("click",function(){
        debugger;
        var data = {
            name: $p_id.find("#cname").val(),
            password: $p_id.find("#cemail").val(),
        };
        $.ajax({
            type: "post",
            url: '/gsalPo/select',
            dataType: "json",
            data: data,
            success: function (data) {
                debugger;
                if(data.data == '1'){
                    window.location.href="/zxlyAns";
                }else{
                    alert("用户名或密码错误！");
                    window.location.reload();
                }
            },
            error: function (data) {
                alert("系统错误");
            }
        })
    })
});