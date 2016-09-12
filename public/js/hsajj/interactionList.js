/**
 * Created by Administrator on 2016/7/29.
 */
$(function() {
    var $p_id = $("#interactionList_page");
    $.ajaxSetup({cache:false});
    var notice_num = 0;
    var notice_page = 0;
    var notice_page_show = 1;
    var recordStart = 0;
    var flMenu = $p_id.find("#flMenu").val();

    //隐藏对话框
    $p_id.find("#intMa").hide();
    $p_id.find("#qrcz").hide();
    $p_id.find("#mb").hide();

    //列表查询
    function init(recordStart){

        var inter = { // 查询参数
            title: $p_id.find("#title").val()|| "",
            questioner: $p_id.find("#questioner").val()|| "",
            launch_timeS: $p_id.find("#launch_timeS").val()|| "",
            launch_timeE: $p_id.find("#launch_timeE").val()|| "",
            handle_state: $p_id.find("#handle_state").val()|| "",
            handler: $p_id.find("#handler").val()|| "",
            processing_timeS: $p_id.find("#processing_timeS").val()|| "",
            processing_timeE: $p_id.find("#processing_timeE").val()|| "",
            type: $p_id.find("#type").val()|| "",
        };
        if(inter.handle_state == 0){
            inter.handle_state = '';
        }
        if(inter.type == 0){
            inter.type = '';
        }
        $.ajax({
            type: "get",
            url: "/inter/list?recordStart="+recordStart,
            dataType: "json",
            data: inter,
            success: function (data) {
                if(data.totlsize){
                    notice_num= data.totlsize
                    notice_page = Math.ceil(data.totlsize/10);
                    $("#notice_num").html(notice_num);
                    $("#notice_page").html(notice_page);
                    $("#notice_page_show").html(notice_page_show);
                    $("#notice_tbody").empty();
                    for(var i=0;i<data.data.length;i++){
                        $("#notice_tbody").append('<tr> ' +
                            '<td>'+data.data[i].title+'</td> ' +
                            '<td>'+data.data[i].questioner+'</td> ' +
                            '<td>'+data.data[i].type+'</td> ' +
                            '<td>'+data.data[i].open+'</td> ' +
                            '<td>'+data.data[i].launch_time+'</td> ' +
                            '<td>'+data.data[i].handle_state+'</td> ' +
                            '<td>'+data.data[i].handler+'</td> ' +
                            '<td>'+data.data[i].processing_time+'</td> ' +
                            '<td><select class="sstj1" style="margin:auto;width: 52%;height: 32px;border-radius: 5px;"  data-id="'+data.data[i].seq_no+'">' +
                            '<option>操作</option>' +
                            '<option class="cz_fb" value="1">回复</option>' +
                            '<option class="cz_sc" value="2"">删除</option>' +
                            '</select></td> ' +
                            '</tr>')
                    }

                    $(".sstj1").change(function(){

                        seq_no = $(this).attr("data-id");
                        state = $(this).val();
                        if(state==1){
                            $p_id.find("#intMa").show();
                            $p_id.find("#mb").show();
                                debugger;
                                $.ajax({
                                    type: "get",
                                    url: "/inter/get?seq_no=" + seq_no,
                                    dataType: "json",
                                    data: {},
                                    success: function (data) {
                                        $p_id.find("#xq_title").html(data[0].title);
                                        $p_id.find("#xq_questioner").html('发问人：' + data[0].questioner);
                                        $p_id.find("#xq_launch_time").html('发问时间：' + data[0].launch_time);
                                        $p_id.find("#xq_content").html(data[0].content);
                                    },
                                    error: function (data) {
                                        alert("系统错误");
                                    }
                                });
                        }
                        else if(state==2){
                            $("#mb").show();
                            $("#qrcz").show();
                            debugger;
                            $("#yes").on("click",function(){
                                    debugger;
                                    $.ajax({
                                        type: "get",
                                        url: "/inter/release?seq_no="+seq_no+"&state="+state,
                                        dataType: "json",
                                        data: {},
                                        success: function (data) {
                                            window.location.reload();
                                        },
                                        error: function (data) {
                                            alert("系统错误");
                                        }
                                    });

                            });
                        }

                    });
                    //回复
                    $("#reply").on("click",function(){
                        var data;
                        data= {
                            xq_reply:$p_id.find("#xq_reply").val(),
                            operator:$('#operator').val(),
                        };
                        debugger;
                        $.ajax({
                            type: "get",
                            url: "/inter/reply?seq_no="+seq_no,
                            dataType: "json",
                            data: data,
                            success: function (data) {
                                debugger
                                window.location.reload();
                                alert("回复成功");
                            },
                            error: function (data) {
                                debugger
                                alert("回复失败");
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
    init(recordStart);

    $(".notice_action1").on("click",function(){
        notice_page_show = 1;
        recordStart = 0;
        init(recordStart);
    });

    $(".notice_action2").on("click",function(){
        if(notice_page_show>1){
            recordStart = (notice_page_show-2)*10;
            notice_page_show = notice_page_show-1;

            init(recordStart);
        }
    });

    $(".notice_action3").on("click",function(){
        if(notice_page_show<notice_page){

            recordStart = notice_page_show*10;
            notice_page_show = notice_page_show+1;
            init(recordStart);
        }
    });

    $(".notice_action4").on("click",function(){
        notice_page_show = notice_page;
        recordStart = notice_page*10-10;
        init(recordStart);
    });

    $("#selectBt").on("click",function(){
        init(recordStart);
    });

    $("#return").on("click",function(){
        $p_id.find("#intMa").hide();
        $p_id.find("#mb").hide();
        $p_id.find(".sstj1").val("0");
    });

    $("#no").on("click",function(){
        $p_id.find("#qrcz").hide();
        $p_id.find("#mb").hide();
        $p_id.find(".sstj1").val("0");
    });
});