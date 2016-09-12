/**
 * Created by Administrator on 2016/7/29.
 */
$(function() {
    var $p_id = $("#contentList_page");
    $.ajaxSetup({cache:false});
    var notice_num = 0;
    var notice_page = 0;
    var notice_page_show = 1;
    var recordStart = 0;
    var flMenu = $("#flMenu").val();
    var slMenu = $("#slMenu").val();
    debugger;
    var hd = $("#position").val();
    $("#hd").html(hd+'<span>您现在所在的位置：首页 >> '+hd+'</span>');
    init(recordStart);

    //填充表格方法
    function init(recordStart){
        var docms = { // 查询参数
            flMenu: flMenu,
            slMenu: slMenu,
            state: 1,
        };
        $("#contentList_page").show();
        $.ajax({
            type: "get",
            url: "/document/list?recordStart="+recordStart,
            dataType: "json",
            data: docms,
            success: function (data) {
                if(data.totlsize){
                    notice_num= data.totlsize
                    notice_page = Math.ceil(data.totlsize/10);
                    $("#notice_num").html(notice_num);
                    $("#notice_page").html(notice_page);
                    $("#notice_page_show").html(notice_page_show);
                    $("#notice_tbody").empty();
                    for(var i=0;i<data.data.length;i++){
                        $("#notice_tbody").append('<li><a href="/contentInfo?seq_no='+data.data[i].seq_no+'">'+data.data[i].title+'</a><span>'+data.data[i].pubDate+'</span></li>');
                    }
                }else{
                    $("#notice_tbody").empty();
                }
            },
            error: function (data) {
                alert("系统错误");
            }
        });

    }

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
    })


});