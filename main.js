

$(document).ready(function(){


	var mainjson;
	var myimages=new Array();
	var lastnum=0;

	var jointime="<p id='join-time-introduce'>参加时间</p>"+		//选择时间填充内容
			"<div id='join-time-option'>"+
				"<div class='click-box'></div>"+
				"<p>	2013-03-19 08:00-10:00</p>"+
				"<div class='click-box'></div>"+
				"<p>	2013-03-19 08:00-10:00</p>"+
				"<div class='click-box'></div>"+
				"<p>	2013-03-19 08:00-10:00</p>"+
			"</div>";
	var picstylewrong="<div id='picstyle-wrong'><p>这是什么啊~</p><p>换个服务器君认识的格式好嘛拜托了~</p></div>";
	var pictoobig="<div id='picstyle-wrong'><p>太大了，人家搬不动啦~</p></div>";
	var needtologin="<div id='picstyle-wrong'><p>登陆后才能使用这个功能哦~</p></div>";
	var confirm2="<div class='join-time-sbutton join-time-confirm-style' id='loginnow'>现在登录</div><div class='join-time-sbutton join-time-confirm-style' id='later'>随便逛逛</div>";
	var replyeach="<div class='reply-each'><ul><li>"
												+"<div class='reply-person'>${name}</div><div class='reply-time'></div>"
											+"</li><li>"
											+	"<div class='reply-content'>${content}</div><a class='detail-addition-icon' ></a>"
											+"</li></ul></div>"

	var eventusereach="<div class='user-event-each'><div class='user-event-img'><img src=${pic} alt='' /></div>"+
							"<ul><li class='intro' id='user-event-title'>${Title}</li>"+
								"<li><span class='intro'>时间</span><span class='user-event-time'>${StartTime}</span></li>"+
								"<li><span class='intro'>地点</span><span class='user-event-location'>${Location}</span></li>"+
							"</ul></div>";
	function data(){
		this.cat="";
		this.subcat="";
		this.timeoffset=0;
	}
	var green="#068a3f",purple="#e20f55",orange="#ff601a",yellow="#ffb400",sky="#2bb2b4",blue="#6584da1";
	function style(json){
	
				if(json=="比赛")	//换成绿色系
				{
					this.color=green;
					this.cat="con";
				}
				if(json=="讲座")	//换成紫色系
				{
		
					this.color=purple;
					this.cat="lec";
					$(".main-content-each:eq("+i+") .intro:eq(0)").text("主讲");
				}
				if(json=="线上")	//换成淡蓝系
				{
					this.color=sky;
					this.cat="onl";
				}
				if(json=="其他")	//换成蓝色系
				{
					this.color=blue;
					this.cat="oth";
				}
				if(json=="演出")	//换成黄色系
				{
					this.color=yellow;
					this.cat="out";
				}
				if(json=="出行")	//换成橙色系
				{
					this.color=orange;
					this.cat="per";
				}
	}

	function changecategory(a){
		if(a.hasClass("purple"))
			this.cat="全部";
		if(a.hasClass("red"))
			this.cat="讲座";
		if(a.hasClass("orange"))
			this.cat="出行";
		if(a.hasClass("yellow"))
			this.cat="演出";
		if(a.hasClass("green"))
			this.cat="比赛";
		if(a.hasClass("sky"))
			this.cat="线上";
		if(a.hasClass("other"))
			this.cat="其他";
	}



	function preloadimages(){
		for (i=0;i<preloadimages.arguments.length;i++){
			myimages[i]=new Image();
			myimages[i].src='img/'+preloadimages.arguments[i];
		}
	};
	var template;
	var detailtemplate;
	function loadtemplate(){  //ajax 更新内容 template为每一个content的模版
		$.ajax({	
			url:'/xml/content-each.html',
			datatype: 'html',  	
			type:'GET',
			error: function(html){

				alert('Error loading HTML document'+html);

			},
			success:function(html){
				template=html;
			},
			async:false
		});
	}
	function loaddetailtemplate(){
		$.ajax({	
			url:'/xml/detail.html',
			datatype: 'html',  	
			type:'GET',
			error: function(html){

				alert('Error loading HTML document'+html);

			},
			success:function(html){
				detailtemplate=html;
			},
			async:false
		});
	}

	function caltime(time){
		ans=time;
	    return ans;

	}
	function timealter(a){
		if(a=="今天")
			return 0;
		if(a=="明天")
			return 1;
		if(a=="本周")
			return 2;
		if(a=="下周")
			return 3;
	}
	function updatejson(){	//add main content
		var style=new changecategory($(".more.stretch"));
		var data1=new data();
		if(style.cat)
			data1.cat=style.cat;
		if($(".td-normal-click").text())
		{
			data1.timeoffset=timealter(caltime($(".td-normal-click").text()));
		}
		if($(".li-wrap.stretch p:eq(1)").html())
			data1.subcat=$(".li-wrap.stretch p:eq(1)").html();
		$.ajax({

			url : "xml/test.js",
			data:data1,
			dataType : 'json',
			type : 'get',
			async:false,
		}).done(function(json){
			mainjson=json=json.allevents;
			if (json && json.success == 1) {
				addnum(json.num);

				for (i = 0, n = json.Event.length;i < n;i++) {
					$('#main-content').append(interpolate(template,json.Event[i]));
					addaddition(json.Event[i],i+lastnum);
					changestyle(json.Event[i].Type,i+lastnum);	//改变色系
				}
				lastnum=lastnum+n;
			} else {
				// server response error
			}	
		}).fail(function () {
			alert("似乎网络出现了一点问题，请检查~~");
		});	
	};

	function updatedetail(i,dataobject){	//add detail content
		$.ajax({
			url:"xml/detail.js",
			data:dataobject,
			dataType: 'json',
			type: "get",
			async:false
		}).done(function(json){
			json=json.Eventdetail;
			if(json && json.success==1){
				string=interpolate(detailtemplate,json);	//放入detial.js中的信息
				string=cp(mainjson,string);
				$("#main-content-detail").remove();
				$("#more").hide();
				$("#main-content").append(string);
				if($("#detail-title .subcategory").text()=="【${Subtype}】"){
					$("#detail-title .subcategory").text(' ');
				};	
				$("#detail-content .context").text(json.Context.cdatasection);

				for(var i=0;i<json.album.length;i++)
				{
					myimages[i]=json.album[i];
				}
				album(myimages);
				for(i=0; i<json.responses.length;i++){
					$("#replybox-reply").append(interpolate(replyeach,json.responses[i]));
					detailaddition(json.responses[i],i);
					
				}
			}
		}).fail(function(){
			alert("似乎网络出现了一点问题，请检查~~");
		})
		function cp(mainjson,string){	//放入main.js中的信息
			string=interpolate(string,mainjson.Event[i]);
			return string;	
		}
	}

	function showdetail(temp,data1){
		type=temp.find(".category").text();
		type=type.replace(/【/,"").replace(/】/,"");
		$(".main-content-each").hide();
		updatedetail($(".main-content-title").index(temp),data1);	//放入内容
		detailinit();
		detailbind();
		detaileachbind();
		$("#main-content-detail").show();
		changedetailstyle(type);


	}
	
	function addusercontent(cat,query,eachnum){
		var length=cat.length;
		var num=parseInt((length-1)/eachnum)+1;
		var string=query+"-wrap";
		drawnav(string,num,eachnum);
		var i;
		for(i=0;i<length;i++){
			var string=interpolate(eventusereach,cat[i]);
			
			$(query).append(string);
		}

	}

	function updateuser(){
		$.ajax({
			url : "xml/user.js",
			dataType : 'json',
			type : 'get',
			async:false,
		}).done(function(json){
			json=json.user;
			if(json && json.success==1){
				json=json.data;
				var part=json.participant;
				addusercontent(part.toattend,"#user-to-attend",6);
				addusercontent(part.ended,"#user-ended",2);
				var part=json.interest;
				addusercontent(part.toattend,"#user-interest",6);
				addusercontent(part.ended,"#user-interest-ended",2);
				var part=json.raise;
				addusercontent(part.toattend,"#user-raise",6);
				addusercontent(part.ended,"#user-raise-ended",2);
			}
			userinit();
		}).fail(function(){
			alert("似乎网络出现了一点问题，请检查~~");
		})
	}

	function changestyle(json,i){	//change color style
			var style1=new style(json);
			var color=style1.color;
			var cat=style1.cat;
				if(json!=""){	//改变色系
					$('.main-content-each:eq('+i+') .category').css("color",color);
					$('.main-content-each:eq('+i+') .subcategory').css("color",color);
					$('.main-content-each:eq('+i+') .tag').css("background-image","url('img/tag-"+cat+".png')");
					$('.main-content-each:eq('+i+') .love-icon').hover(function(){
						if(!$(this).hasClass("love-select"))
						$(this).css("background-image","url('img/love-"+cat+".png')");				
					});
					$('.main-content-each:eq('+i+') .love-icon').mouseleave(function(){
						if(!$(this).hasClass("love-select")){
							$(this).css("background-image","url('img/love.png')")
						}
					});
					$('.main-content-each:eq('+i+') .love-icon').click(function(){
						if(!$(this).hasClass("love-select")){
							$(this).addClass("love-select");
							$(this).css("background-image","url('img/love-"+cat+"-selected.png')");
							num=Number($(this).next().text())+1;
							$(this).next().text(num);
						}
						else
						{
							$(this).removeClass("love-select");
							$(this).css("background-image","url('img/love-"+cat+".png')");
							num=Number($(this).next().text())-1;
							$(this).next().text(num);
						}			
					});
					$('.main-content-each:eq('+i+') .pin-icon').hover(function(){
						if(!$(this).hasClass("pin-select"))
						$(this).css("background-image","url('img/pin-"+cat+".png')")	
					});	
					$('.main-content-each:eq('+i+') .pin-icon').mouseleave(function(){
						if(!$(this).hasClass("pin-select"))
						$(this).css("background-image","url('img/pin.png')")
						
					});
					$('.main-content-each:eq('+i+') .pin-icon').click(function(){
						if(!$(this).hasClass("pin-select")){
							$(this).addClass("pin-select");
							$(this).css("background-image","url('img/pin-"+cat+"-selected.png')");
							num=Number($(this).next().text())+1;
							$(this).next().text(num);
							timechoose();
						}
						else{
							$(this).css("background-image","url('img/pin-"+cat+".png')");
							$(this).removeClass("pin-select");		
							num=Number($(this).next().text())-1;
							$(this).next().text(num);	
						}
					});
					$('.main-content-each:eq('+i+') .reply-icon,.main-content-each:eq('+i+') .share-icon').hover(function(){
						
						$(this).css("color",color)	;
					});
					$('.main-content-each:eq('+i+') .reply-icon,.main-content-each:eq('+i+') .share-icon').mousedown(function(){
						$(this).css("color","#666666")
					});
					$('.main-content-each:eq('+i+') .reply-icon,.main-content-each:eq('+i+') .share-icon').mouseup(function(){
						$(this).css("color",color)
					});
					$('.main-content-each:eq('+i+') .reply-icon,.main-content-each:eq('+i+') .share-icon').mouseleave(function(){
						$(this).css("color","#666666")
						
					});
					$('.main-content-each:eq('+i+') strong').css("color",color)
					
					if(json.ViewFlag=='1'){
						$('.days-left:eq('+i+')').append("<div class='review'></div>");
						$(".days-left .review").css({
							"background-image":"url('img/review-"+cat+".png')",
							"width":"115px",
							"height":"62px",
							"margin-left":"60px"
						});
					}

					$('.main-content-each:eq('+i+') .tag').click(timechoose);

					$('.main-content-each:eq('+i+') .reply-icon').click(function(){	
							//进入detail!!!
							var data1=mainjson.Event[i].Id;
							var temp=$(this).parent().parent().parent().prev();
							showdetail(temp.data1);
							$("#detail-textarea").focus();

						
					});
					$('.main-content-each:eq('+i+') .main-content-title').click(function(){
						var data1=mainjson.Event[i].Id;
						var temp=$(this);
						showdetail(temp,data1);
					})
					$('.main-content-each:eq('+i+') .share-icon').click(function(){
						$(this).addClass("share-click");
					});
					$('.main-content-each:eq('+i+') .share-icon').hover(function(){
						$(this).next().next().fadeIn();
					});
					$('.main-content-each:eq('+i+') .share-icon').mouseleave(function(){
						if(!$(this).hasClass("share-click"))
							$(this).next().next().fadeOut();
					});
					$('.main-content-each:eq('+i+') .share-addition').hide();
		
				}
	};


	function addnum(json){
		if(json.all!=""){
			$(".purple").prepend("<p class='num'>"+json.all+"</p>");
			$(".purple").prepend("<div class='icon'><img  src='/img/icon-color.png' alt='' /></div>");

		}
		if(json.lecture!=""){
			$(".red").prepend("<p class='num'>"+json.lecture+"</p>");
			$(".red").prepend("<div class='icon'><img  src='/img/icon.png' alt='' /></div>");

		}
		
		
	}

	function addaddition(json,i){ //add addition content
		if((json).hot=='1'){
			$('.main-content-each:eq('+i+') .main-content-img').prepend("<div class='hot'>HOT</div><img class='hot-corner' src='img/corner.png' />");
			
		}
		if((json).tag=='new'){
			$('.main-content-each:eq('+i+') .main-content-title').append("<div class='tag'>new</div>");
		}
		if((json).tag=='需报名'){
			$('.main-content-each:eq('+i+') .main-content-title').append("<div class='tag'>需报名</div>");
			$('.main-content-each:eq('+i+') .tag').css({"font-size":"10px","padding-top":"3px"});
		}
		if((json).tag=='已结束'){
			$('.main-content-each:eq('+i+') .main-content-title').append("<div class='end-tag'>已结束</div>");
		}
		if((json).timeleft){
				var temp=(json.timeleft);
				$('.days-left ul:eq('+i+')').append("<li><p>离报名截止还有<strong>"+temp.day+
				"</strong>日<strong>"+temp.hour+
				"</strong>时<strong>"+temp.min+
				"</strong>分</p></li>");
		}
		if(json.numleft){
			var temp=(json.numleft);
			$('.days-left ul:eq('+i+')').append("<li><p>还有<strong>"+temp+"</strong>个名额</p></li>");
		}
		$('.main-content-each:eq('+i+') .time').text(json.StartTime.split(/T/)[0]);
		if(json.Subtype==""){
			$('.main-content-each:eq('+i+') .subcategory').text("");
		}
	};

	

	function detailaddition(json,i){
		var string=json.time.split(/T/)[0].split(/-/)[1]+"月"+json.time.split(/T/)[0].split(/-/)[2]+"日"+json.time.split(/T/)[1].split(/:/)[0]
					+"时"+json.time.split(/T/)[1].split(/:/)[1]+"分";
		$(".reply-each:eq("+i+") .reply-time").append(string);
		if(json.personID==user.userID){
			$(".reply-each:eq("+i+") .detail-addition-icon").text("删除");
			$(".reply-each:eq("+i+") .detail-addition-icon").addClass("delete-icon");
		}		
		else
		{
			$(".reply-each:eq("+i+") .detail-addition-icon").text("回复");
			$(".reply-each:eq("+i+") .detail-addition-icon").addClass("reply-icon");
		}
	}


	function detailinit(){
		

		$("#detail-reply-icon").css("background-color","#913395");
		$("#detail-reply-icon").css("color","white");
		$("#detail-reply-icon").find(".detail-icon").css("color","white");
		$("#detail-reply-icon").addClass("stretch");
		$("#detail-share").hide();
	}

	function detailbind(){

		$("#detail-title,#back").click(function(){	//离开detail
				$("#top").removeClass("hide");
				$("#back").hide();
				$("#main-content-detail").remove();	
				$(".main-content-each").show();
				$("#more").show();
				$("#detail-title").removeClass("stretch");
				$(".main-content-title").bind("click",function(){	
						//进入detail!!!
						var data1 = $(this).attr("id");
						var temp=$(this);
						showdetail(temp,data1);
				

				});	
				$(".reply-icon").bind("click",function(){
					var temp=$(this).parent().parent().parent().prev();
					var data1=temp.attr("id");
					showdetail(temp,data1);
					$("#detail-textarea").focus();
				})
				
			
			});	


		if($(".reply-each").size()>2){
			$(".reply-each:gt(1)").css("display","none");
			$(".reply-each:eq(1)").after("<div id='reply-more'>...</div>");
			$("#reply-more").click(function(){
				$("#reply-more").slideUp();
				$("#reply-more").nextAll().slideDown();
			})
		}
		else{
			$("#reply-more").css("display","none");
		}
		$(".detail-icon-num").hover(function(){
			$(this).css("background-color","#913395");
			$(this).css("color","white");
			$(this).find(".detail-icon").css("color","white");
			
		});
		$(".detail-icon-num").mouseleave(function(){
			if(!$(this).hasClass("stretch")){
				$(this).css("background-color","white");
				$(this).css("color","#913395");
				$(this).find(".detail-icon").css("color","#913395");
			}
		});
		

		$("#detail-reply-icon").click(function(){
			if(!$(this).hasClass("stretch")){
				$("#detail-share").hide();
				$("#replybox-reply").show();
				$("#replybox-corner").animate({"background-position-x":"5.6%"});
			}
			
		})
		$("#detail-share-icon").click(function(){
			if(!$(this).hasClass("stretch")){
				$("#replybox-reply").hide();
				$("#detail-share").show();
				$("#replybox-corner").animate({"background-position-x":"22%"});
			}
			

		})
		$(".detail-icon-num").click(function(){
			
			$(".detail-icon-num.stretch").css("background-color","white");
			$(".detail-icon-num.stretch").css("color","#913394");
			$(".detail-icon-num.stretch").find(".detail-icon").css("color","#913394");
			$(".detail-icon-num.stretch").removeClass("stretch");
			$(this).addClass("stretch");

			$(this).css("background-color","#913395");
			$(this).css("color","white");
			$(this).find(".detail-icon").css("color","white");
		});
		$("#detail-response").click(function(){
			if($("#detail-textarea").val()!=""){
				var num=Number($("#detail-reply-icon span").text())+1;
				$("#detail-reply-icon span").text(num);
				$("#detail-response").after(replyeach);
				$(".reply-each:eq(0) .reply-content").empty();
				$(".reply-each:eq(0) .reply-content").append($("#detail-textarea").val());
				$(".reply-each:eq(0) .detail-addition-icon").removeClass("reply-icon");
				$(".reply-each:eq(0) .detail-addition-icon").addClass("delete-icon");
				$(".reply-each:eq(0) .detail-addition-icon").text("删除");
				             var today = new Date();
	                                             var weekday=new Array(7)
	                                                weekday[0]="星期一"
	                                                weekday[1]="星期二"
	                                                weekday[2]="星期三"
	                                                weekday[3]="星期四"
	                                                weekday[4]="星期五"
	                                                weekday[5]="星期六"
	                                                weekday[6]="星期日"                                        
	                                                var y=today.getFullYear()+"年";
	                                                var month=today.getMonth()+"月";
	                                                var td=today.getDate()+"日";
	                                                var d=weekday[today.getDay()];
	                                                var h=today.getHours()+"时";
	                                                var m=today.getMinutes()+"分";
	                                                var s=today.getSeconds();
	           	var time=month+td+h+m; 
	            $(".reply-time:eq(0)").text(time);
				$(".reply-each:eq(0)").hide();
				$(".reply-each:eq(0)").slideDown();
				$("#detail-textarea").val("");
				$(".reply-each:eq(0) .reply-person").text(user.Name);
				detaileachbind();
			}
		})

	}

	function detaileachbind(){
		$(".reply-each .reply-icon").click(function(){	//回复
			var index=$(".detail-addition-icon").index(this);
			var content= "回复"+$(".reply-each:eq("+index+") .reply-person").text()+":";
			$("#detail-textarea").focus();
			$("#detail-textarea").val(content);
		})
		$(".reply-each .delete-icon").click(function(){	//删除
			var index=$(".detail-addition-icon").index(this);
			$(".reply-each:eq("+index+")").slideUp("normal",function(){$(".reply-each:eq("+index+")").remove();});
			
			
		})
	}



	function tagbind(){
		$(".click-box").click(function(){
			if($(this).hasClass("choose"))
				$(this).removeClass("choose");
			else
				$(this).addClass("choose");

		}


		)

		$("#join-time-confirm").click(function(){
			var num=$(".click-box").size();
			var i;
			for(i=0;i<num;i++){
				var a =$(".click-box:eq("+i+")");
				if(a.hasClass("choose")){
					choosenum=(a.index())/2+1;
					a.removeClass("choose");
				}
			}
			uncover();
		})
		$(".join-time-sbutton").bind("click",function(){
			uncover();
		})

	}
	function clearcontent(){
		$("#main-content").empty();
	}
	
	function bind(){//一些状态变化
		$(".nav-icon").hover(function(){
			$(this).find(".chi").addClass("nav-chi-hover");
			$(this).find(".eng").addClass("nav-eng-hover")
		});
		$(".nav-icon").mouseleave(function(){
			$(this).find(".chi").removeClass("nav-chi-hover");
			$(this).find(".eng").removeClass("nav-eng-hover")
		});
		$(".purple").addClass("stretch");
		$("#main-content-detail").hide();
		$("#join-time").hide();	//遮罩层
		$("#join-time-wrap").hide();	//弹出框
		$('.addition').hide();
		$("#banner-user").hide();
		$("#user-content").hide();

		$("#more").click(function(){
			updatejson();
		})

		$('.more').click(function(){	//左侧边栏展开 更换内容

			clearcontent();
			lastnum=0;
			$(".li-wrap.stretch").removeClass("stretch");
			if($(this).hasClass('stretch')){
				if(!$(this).hasClass('yellow')&&!$(this).hasClass('other'))
				{
					$(this).next().slideUp(300);
					$(this).removeClass("stretch");
				}
			}
			else
			{
				var index=($(this).index()-1)/2;
				$(this).next().slideDown(300);
				$('.more.stretch').next().slideUp(300);
				$('.more.stretch').removeClass("stretch");
				$('.purple.stretch').removeClass("stretch");
				$(this).addClass("stretch");
				
			}
			updatejson();	
				
		});
		$('.purple').click(function(){
			if($(this).hasClass("stretch"))
				;
			else{
				$(this).addClass("stretch");
				$('.more.stretch').next().slideToggle(300);
				$('.more.stretch').removeClass("stretch");
			}
			updatejson();
		});
		$('.li-wrap').click(function(){
				$(".li-wrap.stretch").removeClass("stretch");
				$(this).addClass("stretch");
				updatejson();
		});
		
		
		
		//顶部横向菜单选定
		$('.td-normal').hover(function(){
			$('.td-normal-hover').removeClass("td-normal-hover");
			$('.td-normal-click').addClass("td-normal-click");
			$(this).addClass("td-normal-hover");
		});
		$('.td-normal').click(function(){
			$('.td-normal-click').removeClass("td-normal-click");
			$(this).addClass("td-normal-click");
			
		});
		$("#banner-normal .td-normal").click(function(){
			updatejson();
		})
		$('.td-normal').mouseleave(function(){
			$('.td-normal-hover').removeClass("td-normal-hover");
			$('.td-normal-click').addClass("td-normal-click");
			
		});
		$('#top').hide();
		$("#back").hide();
		$(window).scroll(function(){
			 min_height=window.screen.availHeight ;
			 var s = $(window).scrollTop();
			 if( s > 0){
			 	if(!$("#top").hasClass("hide"))
					$('#top').fadeIn(100);
			}else{
				$('#top').fadeOut(200);
			};
		});
		//top按钮控制
		$('#top').hover(function(){
			num=$('.stretch').index();
			if(num!=-1)
				num=(num+1)/2;
			if(num==-1||num==1/2)
			{
				$(this).css("background-color","#bc86be");
				$(this).css("color","white");
			}
			if(num==1)
			{
				$(this).css("background-color","#ef6291");
				$(this).css("color","white");
			}
			if(num==2)
			{
				$(this).css("background-color","#f58857");
				$(this).css("color","white");
			}
			if(num==3)
			{
				$(this).css("background-color","#e2a85d");
				$(this).css("color","white");
			}
			if(num==4)
			{
				$(this).css("background-color","#7fd3a4");
				$(this).css("color","white");
			}
			if(num==5)
			{
				$(this).css("background-color","#52e4e6");
				$(this).css("color","white");
			}
			if(num==6)
			{
				$(this).css("background-color","#8aa5db");
				$(this).css("color","white");
			}
		});
		$("#top").mouseleave(function(){
			$(this).css("background-color","#e6e6e6");
			$(this).css("color","#b2b2b2");
		});
		$('#top').click(function(){
			$('html,body').animate({scrollTop:0},300);
			
		});
	

		
	};

	
	var changedetailstyle = function(json){
				var style1=new style(json);
				color=style1.color;
				cat=style1.cat;
				if(json!=""){	//改变色系
					$('#detail-title .category').css("color",color);
					$('#detail-title .subcategory').css("color",color);
					$('#detail-icon .love-icon').hover(function(){
						if(!$(this).hasClass("love-select"))
						$(this).css("background-image","url('img/love-"+cat+".png')");				
					});
					$('#detail-icon .love-icon').mouseleave(function(){
						if(!$(this).hasClass("love-select")){
							$(this).css("background-image","url('img/love.png')")
						}
					});
					$('#detail-icon .love-icon').click(function(){
						if(!$(this).hasClass("love-select")){
							$(this).addClass("love-select");
							$(this).css("background-image","url('img/love-"+cat+"-selected.png')");
							num=Number($(this).next().text())+1;
							$(this).next().text(num);
						}
						else
						{
							$(this).removeClass("love-select");
							$(this).css("background-image","url('img/love-"+cat+".png')");
							num=Number($(this).next().text())-1;
							$(this).next().text(num);
						}			
					});
					$('#detail-icon .pin-icon').hover(function(){
						if(!$(this).hasClass("pin-select"))
						$(this).css("background-image","url('img/pin-"+cat+".png')")	
					});	
					$('#detail-icon .pin-icon').mouseleave(function(){
						if(!$(this).hasClass("pin-select"))
						$(this).css("background-image","url('img/pin.png')")
						
					});
					$('#detail-icon .pin-icon').click(function(){
						if(!$(this).hasClass("pin-select")){
							$(this).addClass("pin-select");
							$(this).css("background-image","url('img/pin-"+cat+"-selected.png')");
							num=Number($(this).next().text())+1;
							$(this).next().text(num);
							timechoose();
						}
						else{
							$(this).css("background-image","url('img/pin-"+cat+".png')");
							$(this).removeClass("pin-select");	
							num=Number($(this).next().text())-1;
							$(this).next().text(num);		
						}
					});
					$('#main-content-detail strong').css("color",color);
					$('#top').addClass("hide");
					$("#top").hide();
					$("#back").show();
					$("#back").hover(function(){
						if(cat=="all")
						{
							$(this).css("background-color","#bc86be");
							$(this).css("color","white");
						}
						if(cat=="lec")
						{
							$(this).css("background-color","#ef6291");
							$(this).css("color","white");
						}
						if(cat=="per")
						{
							$(this).css("background-color","#f58857");
							$(this).css("color","white");
						}
						if(cat=="out")
						{
							$(this).css("background-color","#e2a85d");
							$(this).css("color","white");
						}
						if(cat=="con")
						{
							$(this).css("background-color","#7fd3a4");
							$(this).css("color","white");
						}
						if(cat=="onl")
						{
							$(this).css("background-color","#52e4e6");
							$(this).css("color","white");
						}
						if(cat=="oth")
						{
							$(this).css("background-color","#8aa5db");
							$(this).css("color","white");
						}
					})
					$("#back").mouseleave(function(){
						$(this).css("background-color","#e6e6e6");
						$(this).css("color","#b2b2b2");
					})



				}
	}


	function nav(query,text,maxindex){
		if(!parseInt(text))
			{
				var i;
				if($(query+" .user-navbar-more").text())
				{
					var a=$(query+" .user-right-arrow").prev().prev();
				}
				else{
					var a=$(query+" .user-right-arrow").prev();
				}

				var index=parseInt(a.text());
				var high=Math.min(index+2,maxindex);
				for(i=index+1;i<=high;i++)
				{
					$(query+" .user-right-arrow").prev().prev().after("<div class='user-navbar-num'></div>");
					$(query+" .user-right-arrow").prev().prev().text(i);
				}
				if(high==maxindex){
					$(query+" .user-navbar-more").remove();
				}
				var margin=1/2*(683-$(query+" .user-navbar").width());
				$(query+" .user-navbar").css("margin-left",margin);
			}
	}

	userbind=function(){	//user界面事件绑定
		$("#banner-normal").hide();
		$("#banner-user").show();
		$("#user-content").show();
		$("#attend-button").click(function(){
			$("#user-content").children().hide();
			$("#user-to-attend-wrap").show();
			$("#user-ended-wrap").show();
		})
		$("#interest-button").click(function(){
			$("#user-content").children().hide();
			$("#user-interest-wrap").show();
			$("#user-interest-ended-wrap").show();
		})
		$("#raise-button").click(function(){
			$("#user-content").children().hide();
			$("#user-raise-wrap").show();
			$("#user-raise-ended-wrap").show();
		})
		
	}

	function drawnav(query,maxindex,eachnum){
		high=Math.min(maxindex,5);
		for(i=2;i<=high;i++)
		{
			$(query+" .user-right-arrow").before("<div class='user-navbar-num'></div>");
			$(query+" .user-right-arrow").prev().text(i);
		}
		if(maxindex>5){
			$(query+" .user-right-arrow").prev().after("<div class='user-navbar-more'>...</div>");
		}
		var margin=1/2*(683-$(query+" .user-navbar").width());
		$(query+" .user-navbar").css("margin-left",margin);
		$(query+" .user-navbar-num").on("click",function(){
			$(query+" .user-navbar-num-click").removeClass("user-navbar-num-click");
			$(this).addClass("user-navbar-num-click");
			var num=parseInt($(this).text());
			for(i=0;i<(num-1)*eachnum;i++){
				$(query+ " .user-event-each:eq("+i+")").hide();
			}
			for(i=(num-1)*eachnum;i<num*eachnum;i++){
				$(query+"  .user-event-each:eq("+i+")").show();
			}
			var text=$(this).next().text();
			nav(query,text,maxindex);
			
		});
		$(query+" .user-right-arrow").click(function(){
			var a=$(query+" .user-navbar-num-click").next();
			var text=$(query+" .user-navbar-num-click").next().next().text();
			if(a.text()){
				$(query+" .user-navbar-num-click").removeClass("user-navbar-num-click");
				a.addClass("user-navbar-num-click");
				var num=parseInt(a.text());
				for(i=0;i<(num-1)*eachnum;i++){
					$(query+" .user-event-each:eq("+i+")").hide();
				}
				nav(query,text,maxindex);
			}
		});
		$(query+" .user-left-arrow").click(function(){
			var a=$(query+" .user-navbar-num-click").prev();
			if(a.text()){
				$(query+" .user-navbar-num-click").removeClass("user-navbar-num-click");
				a.addClass("user-navbar-num-click");
				var num=parseInt(a.text());
				for(i=(num-1)*eachnum;i<num*eachnum;i++){
					$(query+" .user-event-each:eq("+i+")").show();
				}
			}
		});
		
	}


	userinit=function(){
	
		$("#user-content").children().hide();
		$("#user-to-attend-wrap").show();
		$("#user-ended-wrap").show();	

	}
	function cover(content){	//添加遮罩层和框
		$("#join-time-wrap").show();
		$("#join-time").show();
		height=$("#total-wrap").css("height");
		$("#join-time").css("height",height);
		$("#join-time-content").append(content);
		height=$("#join-time-content").height()+100+"px";
		$("#join-time-bg").css("height",height);
		$("#join-time-bg").css("width","400px");
	}
	function uncover(){	//删除遮罩层和框
		$("#join-time").hide();
		$("#join-time-wrap").hide();
		$("#join-time-content").empty();//具体内容删除
		$("#join-time-content").css("background-image","none");
		$("#join-time-confirm-wrap").empty();
	}

	function picstyle(content){	//报错消息
		cover(content);
		$("#join-time-content").css("background-image","url('/img/face.png')");
		$("#join-time-confirm-wrap").append("<div id='join-time-confirm' class='join-time-confirm-style'></div>");
		$("#join-time-confirm").append("<p>知道了</p>");
		tagbind();
	}
	function picstyle2(content){
		cover(content);
		$("#join-time-content").css("background-image","url('/img/face.png')");
		$("#join-time-confirm-wrap").append(confirm2);
		tagbind();
	}

	function alertlogin(){		//登陆未
		picstyle2(needtologin);

	}
	function psw(){		//图片格式错误
		picstyle(picstylewrong);
	}
	function ptb(){	//图片太大
		picstyle(pictoobig)
	}

	function timechoose(){	//时间选择
		cover(jointime);
		$("#join-time-confirm-wrap").append("<div id='join-time-confirm' class='join-time-confirm-style'></div>");
		$("#join-time-confirm").append("<p>确定</p>");
		tagbind();
	}

	function interpolate(tmpl, obj) {	//模版填充函数
		return tmpl.replace(/\$\{([\w\-]+?)\}/g, function (match, content) {
			return obj[content] || match;
		});
	};

	preloadimages();	//预载入图片
	loadtemplate();	//载入模版
	loaddetailtemplate();
	bind();				//绑定事件
	//userbind();
	updatejson();	//放入内容
	//updateuser();
	//$("#more").hide();


	
});

