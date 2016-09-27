/**
 * Created by Administrator on 2016/7/29.
 */
$(function() {
    debugger;
    var $p_id = $("#gsal_page");
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
            url: "/gsal/list?recordStart="+recordStart,
            dataType: "json",
            data: {},
            success: function (data) {
                debugger;
                if(data.totlsize){
                    notice_num= data.totlsize
                    notice_page = Math.ceil(data.totlsize/9);
                    $("#notice_num").html(notice_num);
                    $("#notice_page").html(notice_page);
                    $("#notice_page_show").html(notice_page_show);
                    $("#notice_tbody").empty();
                    debugger;
                    for(var i=0;i<data.data.length;i++){
                        $("#notice_tbody").append('<div style="width: 33%;float: left;"> ' +
                            '<img src="'+data.data[i].img_url+'" alt="" width="318" height="237" style="text-align: center;cursor:pointer" class="sstj1" data-id="'+data.data[i].seq_no+'"> ' +
                            '<div style="text-align: center;margin:4px 0px 6px 0px;font-size:20px;cursor:pointer" class="sstj1" data-id="'+data.data[i].seq_no+'">'+data.data[i].name+'</div> ' +
                            '</div>')
                    }
                    $(".sstj1").on("click",function(){
                        $("#intMa").show();
                        seq_no = $(this).attr("data-id");
                        debugger;
                        $.ajax({
                            type: "get",
                            url: "/gsal/get?seq_no="+seq_no,
                            dataType: "json",
                            data: {},
                            success: function (data) {
                                debugger;
                                $p_id.find("#nameLab").html(data[0].name);
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
            recordStart = (notice_page_show-2)*9;
            notice_page_show = notice_page_show-1;

            init(recordStart);
        }
    });

    $(".notice_action3").on("click",function(){
        if(notice_page_show<notice_page){

            recordStart = notice_page_show*9;
            notice_page_show = notice_page_show+1;
            init(recordStart);
        }
    });

    $(".notice_action4").on("click",function(){
        notice_page_show = notice_page;
        recordStart = notice_page*9-9;
        init(recordStart);
    });

    $("#selectBt").on("click",function(){
        init(recordStart);
    });
    $("#shurt").on("click",function(){
        $("#intMa").hide();
    });
});