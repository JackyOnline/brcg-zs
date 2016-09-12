/**
 * Created by Administrator on 2016/7/29.
 */
$(function() {
    var $p_id = $("#investigateArray_page");
    $.ajaxSetup({cache:false});
    var notice_num = 0;
    var notice_page = 0;
    var notice_page_show = 1;
    var recordStart = 0;

    function init(recordStart){

        var docms = { // 查询参数
            title: $p_id.find("#title").val()|| "",
            beginTime: $p_id.find("#beginTime").val()|| "",
            endTime: $p_id.find("#endTime").val()|| ""
        };
        debugger;
        $.ajax({
            type: "get",
            url: "/inv/list?recordStart="+recordStart,
            dataType: "json",
            data: docms,
            success: function (data) {
                debugger;
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
                            '<td>'+data.data[i].beginTime+'</td> ' +
                            '<td>'+data.data[i].endTime+'</td> ' +
                                //'<td> <a class="bh" href="/docManager?flMenu='+flMenu+'&seq_no='+data.data[i].seq_no+'">详细</a></td> ' +
                            '<td><select class="sstj1" style="margin:auto;width: 52%;height: 32px;border-radius: 5px;"  data-id="'+data.data[i].seq_no+'">' +
                            '<option value="0">操作</option>' +
                            '<option class="cz_fb" value="1">详情</option>' +
                            '<option class="cz_sc" value="2"">删除</option>' +
                            '</select></td> ' +
                            '</tr>');
                    }
                    $(".sstj1").change(function(){

                        seq_no = $(this).attr("data-id");
                        state = $(this).val();
                        if(state == 1){
                            $.ajax({
                                type: "get",
                                url: "/inv/select?seq_no="+seq_no,
                                dataType: "json",
                                data: {},
                                success: function (data) {
                                    debugger;
                                    $("#mb").show();
                                    $("#intQue").show();
                                    $("#sure").hide();
                                    $("#xq_title").val(data[0].title);
                                    $("#xq_beginTime").val(data[0].beginTime);
                                    $("#xq_endTime").val(data[0].endTime);
                                    $("#optionA").val(data[0].optionA);
                                    $("#optionB").val(data[0].optionB);
                                    $("#optionC").val(data[0].optionC);
                                    $("#optionD").val(data[0].optionD);
                                    $("#Aquantity").html('&nbsp共'+data[0].Aquantity+'票');
                                    $("#Bquantity").html('&nbsp共'+data[0].Bquantity+'票');
                                    $("#Cquantity").html('&nbsp共'+data[0].Cquantity+'票');
                                    $("#Dquantity").html('&nbsp共'+data[0].Dquantity+'票');
                                },
                                error: function (data) {
                                    alert("系统错误");
                                }
                            });
                        } else if(state == 2){
                            $("#mb").show();
                            $("#qrcz").show();
                            $("#reply").on("click",function(){
                                debugger;
                                $.ajax({
                                    type: "get",
                                    url: "/inv/delete?seq_no="+seq_no,
                                    dataType: "json",
                                    data: {},
                                    success: function (data) {
                                        debugger;
                                        window.location.reload();
                                    },
                                    error: function (data) {
                                        alert("系统错误");
                                    }
                                });
                            });
                        }
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

    $("#selectInv").on("click",function(){
        init(recordStart);
    });

    $("#newInv").on("click",function(){
        $("#mb").show();
        $p_id.find("#intQue").show();
        $("#sure").show();
        $("#xq_title").val("");
        $("#xq_beginTime").val("");
        $("#xq_endTime").val("");
        $("#optionA").val("");
        $("#optionB").val("");
        $("#optionC").val("");
        $("#optionD").val("");
        $("#Aquantity").val("");
        $("#Bquantity").val("");
        $("#Cquantity").val("");
        $("#Dquantity").val("");
    });

    $("#sure").on("click",function(){
        if($("#xq_title").val()==''||$("#xq_beginTime").val()==''||$("#xq_endTime").val()==''||$("#optionA").val()==''||$("#optionB").val()==''||$("#optionC").val()==''||$("#optionD").val()==''){
            alert("请输入完整");
        }else{
            var inver = {
                title: $("#xq_title").val(),
                beginTime: $("#xq_beginTime").val(),
                endTime: $("#xq_endTime").val(),
                optionA: $("#optionA").val(),
                optionB: $("#optionB").val(),
                optionC: $("#optionC").val(),
                optionD: $("#optionD").val()
            };
            $.ajax({
                type: "post",
                url: "/inv/newInv",
                dataType: "json",
                data: inver,
                success: function (data) {
                    window.location.reload();
                },
                error: function (data) {
                    alert("系统错误");
                }
            });
        }


    });

    $("#close").on("click",function(){
        $("#mb").hide();
        $p_id.find("#intQue").hide();
        $p_id.find(".sstj1").val("0");
    });

    $("#return").on("click",function(){
        $("#mb").hide();
        $("#qrcz").hide();
        $p_id.find(".sstj1").val("0");
    })



});