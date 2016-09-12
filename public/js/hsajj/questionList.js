/**
 * Created by Administrator on 2016/7/29.
 */
$(function() {
    var $p_id = $("#questionList_page");
    $.ajaxSetup({cache:false});
    var notice_num = 0;
    var notice_page = 0;
    var notice_page_show = 1;
    var recordStart = 0;

    $("#mb").hide();
    $("#qrcz").hide();
    $("#intQue").hide();
    function init(recordStart){

        var docms = { // 查询参数
            question: $p_id.find("#question").val()|| "",
            score: $p_id.find("#score").val()|| "",
            state: $p_id.find("#state").val()|| "",
        };
        if(docms.state == 0){
            docms.state = '';
        }
        $.ajax({
            type: "get",
            url: "/question/list?recordStart="+recordStart,
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
                        if(data.data[i].state ==1){
                            data.data[i].state = '已发布';
                        }if(data.data[i].state ==2){
                            data.data[i].state = '未发布';
                        }
                        $("#notice_tbody").append('<tr> ' +
                            '<td>'+data.data[i].question+'</td> ' +
                            '<td>'+data.data[i].score+'</td> ' +
                            '<td>'+data.data[i].state+'</td> ' +
                                //'<td> <a class="bh" href="/docManager?flMenu='+flMenu+'&seq_no='+data.data[i].seq_no+'">详细</a></td> ' +
                            '<td><select class="sstj1" style="margin:auto;width: 70%;height: 32px;border-radius: 5px;"  data-id="'+data.data[i].seq_no+'">' +
                            '<option value="0">操作</option>' +
                            '<option class="cz_fb" value="1">发布</option>' +
                            '<option class="cz_ch" value="2">撤回</option>' +
                            '</select></td> ' +
                            '</tr>')
                    }
                    $(".sstj1").change(function(){

                        seq_no = $(this).attr("data-id");
                        state = $(this).val();
                        if(state){
                            $("#mb").show();
                            $("#qrcz").show();
                            $("#yes").on("click",function(){
                                $.ajax({
                                    type: "get",
                                    url: "/question/release?seq_no="+seq_no+"&state="+state,
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

    $("#selectQue").on("click",function(){
        init(recordStart);
    })


    $("#no").on("click",function(){
        debugger;
        $("#mb").hide();
        $("#qrcz").hide();
        $p_id.find(".sstj1").val("0");
    })

    $p_id.find("#newQue").on('click',function(){
        $("#mb").show();
        $p_id.find("#intQue").show();
        $p_id.find("#reply").on('click',function(){
            if($p_id.find("#in_que").val()=='') {
                alert("请输入题目");
            }else if($p_id.find("#in_sco").val()=="0"){
                alert("请选择分值");
            }else {

                obj = document.getElementsByName("ans");
                check_val = [];
                for(k in obj) {
                    if (obj[k].checked)
                        check_val.push(obj[k].value);
                }
                var answer = '';
                for(var i=0;i<check_val.length;i++){
                    answer += check_val[i]+",";
                }
                var data = {
                    question: $p_id.find("#in_que").val(),
                    score: $p_id.find("#in_sco").val(),
                    answer:answer,
                    state:1,
                };
                debugger;
                $.ajax({
                    type: "post",
                    url: '/question/insert',
                    dataType: "json",
                    data: data,
                    success: function (data) {
                            alert("添加成功");
                            window.location.reload();
                    },
                    error: function (data) {
                        alert("添加失败");
                    }
                })
            }
        });
        $p_id.find("#return").on('click',function(){
            $p_id.find("#intQue").hide();
            $("#mb").hide();
        });
    });



});