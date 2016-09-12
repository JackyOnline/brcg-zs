/**
 * Created by Administrator on 2016/7/29.
 */
$(function() {
    var $p_id = $("#docList_page");
    $.ajaxSetup({cache:false});
    var notice_num = 0;
    var notice_page = 0;
    var notice_page_show = 1;
    var recordStart = 0;

    $("#mb").hide();
    $("#qrcz").hide();

    function init(recordStart){

        var docms = { // 查询参数
            title: $p_id.find("#title").val()|| "",
            pubDate_s: $p_id.find("#pubDate_s").val()|| "",
            pubDate_e: $p_id.find("#pubDate_e").val()|| "",
            flMenu: $p_id.find("#flMenu").val()|| "",
            slMenu: $p_id.find("#slMenu").val()|| "",
            state: $p_id.find("#state").val()|| "",
            publishJg: $p_id.find("#publishJg").val()|| "",
        };
        debugger;
        if(docms.state == 0){
            docms.state = '';
        }
        if(docms.slMenu == 0){
            docms.slMenu = '';
        }
        if(docms.flMenu == 0){
            docms.flMenu = '';
        }
        $.ajax({
            type: "get",
            url: "/document/list?recordStart="+recordStart,
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
                        if(data.data[i].state ==1){
                            data.data[i].state = '已发布';
                        }if(data.data[i].state ==2){
                            data.data[i].state = '未发布';
                        }
                        $("#notice_tbody").append('<tr> ' +
                            '<td>'+data.data[i].title+'</td> ' +
                            '<td>'+data.data[i].source+'</td> ' +
                            '<td>'+data.data[i].publishJg+'</td> ' +
                            '<td>'+data.data[i].pubDate+'</td> ' +
                            '<td>'+data.data[i].slMenu+'</td> ' +
                            '<td>'+data.data[i].state+'</td> ' +
                                //'<td> <a class="bh" href="/docManager?flMenu='+flMenu+'&seq_no='+data.data[i].seq_no+'">详细</a></td> ' +
                            '<td><select class="sstj1" style="margin:auto;width: 52%;height: 32px;border-radius: 5px;"  data-id="'+data.data[i].seq_no+'">' +
                            '<option value="0">操作</option>' +
                            '<option class="cz_fb" value="1">发布</option>' +
                            '<option class="cz_ch" value="2">撤回</option>' +
                            '<option class="cz_sc" value="3"">删除</option>' +
                            '</select></td> ' +
                            '</tr>');
                    }
                    $(".sstj1").change(function(){

                        seq_no = $(this).attr("data-id");
                        state = $(this).val();
                        if(state){
                            $("#mb").show();
                            $("#qrcz").show();
                            $("#reply").on("click",function(){
                                $.ajax({
                                    type: "get",
                                    url: "/document/release?seq_no="+seq_no+"&state="+state,
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


    $("#return").on("click",function(){
        debugger;
        $("#mb").hide();
        $("#qrcz").hide();
        $p_id.find(".sstj1").val("0");
    })



});