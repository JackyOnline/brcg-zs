/**
 * Created by Jacky on 2016/9/18.
 */
$(function () {
    var $p_id = $("#zxly_page");

    $p_id.find("#save").on('click',function(){
        debugger;
        if($p_id.find("#name_text").val()=='') {
            alert("请问如何称呼您？");
        }else if($p_id.find("#contact_text").val()==''){
            alert("请输入您的联系方式！");
        }else if($p_id.find("#consult_text").val()==''){
            alert("请输入您的咨询内容！");
        }else {
            debugger;
            var data = {
                name: $p_id.find("#name_text").val(),
                contact: $p_id.find("#contact_text").val(),
                consult: $p_id.find("#consult_text").val(),
            };
            $.ajax({
                type: "post",
                url: '/zxly/insert',
                dataType: "json",
                data: data,
                success: function (data) {
                    debugger;
                        alert("咨询成功，请耐心等待工作人员回复您！");
                        window.history.back();
                },
                error: function (data) {
                    alert("系统错误");
                }
            })
        }
    });
});