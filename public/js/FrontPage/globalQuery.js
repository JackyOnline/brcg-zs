/**
 * Created by Administrator on 2016/7/29.
 */
$(function() {
    var $p_id = $("#globalQuery_page");
    $.ajaxSetup({cache:false});
    var notice_num = 0;
    var notice_page = 0;
    var notice_page_show = 1;
    var recordStart = 0;

    function init(recordStart){
        debugger;
        var docms = { // 查询参数
            title: $p_id.find("#title").val()|| "",
            pubDate_s: $p_id.find("#pubDate_s").val()|| "",
            pubDate_e: $p_id.find("#pubDate_e").val()|| "",
        };
        $.ajax({
            type: "get",
            url: "/document/globalQuery?recordStart="+recordStart,
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
                    $("#notice_tbody").append('<br><br><br><br><div style="margin: 0 auto;width: 100%;text-align: center;">抱歉，没有您要的内容!!</div>');
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

    $("#selectDoc").on("click",function(){
        init(recordStart);
    })



});