/**
 * Created by Administrator on 2016/7/29.
 */
$(function() {
    $.ajaxSetup({cache:false});
    $("#se_button").on("click",function(){
        debugger;
        var title =  $("#textfield").val();
        self.location="/globalQuery?title="+title;
    });


});