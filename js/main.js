/**
	lovetag,pintag,logintag,phototag 用来作为一些ajax传递参数的全局变量
	imageload作为相册的输入
	page为当前页数
	userpage为user页面的当前页数
	search为搜索字段
	usercat为user页面的三个子页面
	imagearguments为预载入
	updateuserinfo()登陆
	style(),changepinstyle(),changelovestyle(),changecategory()变换颜色类别
	updatejson()放置main-content内容	(包括了init, bind ,show等函数)
	updatedetail()放置detail内容
	updateuser()放置user内容
	showdetail()显示detail内容
	detaileachbind()评论内容
	prepareshare()分享内容
	addcoration()添加下划线
	openalbum(),closealbum()相册页面
	nav(),drawnav()，user页面导航条
	cover(),uncover()遮罩层
	picstyle(),picstyle2(),ptb(picture too big),psw(picture style wrong),alertlogin() 一些弹出报错框
	interpolate()模板填充函数

	coded by danny ShanYu 
**/
$(document).ready(function(){
	var lovetag=0;
	var pintag=0;
	var logintag=0;
	var phototag=0;
	var imageload;
	var page=0;
	var search=null;
	var userpage=0;
	var usercat;
	var userinit1=0;
	var pictag=0;
	var imagearguments=["live","live-hover","back-hover","douban-hover","renren-hover","leftside-toppic1","leftside-toppic2","logout-hover","love-con","love-con-selected","love-grey-selected","love-lec","love-lec-selected","love-onl","love-onl-selected","love-oth","love-oth-selected","love-out","love-out-selected","love-per","love-per-selected","pin-con","pin-con-selected","pin-grey-selected","pin-lec","pin-lec-selected","pin-onl","pin-onl-selected","love-oth","pin-oth-selected","pin-out","pin-out-selected","pin-per","pin-per-selected","renren-hover","sina-hover","tencent-hover","top-hover"];
	function preloadimages(){

		for (i=0;i<imagearguments.length;i++){
			myimages[i]=new Image();
			myimages[i].src='http://stu.fudan.edu.cn/event/img/'+imagearguments[i]+".png";
		}
	};
	var usertype=function(){
		var userID;
		var Name;
	}
	var geturlid=function(){
		var URL=document.URL; 
		var arraytemp=new Array();
		arraytemp=URL.split("?");
		return arraytemp[1];
	}
	var user=new usertype();
	var org=false;
	var updateuserinfo=function(){
		$("#login-addition-box").removeClass("stretch");
		$.ajax({		//查询用户信息
			url:'http://stu.fudan.edu.cn/event/UserInfo.aspx',  	
			type:'get',
			dataType:'json',
			error: function(){	//查询用户信息失败
				loginfail();
				

			},
			success:function(json){	//有返回值
				json=json.User;
				if(getCookie(".ASPXAUTH")!=null&&json.Nickname!=null){	//成功
					user.userID=json.uid;
					user.Name=json.Nickname;
					if(json.IsOrg=="true"){	//组织账号
						org=true;
						if($("#exitorg").size()==0){
							$("#login-addition-box ul").append("<li id='exitorg'>切换组织</li>");
						}
						$("#exitorg").click(function(){
							$.ajax({
								url: "http://stu.fudan.edu.cn/event/Set_Org_Status.aspx",
								contentType: "application/json;charset=utf-8",
								type: 'get',
								async: false
							}).done(function() {
								updateuserinfo();
							}).fail(function(){
				
							})
						})
					}
					else{
						$("#exitorg").remove();
					}
					$("#username").html(user.Name);
					$("#username").show();
					$("#login").hide();
					$("#register").hide();
					$("#login-addition-box").hide();
				}
				else{	//过期
					
					if(getCookie('webpy_session_id')!=null){	//尝试继续登录
						$('#login').trigger("click");
					}
					else
						loginfail();
				}
			},
			async:false
		});
		function loginfail(){
			//alert(1);
			$("#username").parent().hide();
			$("#personal-activity").parent().hide();
			$("#login-addition-box").hide();
		}
		$.ajax({		//查询用户信息
			url:'http://stu.fudan.edu.cn/event/ViewUserOrg.aspx',  	
			type:'get',
			dataType:'json',
			async:false,
			success:function(json){
				
				json=json.OrgName;
				var i;
				$('.orgaccount').remove();
				if(json){
					for(i=0;i<json.length;i++){
						if(json[i]!=$("#username").html()&&org==true)
							$("#login-addition-box ul").append("<li class='orgaccount'>"+json[i]+"</li>");
						if(org==false)
							$("#login-addition-box ul").append("<li class='orgaccount'>"+json[i]+"</li>");
					}
				}	
				$(".orgaccount").each(function(i,obj){
					
					if($(obj).html()==$("#username").text()){
						$(obj).remove();
					}
				})
	
			},
			fail:function(){
	
			}
		});
	}
	updateuserinfo();
	
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
	var cancelsignup="<div id='picstyle-wrong'><p>真的不去了吗？</p><p>你的报名信息将会被删除</p></div>";
	var confirm2="<div class='join-time-sbutton join-time-confirm-style' id='loginnow'>现在登录</div><div class='join-time-sbutton join-time-confirm-style' id='later'>随便逛逛</div>";
	var replyeach="<div class='reply-each' name=${cid}><ul><li>"
												+"<div class='reply-person'>${name}</div><div class='reply-time'></div>"
											+"</li><li>"
											+	"<div class='reply-content'>${content}</div><a class='detail-addition-icon' ></a>"
											+"</li></ul></div>"

	var eventusereach="<div class='user-event-each' id=${Id}><div class='user-event-img'><img src=${pic} alt='' /></div>"+
							"<ul><li class='intro' id='user-event-title'>${Title}</li>"+
								"<li><span class='intro'>时间</span><span class='user-event-time'>${StartTime}</span></li>"+
								"<li class='location-wrap'><span class='intro'>地点</span><span class='user-event-location'>${Location}</span></li>"+
							"<li class='moreop'></li></ul></div>";
	var selectoutput="<div id='picstyle-wrong'><ul id='selectoutput'><li class='selectoutput-each'><div class='clickbox click click-box-round' id='xml'></div><div class='output-intro'>导出报名详情</div></li><li class='selectoutput-each'><div class='clickbox click-box-round' id='csv'></div><div class='output-intro'>导出飞信格式</div></li></ul></div>";
	
	function getCookie(c_name){
		if(document.cookie.length>0){
		   c_start=document.cookie.indexOf(c_name + "=")
		   if(c_start!=-1){ 
		     c_start=c_start + c_name.length+1 
		     c_end=document.cookie.indexOf(";",c_start)
		     if(c_end==-1) c_end=document.cookie.length
		     return unescape(document.cookie.substring(c_start,c_end))
		   }
		}
		return ""
	}
	function data(){
		this.cat="";
		this.subcat="";
		this.timeoffset=0;
		this.page;
		this.perpage;
		this.d;
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
					//$(".main-content-each:eq("+i+") .intro:eq(0)").text("主讲");
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
	function changepinstyle(obj,cat){
		if(!obj.hasClass("pin-select")){
			obj.addClass("pin-select");
			obj.css("background-image","url('img/pin-"+cat+"-selected.png')");
			num=Number(obj.next().text())+1;
			obj.next().text(num);
		}
		else
		{
			obj.removeClass("pin-select");
			obj.css("background-image","url('img/pin.png')");
			num=Number(obj.next().text())-1;
			obj.next().text(num);
		}
	}
	function changelovestyle(obj,cat){
		if(!obj.hasClass("love-select")){
			obj.addClass("love-select");
			obj.css("background-image","url('img/love-"+cat+"-selected.png')");
			num=Number(obj.next().text())+1;
			obj.next().text(num);
		}
		else
		{
			obj.removeClass("love-select");
			obj.css("background-image","url('img/love.png')");
			num=Number(obj.next().text())-1;
			obj.next().text(num);
		}
	}
		
	
	var template;
	var detailtemplate;
	function loadtemplate(){
		template=$("#template").html();	
	}
	
	function loaddetailtemplate(){
		$.ajax({	
			url:'xml/detail.html',
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
		if(a=="全部")
			return 4;
	}

	function updatejson(temppage,searchtemp){	//add main content
		var URL=document.URL; 
		var arraytemp=new Array();
		arraytemp=URL.split("?");
		if(arraytemp[1]!=""&&arraytemp[1])
		{
			window.open("http://stu.fudan.edu.cn/event/main.html");
		}
		else{
			if(!temppage){
				page=0;
				temppage=0;
				lastnum=0;
			}
	
			
			var style=new changecategory($(".more.stretch"));
			var data1=new data();
			data1.perpage=5;
			data1.page=temppage;
			if($("#td-short").hasClass("td-normal-click")){
				data1.d=$("#datepicker-header input").val();
				
			}
			if(style.cat&&style.cat!="")
				data1.cat=style.cat;
			if($(".td-normal-click").text()&&$(".td-normal-click").text()!="")
			{
				if(timealter(caltime($(".td-normal-click").text())))
					data1.timeoffset=timealter(caltime($(".td-normal-click").text()));
			}
			if($(".li-wrap.stretch p:eq(1)").html()&&data1.cat!="")
				data1.subcat=$(".li-wrap.stretch p:eq(1)").html();
			if(data1.page==0)
				$("#main-content").empty();
			if(searchtemp!=null){
				urltemp="http://stu.fudan.edu.cn/event/Search.aspx";
				var datatemp=function(){
					this.q;
					this.page=0;
				}
				var data1=new datatemp();
				data1.q=searchtemp;
				data1.page=temppage;
			}
			else{
				urltemp="http://stu.fudan.edu.cn/event/Event_data.aspx";
				search=null;
			}	
			$.ajax({
	
				url : urltemp,
				data:data1,
				dataType : 'json',
				type : 'get',
				async:false
			}).done(function(json){
				mainjson=json.allevents;
				json=json.allevents;
	
				if (json && json.success == 1) {
					//addnum(json.num);
					if(json.Event.length<5){
						$("#more").hide();
					}
					var n=json.Event.length;
					var i;
					for (i = 0;i < n;i++) {
						//alert(i);
						if(json.Event[i]){
							$('#main-content').append(interpolate(template,json.Event[i]));
							addaddition(json.Event[i],i+lastnum);
							changestyle(json.Event[i].Type,i+lastnum);	//改变色系
							$(".main-content-each:eq("+parseInt(i+lastnum)+")").hide();
							
						}
						$(".main-content-each:eq(0)").css("padding-top","0px");
					}

					var fadeineach=function(i){
						if(i<n+lastnum){
							$(".main-content-each:eq("+i+")").fadeIn();
							setTimeout(function(){
								fadeineach(i+1)
							},200);
						}
					}
					fadeineach(lastnum);
					lastnum=lastnum+n;
					$("#more").show();
					
				} else {
					$("#more").hide();
				}	
				if($(".main-content-each").size()>0)
				{
					$("#no-content-alert").hide();
				}
				else{
					$("#no-content-alert").show();
				}
			}).fail(function () {
				alert("似乎没有内容呢，请再试一次吧~~");
			});	
		}
		$(".reply-num").html("");
		$(".share-num").html("");					//temp 回应分享数去掉
	};
	function updatedetail(dataobject){	//add detail content
		var datatemp=function(){
			this.id=dataobject;
		}
		var data1=new datatemp;
		$.ajax({
			url:"http://stu.fudan.edu.cn/event/Event_Detail.aspx",
			data:data1,
			dataType: 'json',
			type: "get",
			async:false
		}).done(function(json){
			json=json.Eventdetail;
			if(json && json.success==1){
				string=interpolate(detailtemplate,json);	//放入detial.js中的信息
				$("#main-content-detail").remove();
				$("#more").hide();
				$("#main-content").append(string);
				if($("#detail-title .subcategory").text()=="【${Subtype}】"){
					$("#detail-title .subcategory").text(' ');
					$("#detail-title .category").css("margin-right","0px");
				};	
				type=json.Type;
				changedetailstyle(type);
				if(json.Context)
					$("#detail-content .context").html(json.Context.replace(/\n/g,"<br />"));
				if(json.speakerinf)
					$("#detail-content .speaker-inf").html(json.speakerinf.replace(/\n/g,"<br />"));
				if(json.Location==null||json.Location==" "){
					$("#location-wrap").empty();
				}
				if(json.brand==null||json.brand==" "||json.brand=="无"){
					$("#brand-wrap").empty();
				}
				if(json.series==null){
					$("#series-wrap").hide();
				}
				
				if(json.speakerinf==null){
					$("#speaker-inf-wrap").hide();
				}
				if(json.Album){
					imageload=json.Album;
					album(imageload);
					var stringtemp="（"+imageload.length+"张）"
					$("#photo-num").text(stringtemp);
				}
				else{
					$("#album-display").hide();
					$("#album-top p").hide();
					//alert($("#album-top #upload-pic").css("float"));
					$("#album-top .upload-pic").css({"float":"left"});
				}
				var style1=new style(type);
				color=style1.color;
				cat=style1.cat;
				if(json.Subtitle==null){
					$("#detail-right .subtitle").hide();
				}
				if(json.liked=="true"){
					$("#detail-icon .love-icon").addClass("love-select");
					$("#detail-icon .love-icon").css("background-image","url('img/love-"+cat+"-selected.png')");
		
				}
				if(json.subscribed=="true"){
					$("#detail-icon .pin-icon").addClass("pin-select");
					$("#detail-icon .pin-icon").css("background-image","url('img/pin-"+cat+"-selected.png')");
				}
				if(json.responses){
					for(i=0; i<json.responses.length;i++){
						$("#replybox-reply").append(interpolate(replyeach,json.responses[i]));
						detailaddition(json.responses[i],i);
					}
				}
				if(json.Speakers){

					for(j=0;j<json.Speakers.length;j++){
						$('#detail-content .speaker').append("<span class='speaker-each clearfix'><span class='speaker-name'></span><span class='speaker-title'></span></span>");
						$('#detail-content .speaker .speaker-each:eq('+j+') .speaker-name').html(json.Speakers[j].Name);
						$('#detail-content .speaker .speaker-each:eq('+j+') .speaker-title').html(json.Speakers[j].Class);
					}
				}
				else{
					$("#detail-content .detail-speaker").hide();
				}
				if(json.Publishers){

					for(j=0;j<json.Publishers.length;j++){
						$('#detail-content .raiser').append("<span class='raiser-each'><span class='raiser-name'></span></span>");
						$('#detail-content .raiser .raiser-each:eq('+j+') .raiser-name').html(json.Publishers[j]);

					}
				}
				else{
					$("#detail-content .detail-speaker").hide();
				}
				if(json.Type="讲座")
				{

				}
				if((json).timeleft2){
					var temp=(json.timeleft2);
					if(temp.min<0||temp.hour<0||temp.day<0)
					{
						$('#detail-title').append("<div class='end-tag'>已结束</div>");
						$('#detail-title .sub.tag').remove();
					}
				}
				if((json).NeedSubscribe=='true'&&$('#detail-title').find(".end-tag").size()==0){
					$('#detail-title').append("<div class='tag sub'>需报名</div>");
					$("#detail-title .tag.sub").hide();
				}
				$("#detail-time .StartTime").text(converttime($("#detail-time .StartTime").text()));
				$("#detail-time .EndTime").text(converttime($("#detail-time .EndTime").text()));
				$("#album-title").text(json.Title);
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
		}).fail(function(){
			alert("似乎网络出现了一点问题，请检查~~");
		});
		function cp(mainjson,string){	//放入main.js中的信息
			string=interpolate(string,mainjson.Event[i]);
			return string;	
		}
		
	}

	function showdetail(data1){
		loaddetailtemplate();
		$(".main-content-each").hide();
		updatedetail(data1);	//放入内容
		detailinit();
		detailbind();
		detaileachbind();
		$("#main-content-detail").show();
		


	}
	
	function addusercontent(cat,query,eachnum,length,page){

		var num=parseInt((length-1)/eachnum)+1;
		var string=query+"-wrap";
		if(userinit1==0){
			//$(".user-navbar-num").remove();
			var length=(length-1)/eachnum+1;
			//alert(query+"-wrap .user-navbar .user-navbar-num");
			if($(query+"-wrap .user-navbar .user-navbar-num")[1]==null){
				drawnav(string,length,eachnum);
				var temp=($(string+" .user-navbar .user-navbar-num").size());
				var margin=1/2*(683-(38+22*temp));
				$(string+" .user-navbar").css("margin-left",margin-40);
			}
			userinit1=1;
		}
		var i;
		$(query).empty();
		if(cat!=null){
			for(i=0;i<cat.length;i++){
				//alert(query);
				if(cat[i])
				{	
					var string=interpolate(eventusereach,cat[i]);
					
					$(query).append(string);
					$(query+" .user-event-each:eq("+i+") .user-event-time").html(cat[i].StartTime.split(/T/)[0]+"  "+cat[i].StartTime.split(/T/)[1].split(":")[0]+":"+cat[i].StartTime.split(/T/)[1].split(":")[1]);
					$(query+" .user-event-each:last").click(function(){
						window.open("http://stu.fudan.edu.cn/event/main.html?"+$(this).attr("id"));
					})
					$(query+" .user-event-each:eq("+i+") ul li.moreop").hover(function(){
						$(this).parent().parent().unbind("click");
					},function(){
						$(this).parent().parent().click(function(){
							window.open("http://stu.fudan.edu.cn/event/main.html?"+$(this).attr("id"));
						})
					})
					
					if(query=="#user-to-attend"){	//我要参加
						
						$(query+" .user-event-each:eq("+i+") ul li.moreop").append("<div class='out'>我不去了</div>");
						$(query+" .user-event-each:eq("+i+") ul li.moreop .out").click(function(){
							$(this).addClass("prepare");
							picstyle2(cancelsignup);
							$("#loginnow").html("再想想");
							$("#later").html("确认");
							$("#loginnow").unbind("click");
							$("#later").unbind("click");
							$("#loginnow").click(function(){
								uncover();
								$(".out.prepare").removeClass("prepare");
							})
							$("#later").click(function(){
								var datatemp=function(){
									this.id;
								}
								var data1=new datatemp();
								data1.id=$(".out.prepare").parent().parent().parent().attr("id");
								$.ajax({
									url:"http://stu.fudan.edu.cn/event/Unsubscribe.aspx",
									data:data1,
									type: 'get',
									async:false
								}).done(function(json){
									if(json==1||json=="1"){
										pintag=1;
									}
								})
							
								if(pintag==1){
									if($("#user-content").attr("from")==1){	//from main
										$(".main-content-each").each(function(i,obj){
											if($(obj).find(".main-content-title").attr("id")==data1.id){
												var newstyle=new style($(obj).find(".category").text().replace("【","").replace("】",""));
												var cattemp=newstyle.cat;
												changepinstyle($(obj).find(".pin-icon"),cattemp);
												
											}
										})
									}
									if($("#user-content").attr("from")==2||$("#user-content").attr("from")==3){//from detail
										var URL=document.URL; 
										var arraytemp=new Array();
										arraytemp=URL.split("?");
										if(data1.id==parseInt(arraytemp[1])){
											var newstyle=new style($("#main-content-detail").find(".category").text().replace("【","").replace("】",""));
											var cattemp=newstyle.cat;
											changepinstyle($("#main-content-detail").find(".pin-icon"),cattemp);
										}
									}
									$(".out.prepare").parent().parent().parent().remove();
									pintag=0;
									$(".out.prepare").removeClass("prepare");
									uncover();
								
								}
							});
						})
						$(query+" .user-event-each:eq("+i+") ul li.moreop").hide();
						$(query+" .user-event-each:eq("+i+")").hover(function(){
	
							$(this).find(".moreop").fadeIn();
						},function(){
							$(this).find(".moreop").fadeOut();
						});
					}
					if(query=="#user-interest"){	//我感兴趣
						$(query+" .user-event-each:eq("+i+") ul li.moreop").append("<div class='in'>我要参加</div><div class='out'>我不去了</div>");
						if(cat[i].subscribed=="true"){
							$(query+" .user-event-each:eq("+i+") ul li.moreop .in").remove();
						}
						else{
							$(query+" .user-event-each:eq("+i+") ul li.moreop .in").attr("needsub",cat[i].NeedSubscribe);
						}
						$(query+" .user-event-each:eq("+i+") ul li.moreop .in").click(function(){
							lovetag=0;
							var idtemp=$(this).parent().parent().parent().attr("id");
							if($("#user-content").attr("from")=="2"||$("#user-content").attr("from")=="3"){
								if($("#main-content-detail").attr("name")==idtemp){
									$("#detail-icon .pin-icon").trigger("click");
									lovetag=1;
								}
								else{
									if($(this).attr("needsub")=="false"){
										var datatemp=function(){
											this.id;
										}
										var data1=new datatemp();
										data1.id=idtemp;
										$.ajax({
											url: "http://stu.fudan.edu.cn/event/Subscribe.aspx",
											data: JSON.stringify(data1),
											contentType: "application/json;charset=utf-8",
											type: 'get',
											async: true
										}).done(function(json) {
											lovetag=1;
										});
									}
									else{
										lovetag=1;
										window.open("http://stu.fudan.edu.cn/event/signup.html?"+idtemp);
									}
								}
							}
							if($("#user-content").attr("from")=="1"){
								
								var find=false;
								$(".main-content-each").each(function(i,obj){
									if($(obj).find(".main-content-title").attr("id")==idtemp){
										$(obj).find(".pin-icon").trigger("click");
										find=true;
										lovetag=1;
									}
								})
								if(find==false){
									if($(this).attr("needsub")=="false"){
										var datatemp=function(){
											this.id;
										}
										var data1=new datatemp();
										data1.id=idtemp;
										$.ajax({
											url: "http://stu.fudan.edu.cn/event/Subscribe.aspx",
											data: JSON.stringify(data1),
											contentType: "application/json;charset=utf-8",
											type: 'get',
											async: true
										}).done(function(json) {
											lovetag=1;
										});
									}
									else{
										lovetag=1;
										window.open("http://stu.fudan.edu.cn/event/signup.html?"+idtemp);
									}
								}
							}
							if(lovetag==1){
								$(this).remove();
							}
						})
						$(query+" .user-event-each:eq("+i+") ul li.moreop .out").click(function(){	
							
							var datatemp=function(){
								this.id;
							}
							var data1=new datatemp();
							data1.id=$(this).parent().parent().parent().attr("id");
							var tag=0;
							$.ajax({
								url:"http://stu.fudan.edu.cn/event/like.aspx",
								data:data1,
								type : 'get',
								async:false
							}).done(function(success){
								if(success==1){
									lovetag=1;
									uncover();
								}
							})
							
							if(lovetag==1){

								if($("#user-content").attr("from")==1){	//from main
									$(".main-content-each").each(function(i,obj){
										if($(obj).find(".main-content-title").attr("id")==data1.id){
											var newstyle=new style($(obj).find(".category").text().replace("【","").replace("】",""));
											var cattemp=newstyle.cat;
											changelovestyle($(obj).find(".love-icon"),cattemp);
											
										}
									})
								}
								if($("#user-content").attr("from")==2||$("#user-content").attr("from")==3){//from detail
									var URL=document.URL; 
									var arraytemp=new Array();
									arraytemp=URL.split("?");
									if(data1.id==parseInt(arraytemp[1])){
										var newstyle=new style($("#main-content-detail").find(".category").text().replace("【","").replace("】",""));
										var cattemp=newstyle.cat;
										changelovestyle($("#main-content-detail").find(".love-icon"),cattemp);
									}
								}
								$(this).parent().parent().parent().remove();
								lovetag=0;
								
							}
							
						})
						$(query+" .user-event-each:eq("+i+") ul li.moreop").hide();
						$(query+" .user-event-each:eq("+i+")").hover(function(){
	
							$(this).find(".moreop").fadeIn();
						},function(){
							$(this).find(".moreop").fadeOut();
						});
					}
					if(query=="#user-raise"){	//我发起的
						
						$(query+" .user-event-each:eq("+i+") ul li.moreop").append("<a href='http://stu.fudan.edu.cn/event/addevent.aspx?"+$(query+" .user-event-each:eq("+i+")").attr("id")+"'><div class='change-inf'>修改信息</div></a><div class='change'>关闭活动</div><div class='see-register'>报名情况</div>");
						if(cat[i].ViewFlag==-1||cat[i].ViewFlag==-4)
						{
							$(query+" .user-event-each:eq("+i+") ul li.moreop .change").html("开启活动");
							$(query+" .user-event-each:eq("+i+") ul li.moreop .change").attr("class","change");
						}
						if(cat[i].NeedSubscribe=="false")
							$(query+" .user-event-each:eq("+i+") ul li.moreop .see-register").remove();
						$(query+" .user-event-each:eq("+i+") ul li.moreop").hide();
						$(query+" .user-event-each:eq("+i+")").hover(function(){
	
							$(this).find(".moreop").fadeIn();
						},function(){
							$(this).find(".moreop").fadeOut();
						});
						$(query+" .user-event-each:eq("+i+") ul li.moreop .change").click(function(){
							var id=$(this).parent().parent().parent().attr("id");
							$.ajax({
								url : "http://stu.fudan.edu.cn/event/ViewControl.aspx?id="+id,
								type : 'get',
								async:false
							}).done(function(json){
								lovetag=1;
							}).fail(function(json){

							});
							if(lovetag==1){
								if($(this).html()=="关闭活动")
								{
									$(this).html("开启活动");
								}
								else{
									$(this).html("关闭活动");
								}
								lovetag=0;
								
							}
						});
						
						$(query+" .user-event-each:eq("+i+") ul li.moreop .see-register").click(function(){
							picstyle2(selectoutput);
							$("#selectoutput").attr("name",$(this).parent().parent().parent().attr("id"));
							$("#loginnow").html("确定");
							$("#later").html("取消");
							$("#join-time-content").css("background-image","url('img/happyface.png')");
							$("#join-time-content").css("background-position","80% 20%");
							$("#selectoutput .clickbox").click(function(){
								$("#selectoutput .clickbox").removeClass("click");
								$(this).addClass("click");

							});
						});
					}
	
					if(cat[i].Location==null||cat[i].Location==" "){
						$(query+" .user-event-each:eq("+i+") .user-event-location").parent().empty();
					}
	
				}
			}
		}

	}

	function updateuser(string,page){
		var datatype=function(){
			this.page=page;
			this.type=string;
			this.perpage=8;
		}
		var data1 =new datatype();
		$.ajax({
			url : "http://stu.fudan.edu.cn/event/UserDetail.aspx",
			dataType : 'json',
			data:data1,
			type : 'get',
			async:false
		}).done(function(json){
			if(json){
				json=json.User;
				if(json.SubscribedEvents){
					var part=json.SubscribedEvents;
					var length=part.count;
					addusercontent(part.Event,"#user-to-attend",8,length,page);
					//addusercontent(part.ended,"#user-ended",2,page2);
				}
				if(json.PublishedEvents){
					var part=json.PublishedEvents;
					var length=part.count;
					addusercontent(part.Event,"#user-raise",8,length,page);
					//addusercontent(part.ended,"#user-interest-ended",2,page2);
				}
				if(json.LikedEvents){
					var part=json.LikedEvents;
					var length=part.count;
					addusercontent(part.Event,"#user-interest",8, length,page);
					//addusercontent(part.ended,"#user-raise-ended",2, page2);
				}
				
				
			}
			
		}).fail(function(){
			alert("似乎网络出现了一点问题，请检查~~");
		})
	}

	function changestyle(json,i){	//change color style
		//alert(1);
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
						if(user.Name!=null){
							var datatemp=function(){
								this.id;
							}
							var data1=new datatemp();
							data1.id=$(this).parent().parent().parent().prev().attr("id");
							var tag=0;
							$.ajax({
								url:"http://stu.fudan.edu.cn/event/like.aspx",
								data:data1,
								type : 'get',
								async:false
							}).done(function(success){
								if(success==1){
									lovetag=1;
								}
							})
							if(lovetag==1){
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
								lovetag=0;
							}
	
						}
						else
						{
							alertlogin();
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
						if($(this).parent().parent().parent().prev().find(".end-tag").size()==0){	
							if(!$(this).hasClass("pin-select")){
								
								if(user.Name!=null){
									if($(this).parent().parent().parent().prev().find(".sub.tag").size()!=0){
										$(this).addClass("pin-select");
										$(this).css("background-image","url('img/pin-"+cat+"-selected.png')");
										num=Number($(this).next().text())+1;
										$(this).next().text(num);
										window.open("http://stu.fudan.edu.cn/event/signup.html?"+$(".main-content-title:eq("+i+")").attr("id"));
									}
									else{
										var datatemp=function(){
											this.id;
										}
										var data1=new datatemp();
										data1.id=$(this).parent().parent().parent().prev().attr('id');
										$.ajax({
			
											url: "http://stu.fudan.edu.cn/event/Subscribe.aspx",
											data: JSON.stringify(data1),
											contentType: "application/json;charset=utf-8",
											type: 'get',
											async: false
										}).done(function(json) {
											if(json=="1"||json==1){
												pintag=1;
											}
										});
										if(pintag==1){
											changepinstyle($(this),cat);
											pintag=0;
										}
									}
								}
								else
									alertlogin();
							}
							else{
								if(user.Name!=null){
									$(this).addClass("prepare");
									picstyle2(cancelsignup);
									$("#loginnow").html("再想想");
									$("#later").html("确认");
									$("#loginnow").unbind("click");
									$("#later").unbind("click");
									$("#loginnow").click(function(){
										uncover();
										$(".main-content-each .pin-icon.prepare").removeClass("prepare");
									})
									$("#later").click(function(){
										var datatemp=function(){
											this.id;
										}
										var data1=new datatemp();
										data1.id=$(".main-content-each .pin-icon.prepare").parent().parent().parent().prev().attr('id');
										$.ajax({
					
											url: "http://stu.fudan.edu.cn/event/UnSubscribe.aspx",
											data: data1,
											contentType: "application/json;charset=utf-8",
											type: 'get',
											async: false
										}).done(function(json) {
											if(json=="1"||json==1){
												pintag=1;
											}
										});
										if(pintag==1){
											changepinstyle($(".main-content-each .pin-icon.prepare"),cat);
											pintag=0;
											$(".main-content-each .pin-icon.prepare").removeClass("prepare");
											uncover();
										}
									});
								}
								else
									alertlogin();
							}
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
					$(".main-content-each:eq("+i+") .main-content-img img").hover(function(){
							phototag=1;
					},function(){
						phototag=0;
					})
					$(".main-content-each:eq("+i+") .main-content-img img").click(function(){
						$("#show-photo").remove();
						$("#photo-cover-show").append("<img src='./g_Poster.aspx?id="+$(".main-content-each:eq("+i+") .main-content-title").attr("id")+"' id='show-photo'/>");
						$("#photo-cover").css("width",document.body.clientWidth);
						$("#photo-cover").css("height",document.body.clientHeight);
						$("#photo-cover").show();
						$("#show-photo").hide();
						$("#photo-cover-show").show();
						$("#detail-left-arrow").hide();
						$("#detail-right-arrow").hide();
						var obj = new Image();
 						obj.src = "./g_Poster.aspx?id="+$(".main-content-each:eq("+i+") .main-content-title").attr("id");
						obj.onload=function(){
							var windowheight=window.screen.availHeight-200;
							var windowwidth=window.screen.availWidth-200;
							var width=$("#show-photo").width();
							var height=$("#show-photo").height();
							if(width>windowwidth||height>windowheight){
								if(width/windowwidth<height/windowheight){
									$("#show-photo").css("height",windowheight);
									$("#show-photo").css("width",width/(height/windowheight));
								}
								else{
									$("#show-photo").css("width",windowwidth);
									$("#show-photo").css("height",height/(width/windowwidth));
								}
							}
							else{		
							}
							var toptemp=(-$("#show-photo").height())/2;
							var lefttemp=(-$("#show-photo").width())/2;
							$("#show-photo").css("margin-top",toptemp);
							$("#show-photo").css("margin-left",lefttemp);
							$("#show-photo").show();
						}
						
					})
					$("#main-content .main-content-article:eq("+i+") .share-addition .sina").click(function(){
						var objtemp=$(".main-content-each:eq("+i+")");
						var content="%23复旦活动%23"+objtemp.find(".time").html().replace(/&nbsp;&nbsp;/,"  ");
						if(objtemp.find(".position").html()!=null)
							content=content+","+objtemp.find(".position").html();
						objtemp.find(".speaker-name").each(function(i,obj){
							content=content+",";
							content=content+$(obj).html()+$(obj).next().html();
							if(i<$(obj).find(".speaker-name").size()-1)
								content=content+"、";
						})
						objtemp.find(".raiser-name").each(function(i,obj){
							content=content+",";
							content=content+$(obj).html();
							if(i<$(obj).find(".raiser-name").size()-1)
								content=content+"、";
						})
						var content=content.replace(/[\r\n]/g, ""); 
						var titlecontent=objtemp.find(".title").text();
						var pic='http://stu.fudan.edu.cn/event/g_Poster.aspx?id='+$(".main-content-each:eq("+i+") .main-content-title").attr("id");
						share("tsina","http://stu.fudan.edu.cn/event/main.html?"+$(".main-content-each:eq("+i+") .main-content-title").attr("id"),titlecontent,content,pic);
						
					})
					$("#main-content .main-content-article:eq("+i+") .share-addition .tencent").click(function(){
						var objtemp=$(".main-content-each:eq("+i+")");
						var content="%23复旦活动%23"+objtemp.find(".time").html().replace(/&nbsp;&nbsp;/,"  ");
						if(objtemp.find(".position").html()!=null)
							content=content+","+objtemp.find(".position").html();
						objtemp.find(".speaker-name").each(function(i,obj){
							content=content+",";
							content=content+$(obj).html()+$(obj).next().html();
							if(i<$(obj).find(".speaker-name").size()-1)
								content=content+"、";
						})
						objtemp.find(".raiser-name").each(function(i,obj){
							content=content+",";
							content=content+$(obj).html();
							if(i<$(obj).find(".raiser-name").size()-1)
								content=content+"、";
						})
						var content=content.replace(/[\r\n]/g, ""); 
						var titlecontent=objtemp.find(".title").text();
						var pic='http://stu.fudan.edu.cn/event/g_Poster.aspx?id='+$(".main-content-each:eq("+i+") .main-content-title").attr("id");
						share("tqq","http://stu.fudan.edu.cn/event/main.html?"+$(".main-content-each:eq("+i+") .main-content-title").attr("id"),titlecontent,content,pic);
						
					})
					$("#main-content .main-content-article:eq("+i+") .share-addition .douban").click(function(){
						var objtemp=$(".main-content-each:eq("+i+")");
						var content="%23复旦活动%23"+objtemp.find(".time").html().replace(/&nbsp;&nbsp;/,"  ");
						if(objtemp.find(".position").html()!=null)
							content=content+","+objtemp.find(".position").html();
						objtemp.find(".speaker-name").each(function(i,obj){
							content=content+",";
							content=content+$(obj).html()+$(obj).next().html();
							if(i<$(obj).find(".speaker-name").size()-1)
								content=content+"、";
						})
						objtemp.find(".raiser-name").each(function(i,obj){
							content=content+",";
							content=content+$(obj).html();
							if(i<$(obj).find(".raiser-name").size()-1)
								content=content+"、";
						})
						var content=content.replace(/[\r\n]/g, ""); 
						var titlecontent=objtemp.find(".title").text();
						var pic='http://stu.fudan.edu.cn/event/g_Poster.aspx?id='+$(".main-content-each:eq("+i+") .main-content-title").attr("id");
						share("douban","http://stu.fudan.edu.cn/event/main.html?"+$(".main-content-each:eq("+i+") .main-content-title").attr("id"),titlecontent,content,pic);
						
					})
					$("#main-content .main-content-article:eq("+i+") .share-addition .renren").click(function(){
						var objtemp=$("#main-content .main-content-each:eq("+i+")");
						var content="%23复旦活动%23"+objtemp.find(".time").html().replace(/&nbsp;&nbsp;/,"  ");
						if(objtemp.find(".position").html()!=null)
							content=content+","+objtemp.find(".position").html();
						objtemp.find(".speaker-name").each(function(i,obj){
							content=content+",";
							content=content+$(obj).html()+$(obj).next().html();
							if(i<$(obj).find(".speaker-name").size()-1)
								content=content+"、";
						})
						objtemp.find(".raiser-name").each(function(i,obj){
							content=content+",";
							content=content+$(obj).html();
							if(i<$(obj).find(".raiser-name").size()-1)
								content=content+"、";
						})
						var content=content.replace(/[\r\n]/g, ""); 
						var titlecontent=objtemp.find(".title").text();
						var pic='http://stu.fudan.edu.cn/event/g_Poster.aspx?id='+$(".main-content-each:eq("+i+") .main-content-title").attr("id");
						share("renren","http://stu.fudan.edu.cn/event/main.html?"+$(".main-content-each:eq("+i+") .main-content-title").attr("id"),titlecontent,content,pic);
						
					})

					$('.main-content-each:eq('+i+') strong').css("color",color);
					
					if(json.ViewFlag=='1'){
						$('.days-left:eq('+i+')').append("<div class='review'></div>");
						$(".days-left .review").css({
							"background-image":"url('img/review-"+cat+".png')",
							"width":"115px",
							"height":"62px",
							"margin-left":"60px"
						});
					}

					$('.main-content-each:eq('+i+') .sub.tag').click(function(){
						$(this).addClass("click");
						$(this).parent().next().find(".pin-icon").trigger("click");
					});
					$('.main-content-each:eq('+i+') .sub.tag').mouseleave(function(){
						$(this).removeClass("click");
					})

					$('.main-content-each:eq('+i+') .reply-icon').click(function(){	
							//进入detail!!!
							var data1=mainjson.Event[i].Id;
							window.open("http://stu.fudan.edu.cn/event/main.html?"+data1);

						
					});
					$('.main-content-each:eq('+i+') .main-content-title').click(function(){
						if(!$(this).find(".sub.tag").hasClass("click")){
							var data1=$(this).attr("id");
							window.open("http://stu.fudan.edu.cn/event/main.html?"+data1);
						}
					});
					$('.main-content-each:eq('+i+') .share-icon').click(function(){
						$(this).addClass("share-click");
					});
					$('.main-content-each:eq('+i+') .share-icon').hover(function(){
						$(this).next().next().fadeIn();
					});
					$('.main-content-each:eq('+i+') .share-icon').mouseleave(function(){
						if(!$(this).hasClass("share-click"))
							$(this).next().next().delay(1000).fadeOut();
					});
					$('.main-content-each:eq('+i+') .share-addition').hide();
		
				}
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
						if(user.Name!=null){
							var datatemp=function(){
								this.id;
							}
							var data1=new datatemp();
							data1.id=$("#main-content-detail").attr("name");
							var tag=0;
							lovetag=0;
							$.ajax({
								url:"http://stu.fudan.edu.cn/event/like.aspx",
								data:data1,
								type : 'get',
								async:false
							}).done(function(success){
								if(success==1){
									lovetag=1;
								}
							})
							if(lovetag==1){
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
									lovetag=0;
							}

						}
						else
						{
							alertlogin();
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
						$(this).attr("cat",cat);
						if(!$(this).hasClass("pin-select")){
							if($("#detail-title").find(".end-tag").size()==0){	
								if(user.Name!=null){
									if($("#detail-title").find(".sub.tag").size()!=0){
										$(this).addClass("pin-select");
										$(this).css("background-image","url('img/pin-"+cat+"-selected.png')");
										num=Number($(this).next().text())+1;
										$(this).next().text(num);
										window.open("http://stu.fudan.edu.cn/event/signup.html?"+geturlid());
									}
									else{
										var datatemp=function(){
											this.id;
										}
										var data1=new datatemp();
										data1.id=geturlid();
										$.ajax({
			
											url: "http://stu.fudan.edu.cn/event/Subscribe.aspx",
											data: JSON.stringify(data1),
											contentType: "application/json;charset=utf-8",
											type: 'get',
											async: false
										}).done(function(json) {
											if(json=="1"||json==1){
												pintag=1;
											}
										});
										if(pintag==1){
											changepinstyle($(this),cat);
											pintag=0;
										}
									}
								}
								else
									alertlogin();
							}
						}
						else{
							if(user.Name!=null&&$("#detail-title").find(".end-tag").size()==0){
								var datatemp=function(){
									this.id;
								}
								picstyle2(cancelsignup);
								$("#loginnow").html("再想想");
								$("#later").html("确认");
								$("#loginnow").unbind("click");
								$("#later").unbind("click");
								$("#loginnow").click(function(){
									uncover();
								})
								$("#later").click(function(){
									var data1=new datatemp();
									data1.id=geturlid();
									$.ajax({
						
										url: "http://stu.fudan.edu.cn/event/UnSubscribe.aspx",
										data: data1,
										contentType: "application/json;charset=utf-8",
										type: 'get',
										async: true
									}).done(function(json) {
										if(json=="1"||json==1){
											changepinstyle($('#detail-icon .pin-icon'),$('#detail-icon .pin-icon').attr("cat"));
											pintag=0;
										}
										uncover();
									});
								});				
									


								
								
								
							}
							else
								alertlogin();
						}
					});
					$('#main-content-detail strong').css("color",color);
					$('#top').addClass("hide");
					$("#top").hide();
					


				}
	}

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
		var style1=new style(json.Type);
		color=style1.color;
		cat=style1.cat;
		console.log(json.Id);
		if(json.Id=="260"){
			$("#main-content .main-content-words:eq("+i+")").append("<div class='live-icon'></div>");
			$("#main-content .main-content-words:eq("+i+") .live-icon").click(function(){
				window.open("http://stu.fudan.edu.cn/live");
			})
		}
		if(!json.pic){
			$("#main-content .main-content-img:eq("+i+")").empty();
			$("#main-content .main-content-img:eq("+i+")").append("<img src='http://stu.fudan.edu.cn/event/img/picture.png' alt=''>");
		}
		else{
			$("#main-content .main-content-img:eq("+i+")").append("<img src='"+json.pic+"' alt=''>");
		}
		//alert(2);
		if(json.subscribed=="true"){
			$(".main-content-each:eq("+i+") .main-content-article .pin-icon").addClass("pin-select");
			$(".main-content-each:eq("+i+") .main-content-article .pin-icon").css("background-image","url('img/pin-"+cat+"-selected.png')");
		}
		if(json.liked=="true"){
			$(".main-content-each:eq("+i+") .main-content-article .love-icon").addClass("love-select");
			$(".main-content-each:eq("+i+") .main-content-article .love-icon").css("background-image","url('img/love-"+cat+"-selected.png')");

		}
		if((json).hot=='1'){
			$('.main-content-each:eq('+i+') .main-content-img').prepend("<div class='hot'>HOT</div><img class='hot-corner' src='img/corner.png' />");
			
		}
		if((json).tag=='new'){
			$('.main-content-each:eq('+i+') .main-content-title').append("<div class='tag'>new</div>");
		}
		if((json).NeedSubscribe=='true'&&$('.main-content-each:eq('+i+') .main-content-title').find(".end-tag").size()==0){
			$('.main-content-each:eq('+i+') .main-content-title').append("<div class='tag sub'>需报名</div>");
			$('.main-content-each:eq('+i+') .tag').css({"font-size":"12px","padding-top":"3px"});
		}
		if((json).tag=='已结束'){
			$('.main-content-each:eq('+i+') .main-content-title').append("<div class='end-tag'>已结束</div>");
		}
		if(!json.Location||json.Location==" "){
			$(".main-content-each:eq("+i+") .main-content-article .location-wrap").empty();
		}
		if(json.Type=="讲座"){
			if(json.Speakers){
				$('.main-content-each:eq('+i+') .main-content-article li:eq(0)').append("<div class='intro'>主讲</div>");
				for(j=0;j<json.Speakers.length;j++){
					$('.main-content-each:eq('+i+') .main-content-article li:eq(0)').append("<div class='speaker-each clearfix'><div class='speaker-name'></div><div class='speaker-title'></div></div>");
					$('.main-content-each:eq('+i+') .main-content-article li:eq(0) .speaker-each:eq('+j+') .speaker-name').html(json.Speakers[j].Name);
					$('.main-content-each:eq('+i+') .main-content-article li:eq(0) .speaker-each:eq('+j+') .speaker-title').html(json.Speakers[j].Class);
				}
			}
		}
		else{
			if(json.Publishers){
				$('.main-content-each:eq('+i+') .main-content-article li:eq(0)').append("<div class='intro'>主办</div>");
				for(j=0;j<json.Publishers.length;j++){
					$('.main-content-each:eq('+i+') .main-content-article li:eq(0)').append("<div class='raiser-each'><div class='raiser-name'></div></div>");
					//alert(json.Publishers[j]);
					$('.main-content-each:eq('+i+') .main-content-article li:eq(0) .raiser-each:eq('+j+') .raiser-name').html(json.Publishers[j]);

				}
			}
		}
		
		if((json).timeleft){
				var temp=(json.timeleft);
				if(temp.min<0||temp.hour<0||temp.day<0)
				{
					$('.main-content-each:eq('+i+') .main-content-title .sub.tag').remove();
				}
				else{
					$('.days-left ul:eq('+i+')').append("<li><p>离报名截止还有<strong>"+temp.day+
					"</strong>日<strong>"+temp.hour+
					"</strong>时<strong>"+temp.min+
					"</strong>分</p></li>");
				}
		}
		if(json.timeleft2){
			var temp=json.timeleft2;
			if(temp.min<0||temp.hour<0||temp.day<0)
			{
				$('.main-content-each:eq('+i+') .main-content-title').append("<div class='end-tag'>已结束</div>");
				
			}
			
		}
		if(json.numleft){
			var temp=(json.numleft);
			$('.days-left ul:eq('+i+')').append("<li><p>还有<strong>"+temp+"</strong>个名额</p></li>");
		}
		$('.main-content-each:eq('+i+') .time').html(json.StartTime.split(/T/)[0]+"&nbsp;&nbsp;"+json.StartTime.split(/T/)[1].split(":")[0]+":"+json.StartTime.split(/T/)[1].split(":")[1]);
		if(json.Subtype==""||json.Subtype==null){
			$('.main-content-each:eq('+i+') .subcategory').hide();
			$('.main-content-each:eq('+i+') .category').css("margin-right","0px");
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
		$("#detail-img .hot2").hide();
		$("#detail-img .hot-corner2").hide();
		$("#detail-reply-icon").css("background-color","#913395");
		$("#detail-reply-icon").css("color","white");
		$("#detail-reply-icon").find(".detail-icon").css("color","white");
		$("#detail-reply-icon").addClass("stretch");
		$("#detail-share").hide();
		//$("#main-content-wrap").css("margin-left","-1px");
		$("#leftside").hide();
		$("#banner-normal .td-normal").hide();
		$("#banner-normal #datepicker-header").hide();
		$("#search").css("margin-left","426px");
		$("#search").css("background-image","none");
		$("#top").css("margin-left","746px");
		$("#back").hide();
		$("#search").hide();
		$(document).unbind("keydown");

	}

	function detailbind(){
		$(document).off("mouseover",".main-content-title",adddecoration);
		$("#detail-img img").hover(function(){
			phototag=1;
		},function(){
			phototag=0;
		})
		$("#detail-img img").click(function(){
			$("#show-photo").remove();
			var URL=document.URL; 
			var arraytemp=new Array();
			arraytemp=URL.split("?");
			$("#photo-cover-show").append("<img src='./g_Poster.aspx?id="+arraytemp[1]+"' id='show-photo'/>");
			$("#photo-cover").css("width",document.body.clientWidth);
			$("#photo-cover").css("height",document.body.clientHeight);
			$("#photo-cover").show();
			$("#show-photo").hide();
			$("#photo-cover-show").show();
			$("#detail-left-arrow").hide();
			$("#detail-right-arrow").hide();
			var obj = new Image();
 			obj.src = "./g_Poster.aspx?id="+arraytemp[1];
			obj.onload=function(){
				var windowheight=window.screen.availHeight-200;
				var windowwidth=window.screen.availWidth-200;
				var width=$("#show-photo").width();
				var height=$("#show-photo").height();
				if(width>windowwidth||height>windowheight){
					if(width/windowwidth<height/windowheight){
						$("#show-photo").css("height",windowheight);
						$("#show-photo").css("width",width/(height/windowheight));
					}
					else{
						$("#show-photo").css("width",windowwidth);
						$("#show-photo").css("height",height/(width/windowwidth));
					}
				}
				else{		
				}
				var toptemp=(-$("#show-photo").height())/2;
				var lefttemp=(-$("#show-photo").width())/2;
				$("#show-photo").css("margin-top",toptemp);
				$("#show-photo").css("margin-left",lefttemp);
				$("#show-photo").show();
			}
			
		})
		$(".upload-pic").click(function(){
			if(user.Name!=null){
				var URL=document.URL; 
				var arraytemp=new Array();
				arraytemp=URL.split("?");
	
				if(arraytemp[1]){
					window.location.href="http://stu.fudan.edu.cn/event/album.html?"+arraytemp[1];
				}
			}
			else
				alertlogin();
		})
		$("#back").click(function(){	//离开album
			if($("#album-detail").css("display")=="block"){	
				$("#top").addClass("hide");
				$("#back").hide();
				$("#album-detail").hide();
				$("#album-detail-title").hide();
				$("#main-content-detail").show();
				$("#search").css("margin-left","426px");
				$("#main-content-more").css("margin-left","1px");
				//$("#main-content-wrap").css("margin-left","-1px");
				
			}	
			
		});	
		$("#myCanvas").click(function(){
			openalbum();
		})
		$(".share-detail").click(function(){
			if(!$(this).hasClass("hover"))
				$(this).addClass("hover");
			else
				$(this).removeClass("hover");
		})
		$("#replybox-corner").hide();
		$("#relybox-content").css("margin-top","10px");
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
		$("#alsoshare").click(function(){
			if(this.checked){
				if(!$("#alsoshare-wrap").hasClass("stretched")){
				$("#alsoshare-wrap").animate({
					"marginRight": "120px"},
					"middle", function() {
						$('#alsoshare-wrap').css('margin-right','0px');
						$('#detail-share').fadeIn("slow",function(){
	
						});
						
				});
				$("#alsoshare-wrap").addClass("stretched");
			}
			}
						
		})
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
			if(user.userID){
				if($("#detail-textarea").val()!=""){
					prepareshare();
					var num=Number($("#detail-reply-icon span").text())+1;
					$("#detail-reply-icon span").text(num);
					$("#detail-form").after(replyeach);
					$(".reply-each:eq(0) .reply-content").empty();
					$(".reply-each:eq(0) .reply-content").append($("#detail-textarea").val());
					$(".reply-each:eq(0) .detail-addition-icon").removeClass("reply-icon");
					$(".reply-each:eq(0) .detail-addition-icon").addClass("delete-icon");
					$(".reply-each:eq(0) .detail-addition-icon").text("删除");
					             var today = new Date();
	       	                                      var weekday=new Array(7)
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
					$(".reply-each:eq(0) .reply-person").text(user.Name);
					var datatemp=function(){
						this.uid;
						this.eid;
						this.content;
						
					}
					var data1=new datatemp();
					data1.uid=user.userID;
					data1.eid=$("#main-content-detail").attr("name");
					data1.content=$("#detail-textarea").val();
					$("#detail-textarea").val("");
					$.ajax({
			
						url : "http://stu.fudan.edu.cn/event/Comment_Make.aspx",
						data:data1,
						dataType : 'json',
						type : 'get',
						async:false
					}).done(function(json){
						json=json.MakeComment;
						if(json.success==1){
							 $(".reply-each:eq(0)").attr("name",json.cid);
						}
					})
					detaileachbind();
					
				}else{
					$("#detail-response").focus();
				}
			}
			else{
				alertlogin();
			}
		})

	}
	function prepareshare(){
		$("#share-display-none .sina").unbind("click");
		$("#share-display-none .tencent").unbind("click");
		$("#share-display-none .douban").unbind("click");
		$("#share-display-none .renren").unbind("click");
		$("#share-display-none .sina").click(function(){
			var titlecontent=$("#detail-title .title-detail").html()+"|复旦学生网-活动平台";
			var content="#复旦活动#"+$("#detail-textarea").val();
			var pic=$("#detail-img img:last").attr("src").replace("./","http://stu.fudan.edu.cn/event/");
			share("tsina","http://stu.fudan.edu.cn/event/main.html%3F"+geturlid(),titlecontent,content,pic);
			
		})
		$("#share-display-none .tencent").click(function(){
			var titlecontent=$("#detail-title .title-detail").html()+"|复旦学生网-活动平台";
			var content="#复旦活动#"+$("#detail-textarea").val();
			var pic=$("#detail-img img:last").attr("src").replace("./","http://stu.fudan.edu.cn/event/");
			share("tqq","http://stu.fudan.edu.cn/event/main.html%3F"+geturlid(),titlecontent,content,pic);
			
		})
		$("#share-display-none .douban").click(function(){
			var titlecontent=$("#detail-title .title-detail").html()+"|复旦学生网-活动平台";
			var content="#复旦活动#"+$("#detail-textarea").val();
			var pic=$("#detail-img img:last").attr("src").replace("./","http://stu.fudan.edu.cn/event/");
			share("douban","http://stu.fudan.edu.cn/event/main.html%3F"+geturlid(),titlecontent,content,pic);
			
		})
		$("#share-display-none .renren").click(function(){
			var titlecontent=$("#detail-title .title-detail").html()+"|复旦学生网-活动平台";
			var content="#复旦活动#"+$("#detail-textarea").val();
			var pic=$("#detail-img img:last").attr("src").replace("./","http://stu.fudan.edu.cn/event/");
			share("renren","http://stu.fudan.edu.cn/event/main.html%3F"+geturlid(),titlecontent,content,pic);
				
		})
		if($("#alsoshare")[0].checked==true){
			if($("#detail-share .sina").hasClass("hover")){
				$("#share-display-none .sina").trigger("click");
			}
			if($("#detail-share .douban").hasClass("hover")){
				$("#share-display-none .douban").trigger("click");
			}
			if($("#detail-share .tencent").hasClass("hover")){
				$("#share-display-none .tencent").trigger("click");
			}
			if($("#detail-share .renren").hasClass("hover")){
				$("#share-display-none .renren").trigger("click");
			}
		}
	};
	function detaileachbind(){
		$(".reply-each .reply-icon").click(function(){	//回复
			var index=$(".detail-addition-icon").index(this);
			var content= "回复"+$(".reply-each:eq("+index+") .reply-person").text()+":";
			//$("#detail-textarea").focus();
			$("#detail-textarea").val(content);
		})
		$(".reply-each .delete-icon").click(function(){	//删除
			var index=$(".detail-addition-icon").index(this);
			var datatemp=function(){
				this.cid;
			}
			var data1=new datatemp();
			data1.cid=$(this).parent().parent().parent().attr("name");
			$.ajax({
				url:"http://stu.fudan.edu.cn/event/Comment_Delete.aspx",
				data:data1,
				dataType:'json',
				type:'get',
				async:false
			}).done(function(json){
				if(json.success==0){
					alert("删除失败，请稍后再试~~");
				}
			});
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
		$("#loginnow").click(function(){
			if($("#loginnow").html()!="确定")
				window.location.href="http://stu.fudan.edu.cn/auth/auth.aspx?returnurl=http://stu.fudan.edu.cn/event/auth.aspx";
			else
			{
				var id=$("#selectoutput").attr("name");
				var datatype=function(){
					this.id;
					this.type;
				}
				var data1=new datatype();
				var idtemp=id;
				var typetemp;
				var index=$("#selectoutput .clickbox").index($("#selectoutput .click"));
				if(index==0){
					typetemp="xml";
				}
				if(index==1){
					typetemp="csv";
				}
				var string='type='+typetemp+'&&id='+idtemp;
				string="http://stu.fudan.edu.cn/event/output.aspx?"+string;
				window.open(string);
			}
					
		})
		$(".join-time-sbutton").bind("click",function(){
			uncover();
		})

	}
	function clearcontent(){
		$("#main-content").empty();
	}
	function share(shareID,siteUrl,siteTitle,summary,pic){
		pic =escape(pic);
		var ralateuid=1690054162;
		var uid=1359984930248541;
		//alert("http://www.jiathis.com/send/?webid="+shareID+"&url="+siteUrl+"&title="+siteTitle+"&uid="+uid+"&summary="+summary+"&ralateuid="+ralateuid);
		var stringtemp=("http://www.jiathis.com/send/?webid="+shareID+"&url="+siteUrl+"&title="+siteTitle+"&uid="+uid+"&summary="+summary+"&ralateuid="+ralateuid+"&pic="+pic);
		window.open(stringtemp);
	}
	function adddecoration(){
		$(this).find("p").css("text-decoration","underline");
		$(this).find("span").css("text-decoration","underline");
	}
	function bind(){//一些状态变化
		$(document).on("click",".orgaccount",function(){
			var datatemp=function(){
				this.OrgName;
			}
			var data1=new datatemp();
			data1.OrgName=$(this).html();
			$.ajax({
				url: "http://stu.fudan.edu.cn/event/Set_Org_Status.aspx",
				data: data1,
				contentType: "application/json;charset=utf-8",
				type: 'get',
				async: false
			}).done(function() {
				updateuserinfo();
			}).fail(function(){

			})
		})
		$(document).on("mouseover",".main-content-title",adddecoration);
		$(document).on("mouseout",".main-content-title",function(){
			$(this).find("p").css("text-decoration","none");
			$(this).find("span").css("text-decoration","none");
		})
		$("#personal-activity").click(function(){
			userinit();
			updateuser("Subscribed",0);
			
			
		})
		$("#show-photo").mouseover(function(){
			phototag=1;
		})
		$("#show-photo").mouseout(function(){
			phototag=0;
		})

		$(document).click(function(){
			if(phototag==0){
				closealbum();
			}
		})
		$(".datepicker").datepicker();
		$(".datepicker").datepicker('option',{dateFormat: "yy-mm-dd"});
		$("#photo-cover").hide();
		$("#photo-cover-show").hide();
		$("#album-detail-title").hide();
		$("#album-detail").hide();	
		$("#leftside-toppic1").click(function(){
			if(user.Name==null){
				alertlogin();
			}	
			else{
				window.location.href="http://stu.fudan.edu.cn/event/addevent.aspx";
			}
		})
		$(".datepicker").click(function(){
			$("#ui-datepicker-div.ui-datepicker").css("z-index","1000");
		})
		$("#header-click").click(function(){
			window.location.href="http://stu.fudan.edu.cn/event/main.html";
		})
		$("#personal-inf").click(function(){
			if(org==true)
				window.open("http://stu.fudan.edu.cn/event/org.html?"+$("#username").html());
			else
				window.open("http://stu.fudan.edu.cn/user/profile/update");
		})

		$(document).keydown(function(){
			var keycode=event.which||event.keyCode;
			if(keycode==13)
				$("#search-img").trigger("click");
		});
		
		$("#search-img").click(function(){
			search=$("#search input").val();
			if(search!="")
				updatejson(0,search);
		})

		$("#td-short").click(function(){
			$("#datepicker-header input").focus();
			$("#datepicker-header input").trigger("click");
		})
		$("#login-addition-box").mouseover(function(){
			logintag=1;
		})
		$("#login-addition-box").mouseout(function(){
			logintag=0;
		})
		$("#username").mouseover(function(){
			logintag=1;
		})
		$("#username").mouseout(function(){
			logintag=0;
		})
		$(document).click(function(){
			if($("#login-addition-box").hasClass("stretch")&&logintag==0)
			{
				$("#login-addition-box").fadeOut();
				$("#login-addition-box").removeClass("stretch");
			}
		})
		$("#username").click(function(){
			
			if(!$("#login-addition-box").hasClass("stretch")){
				$("#login-addition-box").addClass("stretch");
				$("#login-addition-box").fadeIn();
			}
			else{
				$("#login-addition-box").removeClass("stretch");
				$("#login-addition-box").fadeOut();
			}

		})
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
			page=page+1;
			if(search==null)
				updatejson(page);
			else
				updatejson(page,search);
		})
		$('.more').click(function(){	//左侧边栏展开 更换内容

			clearcontent();
			lastnum=0;
			$(".purple.stretch2").removeClass("stretch2");
			$(".more.stretch2").removeClass("stretch2");
			$(".li-wrap.stretch").removeClass("stretch");
			$(this).addClass("stretch2");
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
			$(".more.stretch2").removeClass("stretch2");
			$(this).addClass("stretch2");
			clearcontent();
			lastnum=0;
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
			clearcontent();
			lastnum=0;
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
		$('.td-normal2').hover(function(){
			$('.td-normal2-hover').removeClass("td-normal2-hover");
			$('.td-normal2-click').addClass("td-normal2-click");
			$(this).addClass("td-normal2-hover");
		},function(){
			$(this).removeClass("td-normal2-hover");
		});
		$('.td-normal2').click(function(){

			$('.td-normal2-click').removeClass("td-normal2-click");
			$(this).addClass("td-normal2-click");
			
		});
		$("#banner-normal .td-normal").click(function(){
			if(!($(this).attr("id")=="td-short")&&!$(this).hasClass("clicked"))
				updatejson();
			else{	//更新时间

			}
			$(".td-normal.clicked").removeClass("clicked");
			$(this).addClass("clicked");
		})
		$("#attend-button").click(function(){
			//$("#user-content").children().hide();
			userinit1=0;
			usercat="Subscribed";
			userpage=0;
			updateuser("Subscribed",0);
			$("#user-interest-wrap").hide();
			$("#user-to-attend-wrap").hide();
			$("#user-raise-wrap").hide();
			$("#user-to-attend-wrap").show();
			

		})
		$("#interest-button").click(function(){
			//$("#user-content").children().hide();
			userinit1=0;
			usercat="Liked";
			userpage=0;
			updateuser("Liked",0);
			$("#user-interest-wrap").hide();
			$("#user-to-attend-wrap").hide();
			$("#user-raise-wrap").hide();
			$("#user-interest-wrap").show();
			

		})
		$("#raise-button").click(function(){
			//$("#user-content").children().hide();
			userinit1=0;
			usercat="Published";
			userpage=0;
			updateuser("Published",0);
			//alert(1);
			$("#user-interest-wrap").hide();
			$("#user-to-attend-wrap").hide();
			$("#user-raise-wrap").hide();
			$("#user-raise-wrap").show();


		})

		$("#datepicker-header input").change(function(){
				if($(this).val()!=""){
					updatejson();
				}
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
			if(reachBottom()==true&&$("#more").css("display")=="block"){
				setTimeout(updatemore,1000) ;
				function updatemore(){
					if(reachBottom()==true&&$("#more").css("display")=="block"){
						$("#more").trigger("click");
					}
				}
				
			}
		});
		//top按钮控制
		
		$('#top').click(function(){
			$('html,body').animate({scrollTop:0},300);
			
		});
	

		
	};
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
	    if (scrollTop + clientHeight <= scrollHeight && scrollTop + clientHeight > scrollHeight - 150 ) {
	        return true;
	    } else {
	        return false;
	    }
	}
	var openalbum=function(){
		$("#back").show();
		var i=0;
		$(".album-detail-each").remove();
		for(i=0;i<imageload.length;i++){
			if(imageload[i].description)
				var des=imageload[i].description;
			else
				var des="";
			$("#album-detail").append("<div class='album-detail-each'><img src='"+imageload[i].src+"' /><div class='album-hover'><p>"+des+"</p></div></div>");
			$(".album-detail-each:eq("+i+")").hover(function(){
				$(this).find(".album-hover").fadeIn();
				phototag=1;
			},function(){
				$(this).find(".album-hover").fadeOut();
				phototag=0;
			})
		}
		$("#album-detail").show();
		$("#album-detail-title").show();
		$("#main-content-detail").hide();
		$("#search").css("margin-left","326px");
		$("#main-content-more").css("margin-left","64px");
		$(".album-detail-each .album-hover").hide();
		$(".album-detail-each").each(function(i,obj){
			var objtemp=new Image();
			objtemp.src=$(obj).find("img").attr("src");
			objtemp.onload=function(){
				var width=$(obj).find("img").width();
				var height=$(obj).find("img").height();
				if(width/180<=height/120){
					$(obj).find("img").css("width","180px");
					var temp=height*180/width;
					$(obj).find("img").css("height",temp);
					var temp=-(temp-120)/2;
					$(obj).find("img").css("margin-top",temp);
					$(obj).find(".album-hover").css("margin-top",-40+temp);
				}
				else
				{
					$(obj).find("img").css("height","120px");
					var temp=width*120/height;
					$(obj).find("img").css("width",temp);
					var temp=-(temp-180)/2;
					$(obj).find("img").css("margin-left",temp);
				}
			}
			
			
		})
		
		resize=function(){
			var windowheight=window.screen.availHeight-200;
			var windowwidth=window.screen.availWidth-200;
			var width=$("#show-photo").width();
			var height=$("#show-photo").height()
			if(width>windowwidth||height>windowheight){
				if(width/windowwidth<height/windowheight){
					$("#show-photo").css("height",windowheight);
					$("#show-photo").css("width",width/(height/windowheight));
				}
				else{
					$("#show-photo").css("width",windowwidth);
					$("#show-photo").css("height",height/(width/windowwidth));
				}
			}
			else{

				
			}
			var toptemp=(-$("#show-photo").height())/2;
			var lefttemp=(-$("#show-photo").width())/2;
			$("#show-photo").css("margin-top",toptemp);
			$("#show-photo").css("margin-left",lefttemp);
			toptemp=(window.screen.availHeight-64)/2;
			$("#detail-left-arrow").css("margin-top",-32);
			$("#detail-left-arrow").css("margin-left",lefttemp-64-25);
			$("#detail-right-arrow").css("margin-top",-32);
			$("#detail-right-arrow").css("margin-left",lefttemp+25+$("#show-photo").width());
			$(".detail-arrow").show();
			lefttemp=(0-$("#detail-intro").width())/2;
			toptemp=(0-$("#show-photo").height())/2-44;
			$("#detail-intro").css("margin-top",toptemp);
			$("#detail-intro").css("margin-left",lefttemp);
			lefttemp=(0-$("#detail-index").width())/2;
			toptemp=(0-$("#show-photo").height())/2+$("#show-photo").height()+20;
			$("#detail-index").css("margin-top",toptemp);
			$("#detail-index").css("margin-left",lefttemp);

		}
		$(".album-detail-each").click(function(){
			photonum=$(".album-detail-each").index($(this));
			$("#photo-cover").css("width",document.body.clientWidth);
			$("#photo-cover").css("height",document.body.clientHeight);
			var src=$(this).find("img").attr("src");
			$("#show-photo").remove();
			$("#photo-cover-show").append("<img src='"+src+"' id='show-photo'/>");
			$("#photo-cover").show();
			$("#photo-cover-show").show();
			$("#detail-intro").text($(this).find(".album-hover p").text());
			var stringtemp="第"+(photonum+1)+"页 共"+$(".album-detail-each").size()+"页";
			$("#detail-index").text(stringtemp);
			var obj=new Image();
			obj.src=src;
			obj.onload=function(){
				resize();
			}

			

		})
		detailright=function(){
			$("#show-photo").fadeOut(function(){
				photonum=photonum+1;
				if(photonum>=$(".album-detail-each").size())
					photonum=photonum-$(".album-detail-each").size();
				$("#show-photo").css("width","");
				$("#show-photo").css("height","");
				$("#show-photo").attr("src",$(".album-detail-each:eq("+photonum+") img").attr("src"));
				$("#detail-intro").text($(".album-hover:eq("+photonum+") p").text());
				var stringtemp="第"+(photonum+1)+"页 共"+$(".album-detail-each").size()+"页";
				$("#detail-index").text(stringtemp);
				obj=new Image();
				obj.src=$(".album-detail-each:eq("+photonum+") img").attr("src");
				obj.onload=function(){
					resize();
				}

			});
			$("#show-photo").fadeIn();
		};
		$('#detail-right-arrow').click(function(){
			detailright();
		})
		$(document).keydown(function(){
			var keycode=event.which||event.keyCode;
			//alert(keycode);
			if(keycode==39)
				detailright();
			if(keycode==37)
				detailleft();
		});
		detailleft=function(){
			$("#show-photo").fadeOut(function(){
				photonum=photonum-1;
				if(photonum<0)
					photonum=photonum+$(".album-detail-each").size();
				$("#show-photo").css("width","");
				$("#show-photo").css("height","");
				$("#show-photo").attr("src",$(".album-detail-each:eq("+photonum+") img").attr("src"));
				$("#detail-intro").text($(".album-hover:eq("+photonum+") p").text());
				var stringtemp="第"+(photonum+1)+"页 共"+$(".album-detail-each").size()+"页";
				$("#detail-index").text(stringtemp);
				obj=new Image();
				obj.src=$(".album-detail-each:eq("+photonum+") img").attr("src");
				obj.onload=function(){
					resize();
				}
			});
			$("#show-photo").fadeIn();
		}
		$('#detail-left-arrow').click(function(){
			detailleft();
		})
		$("#detail-left-arrow").mouseover(function(){
			phototag=1;
		})
		$("#detail-left-arrow").mouseout(function(){
			phototag=0;
		})
		$("#detail-right-arrow").mouseover(function(){
			phototag=1;
		})
		$("#detail-right-arrow").mouseout(function(){
			phototag=0;
		})
		
	};
	function closealbum(){
		$("#photo-cover").hide();
		$("#photo-cover-show").hide();
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
				$(query+" .user-navbar").css("margin-left",margin-40);
			}
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
		
		$(document).on("click",query+" .user-navbar-num",function(){
			$(query+" .user-navbar-num-click").removeClass("user-navbar-num-click");
			$(this).addClass("user-navbar-num-click");
			var num=parseInt($(this).text());
			userpage=num-1;
			//alert(num);
			//alert(usercat);
			updateuser(usercat,userpage);
			var text=$(this).next().text();
			nav(query,text,maxindex);
			
		});
		$(query+" .user-right-arrow").click(function(){
			var a=$(query+" .user-navbar-num-click").next();
			var text=$(query+" .user-navbar-num-click").next().next().text();
			
			if(a.text()){
				
				userpage=userpage+1;
				updateuser(usercat,userpage);
				$(query+" .user-navbar-num-click").removeClass("user-navbar-num-click");
				a.addClass("user-navbar-num-click");
				var num=parseInt(a.text());
				//for(i=0;i<(num-1)*eachnum;i++){
				//	$(query+" .user-event-each:eq("+i+")").hide();
				//}
				nav(query,text,maxindex);
			}
		});
		$(query+" .user-left-arrow").click(function(){

			var a=$(query+" .user-navbar-num-click").prev();
			if(a.text()){
				userpage=userpage-1;
				updateuser(usercat,userpage);
				$(query+" .user-navbar-num-click").removeClass("user-navbar-num-click");
				a.addClass("user-navbar-num-click");
				var num=parseInt(a.text());
				/**for(i=(num-1)*eachnum;i<num*eachnum;i++){
					$(query+" .user-event-each:eq("+i+")").show();
				}**/
			}
		});
	}



	userbind=function(){	//user界面事件绑定
		$("#banner-normal").hide();
		$("#banner-user").show();
		$("#user-content").show();
	}

	
	userinit=function(){

		var photonum=0;
		$("#banner-normal").hide();
		$("#banner-user").show();
		$(".td-normal2-click").removeClass("td-normal2-click");
		$("#attend-button").addClass("td-normal2-click");
		$("#user-content").show();
		$("#main-content").hide();
		$("#user-content").children().hide();
		$("#user-to-attend-wrap").show();
		$("#user-ended-wrap").show();	
		$("#top").hide();
		//$("#main-content-wrap").css("margin-left","63px");
		if($("#leftside").css("display")=="block"){
			$("#user-content").attr("from","1");
			$("#leftside").hide();
		}
		if($("#album-detail").css("display")=="block"){
			//$("#main-content-wrap").css("margin-left","-1px");
			$("#user-content").attr("from","3");
		}
		if($("#main-content-detail").css("display")=="block"){
			$("#user-content").attr("from","2");
		}
		$("#top").addClass("hide");
		$("#back").show();
		$("#more").hide();
		$("#back").click(function(){
			if($("#user-content").css("display")=="block"){
				$("#banner-normal").show();
				$("#banner-user").hide();
				$("#user-content").hide();
				
				$("#back").hide();
				$("#main-content").show();
				if($("#user-content").attr("from")==1){
					
					//$("#main-content-wrap").css("margin-left","-75px");
					$("#leftside").show();
					$("#more").show();
					$("#top").removeClass("hide");
				}
				if($("#user-content").attr("from")==2){
					//$("#main-content-wrap").css("margin-left","-1px");
					$("#main-content-detail").show();
					$('#album-detail').hide();
				}
				if($("#user-content").attr("from")==3){
					//$("#main-content-wrap").css("margin-left","64px");
					$("#back").show();
					$("#main-content-detail").hide();
					$('#album-detail').show();
				}
			}
			
		})
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
		$("#join-time-content").css("background-image","url('img/face.png')");
		$("#join-time-confirm-wrap").append("<div id='join-time-confirm' class='join-time-confirm-style'></div>");
		$("#join-time-confirm").append("<p>知道了</p>");
		tagbind();
	}
	function picstyle2(content){
		cover(content);
		$("#join-time-content").css("background-image","url('img/face.png')");
		$("#join-time-confirm-wrap").append(confirm2);
		tagbind();
	}

	function alertlogin(){		//未登陆
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
	loadtemplate();	//载入模板
	//loaddetailtemplate();
	bind();				//绑定事件
	//userbind();

	//updateuser();
	//$("#more").hide();
	//ptb();
	var URL=document.URL; 
	var arraytemp=new Array();
	arraytemp=URL.split("?");
	if(arraytemp[1]!=""&&arraytemp[1])
	{
		data1=arraytemp[1];
		showdetail(data1);
		//$("#detail-textarea").focus();
	}
	else{
		$(".td-normal:eq(5)").trigger("click");	//放入内容
	}
	
});

