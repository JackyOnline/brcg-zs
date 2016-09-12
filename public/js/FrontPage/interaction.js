/**
 * Created by Administrator on 2016/7/29.
 */
$(function() {
    var $p_id = $("#interaction_page");
    $.ajaxSetup({cache:false});
    var notice_num = 0;
    var notice_page = 0;
    var notice_page_show = 1;
    var recordStart = 0;
    var slMenu = $p_id.find("#slMenu").val();
    debugger;
    $("#interaction_page_xq").hide();

    //列表查询
    function init(recordStart){

        var inter = { // 查询参数
            title: $p_id.find("#title").val()|| "",
        };
        $.ajax({
            type: "get",
            url: "/inter/list?qianduan=1&recordStart="+recordStart,
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
                            '<td class="" data-id="'+data.data[i].seq_no+'">&nbsp'+data.data[i].title+'</td> ' +
                            '<td data-id="'+data.data[i].seq_no+'">'+data.data[i].launch_time+'</td> ' +
                            '</tr>')
                    }
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

    $("#select").on("click",function(){
        init(recordStart);
    });
    $("#return0").on("click",function(){
        debugger;
        $("#interaction_page").show();
        $("#interaction_page_xq").hide();
    });

    //保存
    $p_id.find("#reply").on('click', function () {
        debugger;
        var data;
        var mydate = new Date();
        if($p_id.find("#subject").val() == ''){
            alert("请输入标题");
        }else if($p_id.find("#content").val() == ''){
            alert("请输入内容");
        }else{
            data = {
                type : $p_id.find('[name="type"]:checked').val(),
                title: $p_id.find("#subject").val(),
                content: $p_id.find("#content").val(),
                open: $p_id.find('[name="is_public"]:checked').val(),
                //questioner: $p_id.find('[name="anonymous"]:checked').val('匿名'),
            };
            if($p_id.find('[name="anonymous"]:checked')){
                data.questioner = '匿名';
            }
            data.state = 1;
            data.handle_state = 1;
            data.launch_time = new Date();
            debugger;
            $.ajax({
                type: "post",
                url: '/inter/inpo',
                dataType: "json",
                data: data,
                success: function (data) {

                    alert("保存成功");
                    window.history.back(-1);
                },
                error: function (data) {

                    alert("保存失败");
                }
            })
        }

    });

    $("#notice_tbody").on("click","td",function(){
        debugger;
        var seq_no = $(this).attr("data-id");
        debugger;
        $.ajax({
            type: "get",
            url: "/inter/get?seq_no="+seq_no,
            dataType: "json",
            data: {},
            success: function (data) {
                debugger;
                $("#interaction_page").hide();
                $("#interaction_page_xq").show();
                $("#xq_title").html('标题：'+data[0].title);
                $("#xq_questioner").html('&nbsp;发问人：'+data[0].questioner);
                $("#xq_launch_time").html('发问时间：'+data[0].launch_time);
                $("#xq_content").html(data[0].content);
                $("#xq_handler").html('&nbsp;处理人：'+data[0].handler);
                $("#xq_processing_time").html('回复时间：'+data[0].processing_time);
                $("#xq_reply").html(data[0].reply);

            },
            error: function (data) {
                alert("系统错误");
            }
        });
    });
});