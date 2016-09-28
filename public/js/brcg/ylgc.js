/**
 * Created by Administrator on 2016/7/29.
 */
$(function() {
    debugger;
    var $p_id = $("#ylgc_page");
    $.ajaxSetup({cache:false});
    var notice_num = 0;
    var notice_page = 0;
    var notice_page_show = 1;
    var recordStart = 0;
    var flMenu = $p_id.find("#flMenu").val();
    var xq_url = {};
    var xq_no;
    var xq_le;


    //隐藏对话框
    //$p_id.find("#intMa").hide();
    //列表查询
    debugger;
    function init(recordStart){
        $.ajax({
            type: "get",
            url: "/ylgc/list?recordStart="+recordStart,
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
                        var ur = data.data[i].img_url.split(";")
                        debugger;
                        $("#notice_tbody").append('<div style="width: 33%;float: left;"> ' +
                            '<img src="'+ur[1]+'" alt="" width="318" height="237" style="text-align: center;cursor:pointer" class="sstj1" data-id="'+data.data[i].seq_no+'"> ' +
                            '<div style="text-align: center;margin:4px 0px 6px 0px;font-size:20px;cursor:pointer" class="sstj1" data-id="'+data.data[i].seq_no+'">'+data.data[i].name+'</div> ' +
                            '</div>')
                    }
                    $(".sstj1").on("click",function(){
                        debugger;
                        $("#intMa").show();
                        seq_no = $(this).attr("data-id");
                        debugger;
                        //查看详情
                        $.ajax({
                            type: "get",
                            url: "/ylgc/get?seq_no="+seq_no,
                            dataType: "json",
                            data: {},
                            success: function (data) {
                                xq_url = data[0].img_url.split(";");
                                xq_no = xq_url.length*100;
                                xq_le = xq_url.length - 1;

                                $("#imgMa").html('<div> ' +
                                    '<img src="'+xq_url[1]+'" style="float: left;height: 480px;width: 650px;margin: 10px 0px 0px 10px;" /> ' +
                                    '</div>')
                                debugger;
                                $p_id.find("#nameLab").html(data[0].name);
                                if(data[0].houseType == 1){
                                    $p_id.find("#houseTypeLab").html('案例所属：市政工程')
                                }else if(data[0].houseType == 2){
                                    $p_id.find("#houseTypeLab").html('案例所属：墙体工程')
                                }else{
                                    $p_id.find("#houseTypeLab").html('案例所属：墙体工程')
                                }
                                $p_id.find("#areaLab").html('详细介绍：'+data[0].area);
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

    $("#left").on("click",function(){
        xq_no--;
        $("#imgMa").html('<div> ' +
            '<img src="'+xq_url[xq_no%xq_le+1]+'" style="float: left;height: 480px;width: 650px;margin: 10px 0px 0px 10px;" /> ' +
            '</div>')
    });
    $("#right").on("click",function(){
        xq_no++;
        $("#imgMa").html('<div> ' +
            '<img src="'+xq_url[xq_no%xq_le+1]+'" style="float: left;height: 480px;width: 650px;margin: 10px 0px 0px 10px;" /> ' +
            '</div>')
    });


});