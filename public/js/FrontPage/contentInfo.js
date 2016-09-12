/**
 * Created by Administrator on 2016/7/29.
 */
$(function() {
    var $p_id = $("#contentInfo_page");
    $.ajaxSetup({cache:false});

    var seq_no = $p_id.find("#seq_no").val();
    $.ajax({
        type: "get",
        url: "/document/get?seq_no="+seq_no,
        dataType: "json",
        data: {},
        success: function (data) {
            $p_id.find("#title").html(data[0].title);
            $p_id.find("#docInfo").html('作&nbsp;者：'+data[0].publishJg+'&emsp;&emsp;发布机构：'+data[0].source+'&emsp;&emsp;发布日期：'+data[0].pubDate);
            $p_id.find("#content").html(data[0].content);
            var keyWord = data[0].keyWord;
            if(keyWord){
                $.ajax({
                    type: "get",
                    url: "/document/keyw?keyWord="+keyWord+"&seq_no="+seq_no,
                    dataType: "json",
                    data: {},
                    success: function (data) {
                        debugger;
                        if(data.length){
                            debugger;
                            $("#relation").html('');
                            for(var i=0;i<data.length;i++){
                                $("#relation").append('<p style="font-weight:bold"><a style="color:#5A5859;" href="/contentInfo?seq_no='+data[i].seq_no+'">&emsp;■&emsp;&emsp;'+data[i].title+'</a></p><br>');
                            }
                        }else{
                            $("#relation").html('');
                        }
                    },
                    error: function (data) {
                        alert("系统错误");
                    }
                });
            }

        },
        error: function (data) {
            alert("系统错误");
        }
    });



});