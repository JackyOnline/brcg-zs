/**
 * Created by Administrator on 2016/7/29.
 */
$(function() {
    var $p_id = $("#userList_page");
    $.ajaxSetup({cache:false});
    var notice_num = 0;
    var notice_page = 0;
    var notice_page_show = 1;
    var recordStart = 0;


    $p_id.find("#ul").hide();
    $p_id.find("#mb").hide();

    function init(recordStart){
        var userl = { // 查询参数
            userName: $p_id.find("#userName").val()|| "",
            nickName: $p_id.find("#nickName").val()|| "",
            regTime: $p_id.find("#regTime").val()|| "",
            realName: $p_id.find("#realNameS").val()|| "",
            realName: $p_id.find("#realNameE").val()|| "",
            mobile: $p_id.find("#mobile").val()|| "",
            status: $p_id.find("#status").val()|| "",
            acwsType: $p_id.find("#acwsType").val()|| "",
        };
        if(userl.status == 0){
            userl.status = '';
        }
        if(userl.acwsType == 0){
            userl.acwsType = '';
        }
        $.ajax({
            type: "get",
            url: "/userList/list?recordStart="+recordStart,
            dataType: "json",
            data: userl,
            success: function (data) {
                if(data.totlsize){
                    notice_num= data.totlsize
                    notice_page = Math.ceil(data.totlsize/10);
                    $("#notice_num").html(notice_num);
                    $("#notice_page").html(notice_page);
                    $("#notice_page_show").html(notice_page_show);
                    $("#notice_tbody").empty();
                    for(var i=0;i<data.data.length;i++){
                        if(data.data[i].sex == 1){
                            data.data[i].sex = '男';
                        }else if(data.data[i].sex == 2){
                            data.data[i].sex = '女';
                        }else{
                            data.data[i].sex = '';
                        }
                        $("#notice_tbody").append('<tr> ' +
                            '<td>'+data.data[i].userName+'</td> ' +
                            '<td>'+data.data[i].mobile+'</td> ' +
                            '<td>'+data.data[i].nickName+'</td> ' +
                            '<td>'+data.data[i].sex+'</td> ' +
                            '<td>'+data.data[i].realName+'</td> ' +
                            '<td>'+data.data[i].regTime+'</td> ' +
                            '<td>'+data.data[i].status+'</td> ' +
                            '<td>'+data.data[i].acwsType+'</td> ' +
                            '<td> <button class="see" style="background-color: white;height: 32px;width: 50%;border: 1px solid #ccc;border-radius: 5px;" data-id="'+data.data[i].seq_no+'" >详情</button></td> ' +
                            '</tr>')
                    }

                    $(".see").on("click",function(){
                        var seq_no = $(this).attr("data-id");
                        $.ajax({
                            type: "get",
                            url: "/user/selectxq?seq_no="+seq_no,
                            dataType: "json",
                            data: {},
                            success: function (data) {
                                $p_id.find("#ul").show();
                                $p_id.find("#mb").show();
                                if(data.data[0].sex == 1){
                                    data.data[0].sex = '男';
                                }else{
                                    data.data[0].sex = '女';
                                }
                                if(data.data[0].acwsType == 1){
                                    data.data[0].acwsType = '内部帐号';
                                }else{
                                    data.data[0].acwsType = '普通帐号';
                                }
                                if(data.data[0].status == 1){
                                    data.data[0].status = '启用';
                                }else if(data.data[0].status == 2){
                                    data.data[0].status = '已删除';
                                }else if(data.data[0].status == 3){
                                    data.data[0].status = '非正常用户';
                                }
                                debugger;
                                $p_id.find("#xq_userName").val(data.data[0].userName);
                                $p_id.find("#xq_nickName").val(data.data[0].nickName);
                                $p_id.find("#xq_realName").val(data.data[0].realName);
                                $p_id.find("#xq_mobile").val(data.data[0].mobile);
                                $p_id.find("#xq_age").val(data.data[0].age);
                                $p_id.find("#xq_sex").val(data.data[0].sex);
                                $p_id.find("#xq_acwsType").val(data.data[0].acwsType);
                                $p_id.find("#xq_regTime").val(data.data[0].regTime);
                                $p_id.find("#xq_regIp").val(data.data[0].regIp);
                                $p_id.find("#xq_status").val(data.data[0].status);
                            },
                            error: function (data) {
                                alert("系统错误");
                            }
                        });

                    });
                }else{
                    $("#notice_tbody").html("");
                    notice_num= 0
                    notice_page = 1;
                    $("#notice_num").html(notice_num);
                    $("#notice_page").html(notice_page);
                    $("#notice_page_show").html(notice_page_show);
                }
            },
            error: function (data) {
                alert("系统错误");
            }
        });
    }
    debugger;
    init(recordStart);

    $(".notice_action1").on("click",function(){
        notice_page_show = 1;
        recordStart = 0;
        init(recordStart);
    })

    $(".notice_action2").on("click",function(){
        if(notice_page_show>1){
            recordStart = (notice_page_show-2)*10;
            notice_page_show = notice_page_show-1;

            init(recordStart);
        }
    })

    $(".notice_action3").on("click",function(){
        if(notice_page_show<notice_page){

            recordStart = notice_page_show*10;
            notice_page_show = notice_page_show+1;
            init(recordStart);
        }
    })

    $(".notice_action4").on("click",function(){
        notice_page_show = notice_page;
        recordStart = notice_page*10-10;
        init(recordStart);
    })

    $("#selectUser").on("click",function(){
        init(recordStart);
    })


    //详情界面不可编辑
    function disableOcx() {
        var form = $p_id.find("#xq_form")[0];
        for(var i=0;i<form.length;i++){
            var element = form[i];
            element.disabled = "true";
        }
    }
    disableOcx();

    //取消按钮
    $("#return").on("click",function(){
        $p_id.find("#ul").hide();
        $p_id.find("#mb").hide();
    });

    //设为内部帐号
    $("#inside").on("click",function(){
        var userName = $p_id.find("#xq_userName").val();
        $.ajax({
            type: "get",
            url: "/user/change?userName="+userName+"&acwsType=1",
            dataType: "json",
            data: {},
            success: function (data) {
                alert("修改成功");
                window.location.reload();
            },
            error: function (data) {
                alert("系统错误");
            }
        });
    });

    //设为外部帐号
    $("#outside").on("click",function(){
        var userName = $p_id.find("#xq_userName").val();
        $.ajax({
            type: "get",
            url: "/user/change?userName="+userName+"&acwsType=2",
            dataType: "json",
            data: {},
            success: function (data) {
                alert("修改成功");
                window.location.reload();
            },
            error: function (data) {
                alert("系统错误");
                window.location.reload();
            }
        });
    });
});