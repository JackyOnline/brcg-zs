/**
 * Created by Administrator on 2016/7/29.
 */
$(function() {
    var $p_id = $("#adminList_page");
    $.ajaxSetup({cache:false});
    var notice_num = 0;
    var notice_page = 0;
    var notice_page_show = 1;
    var recordStart = 0;
    var flMenu = $p_id.find("#flMenu").val();
    var seq_no;

    $("#mb").hide();
    $("#mas").hide();

    function init(recordStart){
        var act = { // 查询参数
            accounts: $p_id.find("#accounts").val()|| ""
        };
        $.ajax({
            type: "get",
            url: "/admin/list?recordStart="+recordStart,
            dataType: "json",
            data: act,
            success: function (data) {

                if(data.totlsize){
                    notice_num= data.totlsize
                    notice_page = Math.ceil(data.totlsize/10);
                    $("#notice_num").html(notice_num);
                    $("#notice_page").html(notice_page);
                    $("#notice_page_show").html(notice_page_show);
                    $("#notice_tbody").empty();
                    for(var i=0;i<data.data.length;i++){
                        if(data.data[i].article == 1){
                            data.data[i].article = '√';
                        }else{
                            data.data[i].article = '×';
                        }
                        if(data.data[i].interaction == 1){
                            data.data[i].interaction = '√';
                        }else{
                            data.data[i].interaction = '×';
                        }
                        if(data.data[i].admin == 1){
                            data.data[i].admin = '√';
                        }else{
                            data.data[i].admin = '×';
                        }
                        if(data.data[i].key_menu == 1){
                            data.data[i].key_menu = '√';
                        }else{
                            data.data[i].key_menu = '×';
                        }
                        if(data.data[i].menu == 1){
                            data.data[i].menu = '√';
                        }else{
                            data.data[i].menu = '×';
                        }

                        $("#notice_tbody").append('<tr> ' +
                            '<td>'+data.data[i].accounts+'</td> ' +
                            '<td>'+data.data[i].nickname+'</td> ' +
                            '<td>'+data.data[i].article+'</td> ' +
                            '<td>'+data.data[i].interaction+'</td> ' +
                            '<td>'+data.data[i].admin+'</td> ' +
                            '<td>'+data.data[i].key_menu+'</td> ' +
                            '<td>'+data.data[i].menu+'</td> ' +
                            '<td> <button class="see" style="background-color: white;height: 32px;width: 50%;border: 1px solid #ccc;border-radius: 5px;" data-id="'+data.data[i].seq_no+'" >详情</button></td> ' +
                            '</tr>')
                    }
                    $(".see").on("click",function(){
                        $p_id.find("#xxfb").prop('checked',false);
                        $p_id.find("#hdjl").prop('checked',false);
                        $p_id.find("#glybk").prop('checked',false);
                        $p_id.find("#gjzgl").prop('checked',false);
                        $p_id.find("#cdgl").prop('checked',false);
                        seq_no = $(this).attr("data-id");
                        debugger;
                        $.ajax({
                            type: "get",
                            url: "/admin/get?seq_no="+seq_no,
                            dataType: "json",
                            data: {},
                            success: function (data) {
                                debugger;
                                $p_id.find("#mas").show();
                                $p_id.find("#mb").show();
                                $p_id.find("#xq_nickname").val(data[0].nickname);
                                $p_id.find("#xq_accounts").val(data[0].accounts);
                                $p_id.find("#xq_password").val(data[0].password);
                                if(data[0].article && data[0].article == 1){
                                    $p_id.find("#xxfb").prop('checked',true);
                                }
                                if(data[0].interaction && data[0].interaction == 1){
                                    $p_id.find("#hdjl").prop('checked',true);
                                }
                                if(data[0].admin && data[0].admin == 1){
                                    $p_id.find("#glybk").prop('checked',true);
                                }
                                if(data[0].key_menu && data[0].key_menu == 1){
                                    $p_id.find("#gjzgl").prop('checked',true);
                                }
                                if(data[0].menu && data[0].menu == 1){
                                    $p_id.find("#cdgl").prop('checked',true);
                                }
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

    $("#select").on("click",function(){
        init(recordStart);
    })

    $("#return").on("click",function(){
        $p_id.find("#mas").hide();
        $p_id.find("#mb").hide();
    });

    $('#reply').on("click",function(){
        var ad = {
            nickname: $p_id.find("#xq_nickname").val(),
            accounts: $p_id.find("#xq_accounts").val(),
            password: $p_id.find("#xq_password").val(),
            article:2,
            interaction:2,
            admin:2,
            key_menu:2,
            menu:2,

        };
        if($p_id.find("#xxfb").is(':checked')){
            ad.article = 1;
        }
        if($p_id.find("#hdjl").is(':checked')){
            ad.interaction = 1;
        }
        if($p_id.find("#glybk").is(':checked')){
            ad.admin = 1;
        }
        if($p_id.find("#gjzgl").is(':checked')){
            ad.key_menu = 1;
        }
        if($p_id.find("#cdgl").is(':checked')){
            ad.menu = 1;
        }
        debugger;
        $.ajax({
            type: "post",
            url: "/admin/update?seq_no="+seq_no,
            dataType: "json",
            data: ad,
            success: function (data) {
                alert("修改成功");
                window.location.reload();
            },
            error: function (data) {
                alert("系统错误");
            }
        });
    });

    $('#new').on("click",function(){
        seq_no = 0;
        $p_id.find("#mas").show();
        $p_id.find("#mb").show();
        $p_id.find("#xq_nickname").val('');
        $p_id.find("#xq_accounts").val('');
        $p_id.find("#xq_password").val('');
        $p_id.find("#xxfb").prop('checked',true);
        $p_id.find("#hdjl").prop('checked',true);
        $p_id.find("#glybk").prop('checked',true);
        $p_id.find("#gjzgl").prop('checked',true);
        $p_id.find("#cdgl").prop('checked',true);
    });
});