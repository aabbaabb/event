$(document).ready(function(){
	var isRetina = (window.retina || window.devicePixelRatio > 1);
 	var page=0;
 	lastpage=false;
 	var isOut=false;
	if(isRetina){
	    $(".small-pic").each(function(){
	        $(this).attr('src',$(this).attr('data-src-retina'));
	    })
	}
	$('#top').hide();
	var green="#068a3f",purple="#e20f55",orange="#ff601a",yellow="#ffb400",sky="#2bb2b4",blue="#6584da1";
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
				page=page+1;
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
							$(".main-content-each:last").attr("id",eventeach.id);
							var Type=eventeach.Type;
							if(eventeach.Subtype!="null"&&eventeach.Subtype!=null)
								Type=Type+"·"+eventeach.Subtype;
							$(".category:last").text(Type);

							var title=eventeach.Title;
							if(eventeach.subTitle!=null){
								title=title+"————"+eventeach.subTitle;
							}
							$(".title:last").text(title);
							if((eventeach.Location!=null)&&(eventeach.Location!=""))
								$(".position:last").text(eventeach.Location);
							else
								$(".location-wrap:last").hide();
							$(".time:last").text(converttime(eventeach.StartTime));
							if(eventeach.Speakers==null||eventeach.Speakers.length==0)
								$(".content-speaker-wrap").hide();
							else{
								for(var j=0;j<eventeach.Speakers.length;j++)
									$(".content-speaker-wrap:last").append("<div class='speaker-each clearfix'><div class='speaker-name'>"+eventeach.Speakers[j].Name+"</div></div>")
							}
							var style1=style(eventeach.Type);
							$(".category:last").css("color",style1.color);
							var temp=eventeach.timeleft2;
							if(temp.min<0||temp.hour<0||temp.day<0){
								$(".main-content-title:last").append("<span class='alreadyover'>已结束</span> ");
							}

						}
					}
				}
				else{
					if(notclear==null){
						$("#main-content").append("<div class='alert-none-wrap'><p class='alert-none'>没有更多活动啦</p><p class='alert-none'>再去别处看看吧OωO</p></div>")
					}
				}
			},1000);
			
		});
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
