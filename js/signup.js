
$(document).ready(function(){
	var isOut = true;
	var isIn = false;
	$(".category-item").hide();
	var URL=document.URL; 
	var arraytemp=new Array();
	arraytemp=URL.split("?");
	var idtemp=arraytemp[1];
	var jsontemp;
	$(document).on("focus","input,textarea",function(){
		$("input.click,textarea.click").removeClass("click");
		$(this).addClass("click");
	})

	$(".category-item").mouseout(function() {
		isOut = true;
	})
	$(".category-item").mouseover(function() {
		isOut = false;
	})
	$(".category-button").mouseout(function() {
		isIn = false;
	})
	$(".category-button").mouseover(function() {
		isIn = true;
	})
		
	document.onmousedown = function() {
		if (isOut && !isIn) {
			$(".category-item").hide();
			$(".category-button").removeClass("click");
		}
	}
	$(".category-button").on("click", function() {
		if (!$(this).hasClass("click")) {
			$(this).addClass("click");
			$(this).next().show();
		} else {
			$(this).removeClass("click");
			$(this).next().hide();
		}
	});
	datatemp=function(){
		this.id;
	}
	var data1=new datatemp();
	data1.id=idtemp;
	$.ajax({

		url: "http://stu.fudan.edu.cn/event/Parameters.aspx",
		data: data1,
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		type: 'get',
		async: false,
	}).done(function(json) {
		jsontemp=json;
		json=json.Root;
		para=json.Para;
		if(para){
			for(i=0;i<para.length;i++){
				$("#sno").after("<li><div class='left'><p>"+para[i]+"</p></div><div class='right'><div class='input-wrap'><input type='text' id='event-title' class='normal-input'/></div></div></li>")
			}
		}
		var times=json.Times;
		for(i=0;i<times.length;i++){
			var stringtemp= times[i].StartTime+times[i].EndTime;
			var arraytemp=new Array();
			arraytemp=times[i].StartTime.split('T');
			var arraytemp2=new Array();
			arraytemp2=arraytemp[0].split("-");
			arraytemp2[1]=parseInt(arraytemp2[1]);
			arraytemp2[2]=parseInt(arraytemp2[2]);
			var string =arraytemp2[0]+"年"+arraytemp2[1]+"月"+arraytemp2[2]+"日  ";
			var string2=arraytemp[1].split(":")[0]+":"+arraytemp[1].split(":")[1];
			var arraytemp3=times[i].EndTime.split('T');
			var string3=arraytemp3[1].split(":")[0]+":"+arraytemp3[1].split(":")[1];
			var stringtemp=string+string2+" - "+string3;
			$("#time-pick-choose ul").append("<li>"+stringtemp+"</li>");
			$(".category-item li:last").on("click", function() {
				$(this).parent().find("li").each(function(i, obj) {
					if ($(obj).hasClass("click"))
						$(obj).removeClass("click");
				})
				$(this).addClass("click");
				$(this).parent().parent().prev().prev().find("p").text($(this).text());
				$(this).parent().parent().prev().prev().find("p").parent().addClass("choose");
				$(this).parent().parent().hide();
				$(".category-button").removeClass("click");

			})
		}

	}).fail(function(msg) {
		alert("似乎网络出现了一点问题，请检查~~" + msg);
	});
	datatype=function() {
		this.Parameters;
		this.id;
		this.Times;
	}
	var data1=new datatype();
	var datatype2=function(){
		this.name;
		this.value;
	}
	var arraytemp=new Array();
	
	$("#prev").click(function(){
		window.open('','_self','');
		window.close();
	})
	$("#next").click(function(){
		var isempty=false;
		$("#page1 .input-wrap input").each(function(i,obj){
			if($(obj).val()==""||$(obj).val()==null){
				isempty=true;

			}
		})
		if($(".category-show p").html()==""){
			isempty=true;
		}
		if(!isempty){
			$(".check-alert").hide();
			var i=0;
			var arraytemp=new Array();
			$("#page1 li").each(function(i,obj){
				if(($(obj).attr("id"))!="multitime")
				{
					var datatemp=new datatype2();
					if($(obj).find(".left p").text()){
						datatemp.name= $(obj).find(".left p").text();
						datatemp.value=$(obj).find(".right input").val();
						arraytemp[i]=datatemp;
						i=i+1;
					}
				}
			});
			data1.Parameters=arraytemp;
			var URL=document.URL; 
			var arraytemp2=new Array();
			arraytemp2=URL.split("?");
			data1.id=arraytemp2[1];
			var index=$("#time-pick-choose ul li").index($("#time-pick-choose ul li.click"));
			var times=jsontemp.Root.Times;
			console.log(index);
			var datatemp=function(){
				this.StartTime;
				this.EndTime;
			}
			var arraytemp=new Array();
			var data2=new datatemp();
			data2.StartTime=times[index].StartTime;
			data2.EndTime=times[index].EndTime;
			arraytemp[0]=data2;
			data1.Times=arraytemp;
			console.log(data1);
			$.ajax({
	
				url: "http://stu.fudan.edu.cn/event/Subscribe.aspx",
				data: JSON.stringify(data1),
				contentType: "application/json;charset=utf-8",
				type: 'get',
				async: false,
			}).done(function(json) {
				if(json=="1"||json==1){
					var URL=document.URL; 
					var arraytemp=new Array();
					arraytemp=URL.split("?");
					var idtemp=arraytemp[1];
					window.location.href="http://stu.fudan.edu.cn/event/main.html?"+idtemp;
				}
			}).fail(function(){
				alert("似乎网络出现了一点问题，请检查");
			});
		}
		else{
			$(".check-alert").show();
		}

	})
	$(".category-item ul li:eq(0)").trigger("click");
})