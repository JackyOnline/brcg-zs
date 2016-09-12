/**
 * Created by Administrator on 2016/7/29.
 */
$(function() {
    var $p_id = $("#index_page");
    $.ajaxSetup({cache:false});

    $.ajax({
        type: "get",
        url: "/index/newIn",
        dataType: "json",
        data: {},
        success: function (data) {
            $p_id.find("#in").html(data);
        },
        error: function (data) {
            alert("系统错误");
        }
    });

    $.ajax({
        type: "get",
        url: "/index/newUs",
        dataType: "json",
        data: {},
        success: function (data) {
            $p_id.find("#new_us").html(data);
        },
        error: function (data) {
            alert("系统错误");
        }
    });

    $.ajax({
        type: "get",
        url: "/index/sumUs",
        dataType: "json",
        data: {},
        success: function (data) {
            $p_id.find("#sum_us").html(data);
        },
        error: function (data) {
            alert("系统错误");
        }
    });

    $.ajax({
        type: "get",
        url: "/index/newDo",
        dataType: "json",
        data: {},
        success: function (data) {
            debugger;
            for (var i = 0; i < data.data.length; i++) {
                $("#lb").append('<li> ' +data.data[i].title +
                    '<span class="sj">' + data.data[i].pubDate + '</span> ' +
                    '</li>')
            }
        },
        error: function (data) {
            alert("系统错误");
        }
    });

});