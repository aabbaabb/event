$(document).ready(function(){
	var isRetina = (window.retina || window.devicePixelRatio > 1);
 	var page=0;
 	lastpage=false;
 	var isOut=false;
 	var detail=false;
 	var lastscrollTop=null;
	if(isRetina){
	    $(".small-pic").each(function(){
	        $(this).attr('src',$(this).attr('data-src-retina'));
	    })
	}
	$('#top').hide();
	$(".ui-loader").hide();
	var green="#068a3f",purple="#e20f55",orange="#ff601a",yellow="#ffb400",sky="#2bb2b4",blue="#6584da1";
	 function setcookie(name,value){  
        var exp  = new Date();  
        exp.setTime(exp.getTime() + 2*60*60*1000);  
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();  
    }  
     

    function getcookie(name){  
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));  
        if(arr != null){  
            return (arr[2]);  
        }else{  
            return "";  
        }  
    }  
	function style(json){
		
		var datatemp=function(){
			this.color;
			this.cat;
		}
		var temp= new datatemp();
		if(json=="比赛")	//换成绿色系
		{
			temp.color=green;
			temp.cat="con";
		}
		if(json=="讲座")	//换成紫色系
		{
		
			temp.color=purple;
			temp.cat="lec";
			//$(".main-content-each:eq("+i+") .intro:eq(0)").text("主讲");
		}
		if(json=="线上")	//换成淡蓝系
		{
			temp.color=sky;
			temp.cat="onl";
		}
		if(json=="其他")	//换成蓝色系
		{
			temp.color=blue;
			temp.cat="oth";
		}
		if(json=="演出")	//换成黄色系
		{
			temp.color=yellow;
			temp.cat="out";
		}
		if(json=="出行")	//换成橙色系
		{
			temp.color=orange;
			temp.cat="per";
		}
		return temp;
	}
	function reachBottom() {
	    var scrollTop = 0;
	    var clientHeight = 0;
	    var scrollHeight = 0;
	    if (document.documentElement && document.documentElement.scrollTop) {
	        scrollTop = document.documentElement.scrollTop;
	    } else if (document.body) {
	        scrollTop = document.body.scrollTop;
	    }
	    if (document.body.clientHeight && document.documentElement.clientHeight) {
	        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
	    } else {
	        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
	    }
	    scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	    if (scrollTop + clientHeight <= scrollHeight && scrollTop + clientHeight > (scrollHeight * 0.95)) {
	        return true;
	    } else {
	        return false;
	    }
	}
	var bind=function(){
		$("#banner p").click(function(){
			setcookie("notphone","true");
			window.location.href="http://stu.fudan.edu.cn/event";
		})
		$(".back").click(function(){
			detail=false;
			$("#main-page").show();
			$('html,body').animate({scrollTop:lastscrollTop},0);
			$("#main-page").animate({"margin-left":"0%"},200);
			$(".back").hide();
		});
		$("#calendar-button").hover(function(){
			isOut=false;
		},function(){
			isOut=true;
		})
		$(window).on("touchstart",function(){
			if($(event.target).parents("#calendar-button").length<=0){
				$("#calendar-button li").hide();
				$("#calendar-button li:first").addClass("show");
				$("#calendar-button li.show").show();
			}
		})
		$(window).scroll(function(){
			 min_height=window.screen.availHeight ;
			 var s = $(window).scrollTop();
			 if( s > 0){
			 	if(!$("#top").hasClass("hide"))
					$('#top').fadeIn(100);
			}else{
				$('#top').fadeOut(200);
			};
			if(reachBottom()==true&&lastpage==false){
				//setTimeout(updatemore,1000) ;
				if(page==0)
					page=2;
				else
					page=page+1;
				if(detail==false)
					updatejson(1);
				
			}
		});
		//top按钮控制
		
		$('#top').click(function(){

			$('html,body').animate({scrollTop:0},0);
			
		});

		$(".top-nav-button-each").hover(function(){
			$(this).find(".top-nav-button-inside").addClass("hover");
		},function(){
			$(this).find(".top-nav-button-inside").removeClass("hover");
		})
		$(".top-nav-button-each").click(function(){

			$(".top-nav-button-inside.click").removeClass("click");
			$(this).find(".top-nav-button-inside").addClass("click");
			page=0;
			lastpage=false;
			updatejson();
		})
	}
	function converttime(string){
		var arraytemp=new Array();
		arraytemp=string.split("T");
		var arraytemp2=new Array();
		arraytemp2=arraytemp[0].split("-");
		arraytemp2[1]=parseInt(arraytemp2[1]);
		arraytemp2[2]=parseInt(arraytemp2[2]);
		return arraytemp2[0]+"年"+arraytemp2[1]+"月"+arraytemp2[2]+"日"+" "+arraytemp[1].split(":")[0]+":"+arraytemp[1].split(":")[1];
	}
	var updatejson=function(notclear){
		$("#loading").show();

		var datatemp=function(){
			this.cat;
			this.subcat;
			this.perpage;
			this.page;
			this.timeoffset;
		}
		var data1=new datatemp();
		if($("#calendar-button ul li.show p").text()!="全部")
			data1.cat=$("#calendar-button ul li.show p").text();
		if(notclear==null){
			$("#main-content").empty();
			data1.perpage=6;
		}
		else
			data1.perpage=3;
		data1.page=page;
		var num=$(".top-nav-button-inside").index($(".top-nav-button-inside.click"));
		if(num==0){
			data1.timeoffset=4;
		}
		else{
			data1.timeoffset=num-1;
		}
		$.ajax({
	
			url : "http://stu.fudan.edu.cn/event/Event_data.aspx",
			data:data1,
			dataType : 'json',
			type : 'get',
			async:false
		}).done(function(json){
			setTimeout(function(){
				$("#loading").hide();
				mainjson=json.allevents;
				json=json.allevents;
				if(json.Event!=null){
					if(json.Event.length<3){
						lastpage=true;
					}
					var n=json.Event.length;
					var i;
					for (i = 0;i < n;i++) {
						if(json.Event[i]){
							var eventeach=json.Event[i];
							$("#main-content").append($("#template").html());
							$(".main-content-each:last").attr("id",eventeach.Id);
							var Type=eventeach.Type;
							if(eventeach.Subtype!="null"&&eventeach.Subtype!=null)
								Type=Type+"·"+eventeach.Subtype;
							$(".main-content-each:last .category").text(Type);

							var title=eventeach.Title;
							if(eventeach.subTitle!=null){
								title=title+"————"+eventeach.subTitle;
							}
							$(".main-content-each:last .title").text(title);
							if((eventeach.Location!=null)&&(eventeach.Location!="")&&(eventeach.Location!=" "))
								$(".main-content-each:last .position").text(eventeach.Location);
							else
								$(".main-content-each:last .location-wrap").hide();
							$(".time:last").text(converttime(eventeach.StartTime));
							if(eventeach.Speakers==null||eventeach.Speakers.length==0)
								$(".main-content-each:last .content-speaker-wrap").hide();
							else{
								for(var j=0;j<eventeach.Speakers.length;j++)
									$(".main-content-each:last .content-speaker-wrap").append("<div class='speaker-each clearfix'><div class='speaker-name'>"+eventeach.Speakers[j].Name+"</div></div>")
							}
							var style1=style(eventeach.Type);
							$(".main-content-each:last .category").css("color",style1.color);
							var temp=eventeach.timeleft2;
							if(temp.min<0||temp.hour<0||temp.day<0){
								$(".main-content-each:last .main-content-title").append("<span class='alreadyover'>已结束</span> ");
							}
							$(".main-content-each:last .main-content-title").on("click",function(){
								detail=true;
								$(document).on("swiperight",function(){
									$(document).off("swiperight");
									$('.back').click();
								})
								$(".back").show();
								$(this).parents(".main-content-each").addClass("click");
								updatedetail();
								lastscrollTop=$("body")[0].scrollTop;
								$("#main-page").animate({"margin-left":"-50%"},200,function(){

									$("#main-page").hide();
								});
							})

						}
					}
				}
				else{
					if(notclear==null){
						$("#main-content").append("<div class='alert-none-wrap'><p class='alert-none'>没有更多活动啦</p><p class='alert-none'>再去别处看看吧OωO</p></div>")
					}
				}
			},200);
			
		});
	}
	var updatedetail=function(){
		$.ajax({
			url:"http://stu.fudan.edu.cn/event/Event_Detail.aspx?id="+$(".main-content-each.click").attr("id"),
			type:"get",
			async:true,
			dataType:"json",
			success:function(data){
				data=data.Eventdetail;
				$(".main-content-each.click").removeClass("click");
				var picsrc="./g_Poster.aspx?&Thumb=0&id="+data.Id;
				$(".detail-img").css("visibility","hidden");
				$(".detail-img").attr("src",picsrc);
				var image=new Image();
				image.src=picsrc;
				image.onload=function(){
					$(".detail-img").css("visibility","visible");
				}
				$(".detail-time-wrap .starttime").text(converttime(data.StartTime));
				if(data.EndTime){
					$(".detail-time-wrap .endtime").text(converttime(data.EndTime));
				}
				else{
					$(".detail-time-wrap .endtime-wrap").hide();
				}
				if((data.Location!=null)&&(data.Location!="")&&(data.Location!=" "))
					$(".detail-time-wrap .location").text(data.Location);
				else
					$(".detail-time-wrap .location-wrap").hide();
				if((data.Publishers!=null)&&(data.Publishers.length>0)){
					$(".detail-raiser").remove();
					for(i=0;i<data.Publishers.length;i++){
						$(".detail-raiser-wrap").append("<div class='detail-raiser'>"+data.Publishers[i]+"</div>");
					}
				}
				else
					$(".detail-raiser-wrap").hide();
				if((data.Speakers!=null)&&(data.Speakers.length>0)){
					$(".detail-speaker").remove();
					for(i=0;i<data.Speakers.length;i++){
						$(".detail-speaker-wrap").append("<div class='detail-speaker'>"+data.Speakers[i].Name+"</div>");
					}
				}
				else
					$(".detail-speaker-wrap").hide();
				$(".detail-content").text(data.Context);
				var Type=data.Type;
				if(data.Subtype!="null"&&data.Subtype!=null)
					Type=Type+"·"+data.Subtype;
				$(".detail-content-title .category").text(Type);

				var title=data.Title;
				if(data.Subtitle!=null){
					title=title+"——"+data.Subtitle;
				}
				$(".detail-content-title .title").text(title);
				var style1=style(data.Type);
				$(".detail-color").css("color",style1.color);
			}
		})
	}
	var libind=function(){
		$("#calendar-button li").off();
		$("#calendar-button li").on("click",function(){
			if(!$(this).hasClass("show")){
				$("#calendar-button ul").prepend("<li class='clearfix'>"+$(this).html()+"</li>");
				$("#calendar-button li").hide();
				$("#calendar-button li:first").attr("id",$(this).attr("id"));
				$(this).remove();
				$("#arrow").remove();
				$("#calendar-button li:first").append("<img class='small-pic' id='arrow' src='./img/arrow-mobile.png' data-src-retina='./img/arrow-mobile-retina.png' />")
				$("#calendar-button li:first").addClass("show");
				$("#calendar-button li:first").show();
				libind();
				page=0;
				lastpage=false;
				updatejson();
			}
			else{
				$("#calendar-button li").show();
				$(this).removeClass("show");
			}
		})
	}
	bind();
	$("#calendar-button li").hide();
	$("#calendar-button li:first").show();
	libind();
	updatejson();
})
