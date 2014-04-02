var tag=true;
function getCookie(c_name)
{
	if(document.cookie.length>0){
	   c_start=document.cookie.indexOf(c_name + "=")
	   if(c_start!=-1){ 
	     c_start=c_start + c_name.length+1 
	     c_end=document.cookie.indexOf(";",c_start)
	     if(c_end==-1) c_end=document.cookie.length
	     return unescape(document.cookie.substring(c_start,c_end))
	   }
	}
	return "";
}

var checklogin=function(){
	$.ajax({
		url: "http://stu.fudan.edu.cn/event/userinfo.aspx",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		type: 'get',
		async: false,
	}).done(function(json) {
		json=json.User;
		if(json.Nickname!=null){
			tag = false;
			if(getCookie('webpy_session_id')!=null){
				$.ajax({
					url:"http://stu.fudan.edu.cn/event/auth.aspx",
					contentType: "application/json;charset=utf-8",
					type: 'get',
					async: false
				}).done(function(){
					tag=true;
				})
			}
		}
		else
			tag=false;
			
	}).fail(function(json){
		tag =  false;
	});
	if(tag==false){
		alert("请登录~~");
		window.open("http://stu.fudan.edu.cn/auth/auth.aspx?returnurl=http://stu.fudan.edu.cn/event/auth.aspx");
	}
	return tag;
}