/**
 * Created by Administrator on 2016/7/29.
 */
$(function() {
    var $p_id = $("#investigateList_page");
    $.ajaxSetup({cache:false});
    var notice_num = 0;
    var notice_page = 0;
    var notice_page_show = 1;
    var recordStart = 0;
    var seq_no;
    var myIP = returnCitySN.cip;

    init(recordStart);
    $("#investigateList_page_xq").hide();
    $("#finally").hide();

    //填充表格方法
    function init(recordStart){
        $.ajax({
            type: "get",
            url: "/inv/list?recordStart="+recordStart,
            dataType: "json",
            data:{},
            success: function (data) {
                if(data.totlsize){
                    notice_num= data.totlsize
                    notice_page = Math.ceil(data.totlsize/10);
                    $("#notice_num").html(notice_num);
                    $("#notice_page").html(notice_page);
                    $("#notice_page_show").html(notice_page_show);
                    $("#notice_tbody").empty();
                    for(var i=0;i<data.data.length;i++){
                        $("#notice_tbody").append('<li data-id="'+data.data[i].seq_no+'"><a>'+data.data[i].title+'</a><span></span></li>');
                    }
                }else{
                    $("#notice_tbody").empty();
                }
                $("#notice_tbody li").on('click',function(){
                    var ans = $("[name='Fruit']").val();
                    seq_no = $(this).attr("data-id");
                    //获取问券数据
                    $.ajax({
                        type: "get",
                        url: "/inv/select?seq_no="+seq_no,
                        dataType: "json",
                        data:{},
                        success: function (data) {
                            var boo = true;
                            //对比IP是否参与过
                            for(var i = 1; i<data[0].IPList.length ;i++){
                                if(data[0].IPList[i] == myIP){
                                    boo = false;
                                    break;
                                }
                            }
                            debugger;
                            if(data[0].myDate<data[0].beginTime || data[0].myDate>data[0].endTime){
                                boo = false;
                            }
                            $("#investigateList_page").hide();
                            $("#investigateList_page_xq").show();
                            if(boo){
                                $("#xq_title").html('标题：'+data[0].title);
                                $("#xq_time").html('投票时间：'+data[0].beginTime+'&nbsp;-&nbsp;'+data[0].endTime);
                                $("#optionA").html('选项A：'+data[0].optionA);
                                $("#optionB").html('选项B：'+data[0].optionB);
                                $("#optionC").html('选项C：'+data[0].optionC);
                                $("#optionD").html('选项D：'+data[0].optionD);

                            }else{
                                fina();
                            }
                        },
                        error: function (data) {
                            alert("系统错误");
                        }
                    });
                });
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
    });

    //提交投票信息
    $("#reply0").on('click',function(){
        var ans = $("[name='Fruit']:checked").val();
        if(ans){
            $.ajax({
                type: "get",
                url: "/inv/poll?seq_no="+seq_no+"&ans="+ans+"&IP="+myIP,
                dataType: "json",
                data:{},
                success: function (data) {
                    fina();
                },
                error: function (data) {
                    alert("系统错误");
                }
            });
        }else{
            alert('请投票');
        }
    });

    $("#return0").on('click',function(){
        $("#investigateList_page").show();
        $("#investigateList_page_xq").hide();
        $("#finally").hide();
    });

    $("#finally_reply").on('click',function(){
        $("#investigateList_page").show();
        $("#investigateList_page_xq").hide();
        $("#finally").hide();
    });
    //获取问券结果
    function fina(){
        $("#investigateList_page").hide();
        $("#investigateList_page_xq").hide();
        $("#finally").show();
        //获取问券数据
        $.ajax({
            type: "get",
            url: "/inv/select?seq_no="+seq_no,
            dataType: "json",
            data:{},
            success: function (data) {
                $("#finally_title").html('标题：'+data[0].title);
                var sum = data[0].Aquantity+data[0].Bquantity+data[0].Cquantity+data[0].Dquantity;
                var a = data[0].Aquantity/sum*100+4;
                var b = data[0].Bquantity*100/sum+4;
                var c = data[0].Cquantity*100/sum+4;
                var d = data[0].Dquantity*100/sum+4;
                $("#finally_con").html(
                    '<label style="float: right;">投票时间：'+data[0].beginTime+'&nbsp;-&nbsp;'+data[0].endTime+'</label><br><br><br>'+
                    '<table border="0" width="100%"><tr><td>'+
                    '<lable>A:'+data[0].optionA+'&nbsp;</lable></td><td width="100%"><input type="text" value=" '+data[0].Aquantity+'" style="background-color: #59AE4B;color:#FFF; width: '+a+'%;border:0px;" readonly="readonly"/></td></tr>'+
                    '<tr><td>'+
                    '<lable>B:'+data[0].optionB+'&nbsp;</lable></td><td width="100%"><input type="text" value=" '+data[0].Bquantity+'" style="background-color: #3FC4F2;color:#FFF;  width: '+b+'%;border:0px;" readonly="readonly"/></td></tr>'+
                    '<tr><td>'+
                    '<lable>C:'+data[0].optionC+'&nbsp;</lable></td><td width="100%"><input type="text" value=" '+data[0].Cquantity+'" style="background-color: #2D3688;color:#FFF;  width: '+c+'%;border:0px;" readonly="readonly"/></td></tr>'+
                    '<tr><td>'+
                    '<lable>D:'+data[0].optionD+'&nbsp;</lable></td><td width="100%"><input type="text" value=" '+data[0].Dquantity+'" style="background-color: #F27921;color:#FFF;  width: '+d+'%;border:0px;" readonly="readonly"/></td></tr>'
                );


            },
            error: function (data) {
                alert("系统错误");
            }
        });
    }
});