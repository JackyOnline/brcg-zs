/**
 * Created by Administrator on 2016/7/29.
 */
$(function() {
    debugger;
    var $p_id = $("#zxlyAns_page");
    $.ajaxSetup({cache:false});
    var notice_num = 0;
    var notice_page = 0;
    var notice_page_show = 1;
    var recordStart = 0;
    var flMenu = $p_id.find("#flMenu").val();
    //隐藏对话框
    //$p_id.find("#intMa").hide();
    //列表查询
    debugger;
    function init(recordStart){
        $.ajax({
            type: "get",
            url: "/zxlyAns/list?recordStart="+recordStart,
            dataType: "json",
            data: {},
            success: function (data) {
                debugger;
                if(data.totlsize){
                    notice_num= data.totlsize
                    notice_page = Math.ceil(data.totlsize/10);
                    $("#notice_num").html(notice_num);
                    $("#notice_page").html(notice_page);
                    $("#notice_page_show").html(notice_page_show);
                    $("#notice_tbody").empty();
                    debugger;
                    for(var i=0;i<data.data.length;i++) {
                        if (data.data[i].state == 1) {
                            data.data[i].state = '未回复';
                        }else if(data.data[i].state == 2) {
                            data.data[i].state = '已回复';
                        }
                    }
                    for(var i=0;i<data.data.length;i++){
                            $("#notice_tbody").append('<tr> ' +
                                '<td style="background-color: #f3f1f1;">'+data.data[i].name+'</td> ' +
                                '<td style="background-color: #f3f1f1;">'+data.data[i].contact+'</td> ' +
                                '<td style="background-color: #f3f1f1;">'+data.data[i].consult+'</td> ' +
                                '<td style="background-color: #f3f1f1;">'+data.data[i].consultT+'</td> ' +
                                '<td style="background-color: #f3f1f1;">'+data.data[i].state+'</td> ' +
                                '<td style="background-color: #f3f1f1;"><button class="sstj1" style="margin:auto;width: 42%;height: 30px;border-radius: 5px;background-color: #f3f1f1;"  data-id="'+data.data[i].seq_no+'">已回复' +
                                '</button>/<button class="sstj2" style="margin:auto;width: 42%;height: 30px;border-radius: 5px;background-color: #f3f1f1;"  data-id="'+data.data[i].seq_no+'">删除' +
                                '</button></td> ' +
                                '</tr>')
                    }
                    $(".sstj1").on("click",function(){
                        seq_no = $(this).attr("data-id");
                        sta=1
                        debugger;
                        $.ajax({
                            type: "get",
                            url: "/zxlyAns/get?seq_no="+seq_no+'sta='+sta,
                            dataType: "json",
                            data: {},
                            success: function (data) {
                                debugger;
                                alert("成功");
                                window.location.reload();
                            },
                            error: function (data) {
                                alert("系统错误");
                            }
                        });
                    });
                    $(".sstj2").on("click",function(){
                        seq_no = $(this).attr("data-id");
                        debugger;
                        $.ajax({
                            type: "get",
                            url: "/zxlyAns/get?seq_no="+seq_no,
                            dataType: "json",
                            data: {},
                            success: function (data) {
                                debugger;
                                alert("成功");
                                window.location.reload();
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
});