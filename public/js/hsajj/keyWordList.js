/**
 * Created by Jacky on 2016/8/12.
 */
$(function () {
    var $p_id = $("#keyWordList_page");
    $.ajaxSetup({cache: false});
    var notice_num = 0;
    var notice_page = 0;
    var notice_page_show = 1;
    var recordStart = 0;
    $p_id.find("#kw").hide();
    $("#mb").hide();
    $("#qrcz").hide();

    $p_id.find("#newKey").on('click',function(){
        $p_id.find("#kw").show();
        $p_id.find("#reply").on('click',function(){
            debugger;
            if($p_id.find("#nkw").val()==''){
                alert("请输入关键词");
            }else {
                debugger;
                var data = {
                    key_word: $p_id.find("#nkw").val()
                };
                $.ajax({
                    type: "post",
                    url: '/keyWord/insert',
                    dataType: "json",
                    data: data,
                    success: function (data) {
                        debugger;
                        if(data.data == '已存在'){
                            alert("该关键字已存在");
                        }else{
                            alert("添加成功");
                            window.location.reload();
                        }
                    },
                    error: function (data) {
                        alert("系统错误");
                    }
                })
            }
        });
        $p_id.find("#return").on('click',function(){
            $p_id.find("#kw").hide();
        });
    });

    function init(recordStart) {
        var key = { // 查询参数
            key_wordList: $p_id.find("#key_wordList").val() || "",
        };
        $.ajax({
            type: "get",
            url: "/keyWord/list?recordStart=" + recordStart,
            dataType: "json",
            data: key,
            success: function (data) {
                if (data.totlsize) {
                    notice_num = data.totlsize
                    notice_page = Math.ceil(data.totlsize / 10);
                    $("#notice_num").html(notice_num);
                    $("#notice_page").html(notice_page);
                    $("#notice_page_show").html(notice_page_show);
                    $("#notice_tbody").empty();
                    for (var i = 0; i < data.data.length; i++) {
                        $("#notice_tbody").append('<tr> ' +
                            '<td>' + data.data[i].key_word + '</td> ' +
                            '<td> <button class="sstj1" style="background-color: white;height: 32px;width: 50%;border: 1px solid #ccc;border-radius: 5px;" data-id="'+data.data[i].seq_no+'" >删除</button></td> ' +
                            '</tr>')
                    }
                    $(".sstj1").on('click',function(){
                        debugger;
                        seq_no = $(this).attr("data-id");
                        if(seq_no){
                            $("#mb").show();
                            $("#qrcz").show();
                            debugger;
                            $("#yes").on("click",function(){
                                $.ajax({
                                    type: "get",
                                    url: "/keyWord/del?seq_no="+seq_no,
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
                } else {
                    $("#notice_tbody").html("");
                    notice_num = 0
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

    $(".notice_action1").on("click", function () {
        notice_page_show = 1;
        recordStart = 0;
        init(recordStart);
    })

    $(".notice_action2").on("click", function () {
        if (notice_page_show > 1) {
            recordStart = (notice_page_show - 2) * 10;
            notice_page_show = notice_page_show - 1;

            init(recordStart);
        }
    })

    $(".notice_action3").on("click", function () {
        if (notice_page_show < notice_page) {

            recordStart = notice_page_show * 10;
            notice_page_show = notice_page_show + 1;
            init(recordStart);
        }
    })

    $(".notice_action4").on("click", function () {
        notice_page_show = notice_page;
        recordStart = notice_page * 10 - 10;
        init(recordStart);
    })

    $("#selectKW").on("click", function () {
        init(recordStart);
    })

    $("#no").on("click",function(){
        $("#mb").hide();
        $("#qrcz").hide();
    })
});