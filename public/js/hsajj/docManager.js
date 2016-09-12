/**
 * Created by Administrator on 2016/7/29.
 */
$(function() {
    var $p_id = $("#docManager_page");
    $.ajaxSetup({cache:false});

    var flMenu = $p_id.find("#pubDate_s").val();
    var seq_no = $p_id.find("#seq_no").val();

    $.ajax({
        type: "get",
        url: '/keyWord/select',
        dataType: "json",
        data: {},
        success: function (data) {
            $("#keyword").empty();
            $("#keyword").append('<option value="0">请选择</option> ');
            for (var i = 0; i < data.length; i++) {
                $("#keyword").append('<option class="word" value="'+data[i].seq_no+'">'+ data[i].key_word + '</option> ')
            }
        },
        error: function (data) {
        }
    })

    //数据自动填充
    if(seq_no!=0){
        $.ajax({
            type: "get",
            url: "/document/get?seq_no="+seq_no,
            dataType: "json",
            data: {},
            success: function (data) {

                $p_id.find("#publishJg").val(data[0].publishJg);
                $p_id.find("#title").val(data[0].title);
                $p_id.find("#slMenu").val(data[0].slMenu);

                $p_id.find("#publishJg").val(data[0].publishJg);;
                if(data[0].pubDate){
                    $p_id.find("#pubDate").append('<p> ' +'发布日期:'+data[0].pubDate+'</p> ' );
                }else{
                    $p_id.find("#pubDate").append('<p> ' +'暂未发布'+'</p> ' );
                }
                if(data[0].keyWord){
                    debugger;
                    //$p_id.find("#keyword").find("[value='"+data[0].keyWord+"']").arrt('selected','selected');
                    $p_id.find("#keyword").find("[value='"+data[0].keyWord+"']").attr('selected','selected');
                }
                $p_id.find("#customized-buttonpane").append(data[0].content);
            },

            error: function (data) {
                alert("系统错误");
            }
        });
    }


    //保存
    $p_id.find("#save").on('click', function () {

        var data;
        var mydate = new Date();
        if(seq_no == 0){
            data = {
                setDate: mydate,//创建时间
                opDate:mydate,//操作时间
                state:2,//未发布
                flMenu:$p_id.find("#flMenu").val(),
                title: $p_id.find("#title").val(),
                publishJg: $p_id.find("#publishJg").val(),
                slMenu: $p_id.find("#slMenu").val(),
                keyWord: $p_id.find("#keyword").val(),
                content: $p_id.find("#customized-buttonpane").html(),
            }
        }else{
            data = {
                seq_no:seq_no,
                opDate:mydate,//操作时间
                flMenu:$p_id.find("#flMenu").val(),
                title: $p_id.find("#title").val(),
                publishJg: $p_id.find("#publishJg").val(),
                slMenu: $p_id.find("#slMenu").val(),
                keyWord: $p_id.find("#keyword").val(),
                content: $p_id.find("#customized-buttonpane").html(),
            }
        }
        $.ajax({
            type: "post",
            url: '/document/inpo',
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
    });

    //发布
    $p_id.find("#savePo").on('click', function () {
        var data;
        var mydate = new Date();
        if(seq_no == 0){
            data = {
                setDate: mydate,//创建时间
                opDate:mydate,//操作时间
                pubDate:mydate,//发布时间
                state:1,//已发布
                flMenu:$p_id.find("#flMenu").val(),
                title: $p_id.find("#title").val(),
                publishJg: $p_id.find("#publishJg").val(),
                slMenu: $p_id.find("#slMenu").val(),
                keyWord: $p_id.find("#keyword").val(),
                content: $p_id.find("#customized-buttonpane").html(),
            }
        }else{
            data = {
                seq_no:seq_no,
                opDate:mydate,//操作时间
                pubDate:mydate,//发布时间
                state:1,//已发布
                flMenu:$p_id.find("#flMenu").val(),
                title: $p_id.find("#title").val(),
                publishJg: $p_id.find("#publishJg").val(),
                slMenu: $p_id.find("#slMenu").val(),
                keyWord: $p_id.find("#keyword").val(),
                content: $p_id.find("#customized-buttonpane").html(),
            }
        }
        $.ajax({
            type: "post",
            url: '/document/inpo',
            dataType: "json",
            data: data,
            success: function (data) {
                alert("保存并发布成功");
                window.history.back(-1);
            },
            error: function (data) {
                alert("保存并发布失败");
            }
        })
    });

});