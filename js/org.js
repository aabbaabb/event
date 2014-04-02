$(document).ready(function(){
	var tag=true;
	var deletetag=false;
	var geturlid=function(){
		var URL=document.URL; 
		var arraytemp=new Array();
		arraytemp=URL.split("?");
		return arraytemp[1];
	}
	var datatemp=function(){
		this.OrgName;
	}
	var data1=new datatemp();
	data1.OrgName=decodeURI(geturlid());
	$("#title-big").html((data1.OrgName));
	$(".orgregister").hide();
	$.ajax({
		url: "http://stu.fudan.edu.cn/event/ViewOrgMembers.aspx",
		data: data1,
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		type: 'get',
		async: false,
	}).done(function(json) {
		json=json.root.NickName;
		if(json){
			var i=0;
			$("#mainadmin span:eq(1)").html(json[0]);
			for(i=1;i<json.length;i++){
				$("#admin-show").append("<div class='admin-show-each'><p>"+json[i]+"</p><div class='delete-icon'></div></div>");
			}

		}
		
	}).fail(function(json){
		
	});
	$(".addadmin").click(function(){
		$("#manageorg #mainadmin").after("<div class='admininput'><input type='text' /><div class='checkonly pointer adminconfirm'></div></div>");
	})
	$(document).on("click",".delete-icon",function(){
		var datatemp=function(){
				this.OrgName;
				this.NickName;
				this.Type='del';
			}
			var data1=new datatemp();
			data1.OrgName=decodeURI(geturlid());
			data1.NickName=$(this).prev().text();
		$.ajax({
			url: "http://stu.fudan.edu.cn/event/ApplyMinorOrg.aspx",
			data: data1,
			dataType:"json",
			contentType: "application/json;charset=utf-8",
			type: 'get',
			async: false
		}).done(function(json) {
			if(json.success=="1")
				deletetag=true;
		}).fail(function(){

		})
		if(deletetag==true){
			deletetag=false;
			$(this).parent().remove();
		}

	})
	$(document).on("click","#manageorg .adminconfirm",function(){
		if(checklogin()==true){
			var datatemp=function(){
				this.OrgName;
				this.NickName;
			}
			var data1=new datatemp();
			data1.OrgName=decodeURI(geturlid());
			data1.NickName=$(this).prev().val();
			if($(this).prev().val()!=""){
				
				$("#admin-show").append("<div class='admin-show-each'><p>"+$(this).prev().val()+"</p><div class='delete-icon'></div></div>");
				$(this).prev().val("");
				$(".admin-show-each:last").hide();
				$.ajax({
					url: "http://stu.fudan.edu.cn/event/ApplyMinorOrg.aspx",
					data: data1,
					dataType:"json",
					contentType: "application/json;charset=utf-8",
					type: 'get',
					async: false
				}).done(function(json) {
					if(json.success!="0"){
						$(".orgregister").hide();
						$(".admin-show-each:last").show();
						
					}
					else{
						$(".orgregister").show();
						if(json.msg=="用户未注册或初始化"){	
							$(".orgregister").empty();
							$(".orgregister").append("<a href='http://stu.fudan.edu.cn/user/register'><div class='orglogin check-alert'>还没注册过(马上去注册?)</div></a>");
							$(".orgregister").show();
						}
						else
						{
							if(json.msg){
								$(".orgregister").empty();
								$(".orgregister").append("<div class='check-alert'>"+json.msg+"</div>");
							}
						}
					}
				}).fail(function(){
					$(".admin-show-each:last").remove();
				})
				
	
			}
		}

	})	
})