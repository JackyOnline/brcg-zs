/**
 * Created by Jacky on 2016/9/18.
 */
$(function () {
    var $p_id = $("#gsalPo_gage");

    $p_id.find("#save").on('click',function(){
            debugger;
        if($p_id.find("#name_text").val()==''){
            alert("请输入案例名称！")
        }else if($p_id.find("#area_text").val()==''){
            alert("请输入案例介绍！")
        }else if($p_id.find("#img_url").val()==''){
            alert("请插入图片！")
        }else{
            var data = {
                name: $p_id.find("#name_text").val(),
                area: $p_id.find("#area_text").val(),
                houseType : $p_id.find('input:radio:checked').val(),
                img_url:$p_id.find("#img_url").val(),
                state:1,
            };
            $.ajax({
                type: "post",
                url: '/gsalPo/insert',
                dataType: "json",
                data: data,
                success: function (data) {
                    debugger;
                    alert("提交成功！");
                    window.location.reload();
                },
                error: function (data) {
                    alert("系统错误");
                }
            })
        }

    });


    var picClient =new PicClient();
    var add_top_num = 0;
    debugger;

    //添加头部图片
    function add_top_img(top_img_url){
        add_top_num++;
        debugger;
        $p_id.find("#img_cover_ul").append('<li class="alert alert-dismissable"> ' +
            '<strong> ' +
            '<img id="img_cover'+add_top_num+'" src="'+top_img_url+'" alt="" width="160" height="110"> ' +
            //'<input id="add_img_cover'+add_top_num+'" name="img_cover" value="'+top_img_url+'"> ' +
            '</strong> ' +
            '</li>');

        debugger;
    }

    picClient.addsingles(['add_top_img'],function callback(date1,date2,date3){
        setTimeout(function () {
            debugger;
            add_top_img('');
            $p_id.find('#img_cover'+add_top_num).attr('src','upload/'+JSON.parse(date2).date);
            //$p_id.find("#add_img_cover"+add_top_num).val('upload/'+JSON.parse(date2).date);
            $p_id.find("#img_url").val($p_id.find("#img_url").val()+';'+'upload/'+JSON.parse(date2).date);
            debugger;
        }, 1000);
    })
});