var name_0='one';
var cursel_0=1;
//循环周期，可任意更改（毫秒）
var links_len,iIntervalId;
onload=function(){
	//var links = document.getElementById("tab1").getElementsByTagName('li')
	//links_len=links.length;
	
}
function setTab(name,cursel){
	cursel_0=cursel;
	for(var i=1; i<=links_len; i++){
		var menudiv = document.getElementById("con_"+name+"_"+i);
		if(i==cursel){
			menudiv.style.display="block";
		}
		else{
			menudiv.style.display="none";
		}
	}
}
function Next(){                                                        
	cursel_0++;
	if (cursel_0>links_len)cursel_0=1
	setTab(name_0,cursel_0);
} 
