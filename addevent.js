	var isOut = true;
	var isIn = false;
	var isOut2 = true;
	var isIn2 = false;
	var isOut3 = true;
	var isIn3 = false;
	var initurl = "initurl";
	var picstylewrong="<div id='picstyle-wrong'><p>这是什么啊~</p><p>换个服务器君认识的格式好嘛拜托了~</p></div>";
	var pictoobig="<div id='picstyle-wrong'><p>太大了，人家搬不动啦~</p></div>";
	var needtologin="<div id='picstyle-wrong'><p>登陆后才能使用这个功能哦~</p></div>";
	var picok="<div id='picstyle-wrong'><p>上传成功~</p></div>";
	var picok3="<div id='picstyle-wrong'><p>修改成功~</p></div>";
	var picok2="<div id='picstyle-wrong'><p>正在被审核</p><p><a href='http://stu.fudan.edu.cn/event/addorganization.html' style='text-decoration:underline;color:white;'>注册组织账号，</a>即可免去审核</p></div>"
	var confirm2="<div class='join-time-sbutton join-time-confirm-style' id='loginnow'>现在登录</div><div class='join-time-sbutton join-time-confirm-style' id='later'>随便逛逛</div>";
	var loadingcontent="<div id='picstyle-wrong'><p>祈祷中~</p></div>";
	var viewflag;
	$(document).ready(function() {

		var newlocation = "<li class='display'><p></p><div class='delete-icon' class='pointer delete-location' /></li>";
		var timedisplay = "<ul class='display'>" +
			"<li><div class='from'>从</div><div class='start-date-display'></div><div class='start-starttime-display'></div><div>~</div><div class='start-endtime-display'></div></li>" +
			"<li><div>至</div><div class='end-date-display'></div><div class='end-starttime-display'></div><div>~</div><div class='end-endtime-display'></div></li>" +
			"<div class='delete-newtime'><div class='delete-icon' /></div></div></ul>"
		var timedisplaysingle = "<ul class='display'>" +
			"<li><div></div><div class='start-date-display'></div><div class='start-starttime-display'></div><div>~</div><div class='start-endtime-display'></div></li>" +
			"<div class='delete-newtime'><div class='delete-icon' /></div></div></ul>"
		var geturlid=function(){
			var URL=document.URL; 
			var arraytemp=new Array();
			arraytemp=URL.split("?");
			return arraytemp[1];
		}
		function picstyle(content){	//报错消息
			$(".page").each(function(i,obj){
				obj=$(obj);
				if(obj.css("display")!="none"){
					obj.addClass("temp-hide");
					obj.hide();
				}
			})
			$("#container").css("background-image","url('img/face.png')");
			$("#container").append(content);
			$(".confirm-each").hide();
			$("#join-time-confirm").remove();
			$("#confirm").append("<div id='join-time-confirm' class='join-time-confirm-style'></div>");
			$("#join-time-confirm").append("<p id='back'>知道了</p>");
			$("#back").click(function(){
				$(".add-pic-url").val("");
				$("#container").css("background-image","none");
				$("container").css("background-image","url('img/corner-filter2.png')");
				$("#picstyle-wrong").hide();
				$("#join-time-confirm").hide();
				$(".temp-hide").show();
				$(".confirm-each").show();
			})

		}
		function picstyle2(content,string,id){	//报错消息
			$(".page").each(function(i,obj){
				obj=$(obj);
				if(obj.css("display")!="none"){
					obj.addClass("temp-hide");
					obj.hide();
				}
			})
			$("#container").css("background-image","url('img/happyface.png')");
			$("#container").css("background-position","72% 36%");
			$("#container").append(content);
			$(".confirm-each").hide();
			$("#join-time-confirm").remove();
			$("#confirm").append("<div id='join-time-confirm' class='join-time-confirm-style'></div>");
			$("#join-time-confirm").append("<p id='back'>马上去看"+string+"页面</p>");
			$("#title").attr("name",id);
			$("#back").click(function(){
				
				window.location.href="http://stu.fudan.edu.cn/event/main.html?"+$("#title").attr("name");
			});
		};
		function loading(){
			picstyle(loadingcontent);
			$('#confirm').hide();
		}
		function finish(data,viewflag){
			//$("#back").trigger("click");
			$(".confirm-each").hide();
			$("#confirm").show();
			$(".confirm-each").show();
			//$("#back").hide();
			$("#join-time-confirm").show();
			$("#picstyle-wrong").remove();
			if(viewflag==1){
				picstyle2(picok2,"活动",data);
			}	
			else{
				if(geturlid()&&geturlid()!=""){
					picstyle2(picok3,"活动",data);
				}
				picstyle2(picok,"活动",data);
			}
		}
		init = function() {
			$(".album-pic-wrap").hide();
			$(".check-alert").hide();
			$( ".datepicker" ).datepicker();
			$(".datepicker").datepicker('option',{dateFormat: "yy-mm-dd"});
			$("#add-time-content-before").hide();
			$("#add-time-content").hide();
			$("#add-time-multi").hide();
			$('#time-display').hide();
			$(".category-item").hide();
			$("#page2").hide();
			$("#page2-lec1").hide();
			$("#page2-lec2").hide();
			$("#inf-needed .click-box-square:eq(0)").trigger("click");
			$("#add-time-single-button").trigger("click");
			$("#add-time-single .time-input-short:eq(0)").val("18:30");
			$("#add-time-single .time-input-short:eq(1)").val("20:30");
			$("#add-time-single .short-time-show").hide();
			$("#page3").hide();
			$("#addition-page").hide();
			$("#prev p").text("详细设置");
			$("#prev p").css("color","#ff3333");
			$("#add-pic-net").hide();
			$("#page4").hide();
			$("#event-brand-input").hide();
			$("#add-full-day-wrap").hide();
			$("#event-alert-wrap").hide();
			$("#event-remark-wrap").hide();
			$("#event-alert-wrap .input").hide();
			$(".sub-category").hide();
			$("#set-numlimit input").hide();
			var myDate = new Date();
			var query = "";
			query = query + myDate.getFullYear() + "-";
			if (myDate.getMonth() + 1 < 10)
				query = query + "0";
			query = query + (myDate.getMonth() + 1);
			query = query + "-";
			if (myDate.getDate() < 10)
				query = query + "0";
			query = query + myDate.getDate();
			$(".long-time-show").html(query);
			query = "";
			if (myDate.getHours() < 10)
				query = query + "0";
			query = query + (myDate.getHours()) + ":";
			if (myDate.getMinutes() < 10)
				query = query + "0";
			query = query + (myDate.getMinutes());
			$(".short-time-show").html(query);
		}
		var re = /^[0-9]{4}-[0-1][0-9]-[0-3][0-9]$/;
		var re2 = /^[0-9]{4}\\[0-1][0-9]\\[0-3][0-9]$/;
		var re5 = /^[0-9]{4}\/[0-1][0-9]\/[0-3][0-9]$/;
		var re3 = /^[0-2][0-9]:[0-6][0-9]$/;
		var re4 = /^[0-2][0-9]：[0-6][0-9]$/;
		var data = function() {
			this.id;
			this.alert;
			this.AlertInf;
			this.EventType;
			this.Title;
			this.SubTitle;
			this.speaker;
			this.Class;
			this.Location;
			this.AttendMethod = -1;
			this.Type;
			this.Subtype;
			this.PublishTime;
			this.Publisher;
			this.Context;
			this.MultipleTime;
			this.series;
			this.brand;	
			this.speakerinf;
			this.remark;
			this.numlimit = -1;
			this.parameters;
			this.url;
		}
		var data1 = new data();
		function addinput(content,obj){
			if(content&&obj)
				obj.val(content);
		}
		function addsingleclick(index,obj){
			if(index&&obj)
				obj.find(".click-box-round")[index].addClass("click");
		}
		function addmulticlick(index,obj){
			if(index&&obj){
				var a=index;
				var i=0;
				while(a!=0){
					var anext=parseInt(a/2);
					if((a-anext*2)==1){
						obj.find(".click-box-square:eq("+i+")").addClass("click");
					}
					i=i+1;
					a=anext;
				}
			}
		}
		function addselect(index,obj){
			var check=false;
			obj.find(".category-item li").each(function(i,obj){
				if($(obj).html()==index){
					$(obj).trigger("click");
					check=true;
				}
			}) 
			if(check==false){
				obj.find(".category-item li.last").trigger("click");	
				obj.next().find("input").val(index);
			}
		}
		function addtime(times){
			var i;
			for(i=0;i<times.length;i++){
				if(times[i].IsRoutine=="0"){
					var arraytemp=new Array();
					arraytemp=times[i].StartTime.split("/");
					$("#add-time-single .time-input-long").val(arraytemp[0]);
					$("#add-time-single .time-input-short:eq(0)").val(arraytemp[1]);
					$("#add-time-single .time-input-short:eq(1)").val(arraytemp[2]);
					$("#add-time-confirm-single").trigger("click");
					$("#add-time-single .time-input-long").val("");
					$("#add-time-single .time-input-short:eq(0)").val("");
					$("#add-time-single .time-input-short:eq(1)").val("");

				}
				else{
					var arraytemp=new Array();
					arraytemp=times[i].StartTime.split("/");
					$("#add-time-multi .time-input-long:eq(0)").val(arraytemp[0]);
					$("#add-time-multi .time-input-short:eq(0)").val(arraytemp[1]);
					$("#add-time-multi .time-input-short:eq(1)").val(arraytemp[2]);
					$("#add-time-multi .time-input-long:eq(1)").val(times[i].EndTime);
					addmulticlick(times[i].routine,$("#add-time-multi .each-day"));
					$("#add-time-confirm-multi").trigger("click");
					$("#add-time-multi .time-input-long:eq(0)").val("");
					$("#add-time-multi .time-input-short:eq(0)").val("");
					$("#add-time-multi .time-input-short:eq(1)").val("");
					$("#add-time-multi .time-input-long:eq(1)").val("");
					$("#add-time-multi .each-day .click-box-square").removeClass("click");
				}
			}
		}
		function addcontent(id){
			var datatemp=function(){
				this.id=id;
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
				//console.log(json);
				addinput(json.Title,$("#event-title"));
				addinput(json.Subtitle,$("#event-sub-title"));
				addselect(json.Type,$("#main-category"));
				if(json.Subtype){
					if(json.Type=="讲座"){
						$("#lecture-addition").show();
						addselect(json.Subtype,$("#lecture-addition"));
					}
					if(json.Type=="出行"){
						$("#outgoing-addition").show();
						addselect(json.Subtype,$("#outgoing-addition"));
					}
					if(json.Type=="比赛"){
						$("#contest-addition").show();
						addselect(json.Subtype,$("#contest-addition"));
					}
					if(json.Type=="线上"){
						$("#online-addition").show();
						addselect(json.Subtype,$("#online-addition"));
					}
				}
				addinput(json.Location,$("#event-location"));
				addtime(json.multipletime);
				if(json.PublishTime){
					var publishtime=json.PublishTime;
					var starttimetemp=publishtime.StartTime;
					var arraytemp=new Array();
					arraytemp=starttimetemp.split("T");
					addinput(arraytemp[0],$("#enroll-time .time-input-long:eq(0)"));
					$("#enroll-time .time-input-long:eq(0)").trigger("click");
					var arraytemp2=new Array();
					arraytemp2=arraytemp[1].split(":");
					arraytemp[1]=arraytemp2[0]+":"+arraytemp2[1];
					addinput(arraytemp[1],$("#enroll-time .time-input-short:eq(0)"));
					$("#enroll-time .time-input-short:eq(0)").trigger("click");
					var publishtime=json.PublishTime;
					var endtimetemp=publishtime.EndTime;
					var arraytemp=new Array();
					arraytemp=endtimetemp.split("T");
					addinput(arraytemp[0],$("#enroll-time .time-input-long:eq(1)"));
					$("#enroll-time .time-input-long:eq(1)").trigger("click");
					var arraytemp2=new Array();
					arraytemp2=arraytemp[1].split(":");
					arraytemp[1]=arraytemp2[0]+":"+arraytemp2[1];
					addinput(arraytemp[1],$("#enroll-time .time-input-short:eq(1)"));
					$("#enroll-time .time-input-short:eq(1)").trigger("click");
				}
				if(json.Parameters){
					var para=json.Parameters.Para;
					var i=0;
					for(i=0;i<para.length;i++){
						if(para[i]!="手机"&&para[i]!="邮箱"&&para[i]!="年级"&&para[i]!="专业"&&para[i]!="性别"&&para[i]!="寝室"){
							$("#more-inf-needed input").val(para[i]);
							$("#more-inf-confirm").trigger("click");
							$("#more-inf-needed input").val("");
						}
						else{
							$("#inf-needed .inf-needed-each").attr("name",para[i]);
							$("#inf-needed .inf-needed-each").each(function(i,obj){
								if($(obj).find(".inf-needed-name").html()==$("#inf-needed .inf-needed-each").attr("name"))
								{
									$(obj).find(".click-box-square").addClass("click");
								}
								
							})
						}	

					}
				}
				if(parseInt(json.numlimit)>0){
					$('#set-numlimit input').val(json.numlimit);
					$("#set-numlimit .click-box-square").trigger("click");
				}
				var file = document.createElement("img");
				file.src = json.pic;
				$("#choose-pic-wrap").hide();
				$(".album-pic-wrap").show();
				$(".album-pic-wrap img").remove();
				$(".album-pic-wrap").prepend(file);
				$(".album-pic-wrap img").load(function()  
    			{   
    				var width = $(".album-pic-wrap img").width();
    				var height = $(".album-pic-wrap img").height();
    				$(".album-pic-wrap img").width("120px");
    				$(".album-pic-wrap img").height("180px");
					$(".album-pic-delete").css("margin-top","-180px");
					$(".album-pic-delete").css("margin-left",(120-22)+"px");
					
					
  				});
				$(".album-pic-delete").click(function() {
					$("#File1").val("");
					$(this).prev().remove();
					$(this).parent().hide();
					$("#choose-pic-wrap").show();
				})
				if(json.Type=="讲座"){
					var i;
					for(i=0;i<json.Speakers.length;i++){
						if(i>0){
							$("#add-speaker").trigger("click");
						}
						addinput(json.Speakers[i].Name,$("#page2-lec1 .speaker-name-input"));
						addselect(json.Speakers[i].Class,$("#page2-lec1 .speaker-cat-input"));
						$("#page2-lec1 .speaker-confirm").trigger("click");
					}
					addinput(json.speakerinf,$("#speaker-inf"));
					addinput(json.series,$("#event-series-input"));
					addselect(json.brand,$("#act-series-cat"));
					for(i=0;i<json.Publishers.length;i++){
						if(i>0){
							$("#add-raiser-lec").trigger("click");
						}
						addinput(json.Publishers[i],$("#page2-lec2 .main-raiser-input"));
						$("#page2-lec2 .main-raiser-confirm").trigger("click");
					}
					if(json.Context)
						addinput(json.Context,$("#page2-lec2 #act-intro"));
					if(json.NeedSubscribe=="true")
						$("#page2-lec2 #attend-method .clickbox:eq(0)").trigger("click");
					else
						$("#page2-lec2 #attend-method .clickbox:eq(1)").trigger("click");
					
				}
				if(json.Type!="讲座"){
					for(i=0;i<json.Publishers.length;i++){
						if(i>0){
							$("#add-raiser-normal").trigger("click");
						}
						addinput(json.Publishers[i],$("#page2 .main-raiser-input"));
						$("#page2 .main-raiser-confirm").trigger("click");
					}
					addinput(json.series,$("#act-series-input"));
					if(json.Context)
						addinput(json.Context,$("#page2 #act-intro"));
					if(json.NeedSubscribe=="true")
						$("#page2 #attend-method .clickbox:eq(0)").trigger("click");
					else
						$("#page2 #attend-method .clickbox:eq(1)").trigger("click");
				}

			}).fail(function(json){

			})
		}
		complete1 = function() {
			data1.EventType = $("#add-event-attr .clickbox").index($("#add-event-attr .click"));
			data1.Title = $("#event-title").val();
			data1.SubTitle = $("#event-sub-title").val();
			data1.Type = $("#main-category .category-show p").text();
			$("#page1 .sub-category").each(function(i, obj) {
				if ($(obj).css("display") != "none") {
					data1.Subtype = $(obj).find("p").text();
				}
			})

			function multipletime() {
				this.StartTime;
				this.EndTime;
				this.isroutine = 0;
				this.routine;
			}
			var times = new Array();
			$(".start-date-display").each(function(i, obj) {
				var multipletime1 = new multipletime();
				if ($(obj).html() != "")
					multipletime1.StartTime = $(obj).html() + "/" + $(obj).next().html() + "/" + $(obj).next().next().next().html();
				multipletime1.EndTime = $(obj).parent().next().find(".end-date-display").html();
				if (multipletime1.EndTime != "" && multipletime1.EndTime) {
					total = $(obj).attr("value");
					multipletime1.routine = total;
					if (total != 0) {
						multipletime1.isroutine = 1;
					}
				}
				times[i] = multipletime1;
			})
			data1.multipletime = times;

			data1.Location = $("#event-location").val();
			data1.alert = $("#event-alert-wrap .clickbox").index($("#event-alert-wrap .click"));
			if (data1.alert == 6 || data1.alert == 7 || data1.alert == 8) {
				data1.AlertInf = $("#event-alert-wrap .click").next().next().find(".time-input-long").val() + "/" + $("#event-alert-wrap .click").next().next().find(".time-input-short").val();
			}
			if ($("#event-remark").val())
				data1.remark = $("#event-remark").val();

		}
		complete3 = function() {
			var time1 = $("#enroll-time .time-input-long:eq(0)").val();
			var time2 = $("#enroll-time .time-input-short:eq(0)").val();
			var time3 = $("#enroll-time .time-input-long:eq(1)").val();
			var time4 = $("#enroll-time .time-input-short:eq(1)").val();
			var publishertime = function() {
				this.StartTime;
				this.EndTime;
			}
			var time5 = new publishertime();
			time5.StartTime = time1 + "/" + time2;
			time5.EndTime = time3 + "/" + time4;
			data1.PublishTime = time5;
			if ($("#set-numlimit input").css("display") != "none")
				data1.numlimit = $("#set-numlimit input").val();
			var array1 = new Array();
			var total = 0;
			$("#inf-needed .inf-needed-each .click").each(function(i, obj) {
					array1[i] = $(this).next().html();
			})
			data1.parameters=array1;
		}
		completelec2 = function() {
			var array1 = new Array();
			$("#lec-raiser-wrap .right .speaker-show").each(function(i, obj) {
				array1[i] = $(obj).find("p").text();
			})
			data1.Publisher = array1;
			if( $("#page2-lec2 #act-intro").val()!=null)
				data1.Context = $("#page2-lec2 #act-intro").val();
			data1.AttendMethod = $("#page2-lec2 #attend-method .clickbox").index($("#page2-lec2 #attend-method .click"));
			//console.log(data1);
		}
		completelec1 = function() {
			var array1 = new Array();
			$("#speaker-wrap .right .speaker-show").each(function(i, obj) {
				array1[i] = $(obj).find("p").text();
			})
			data1.speaker = array1;
			data1.speakerinf = $("#speaker-inf").val();
			data1.brand = $("#act-series-cat .category-show p").text();
			if(data1.brand=="请选择")
				data1.brand=null;
			if (data1.brand == "其他" && $("#act-series-cat").next().find("input").val() != "")
				data1.brand = $("#act-series-cat").next().find("input").val();
			data1.series = $("#event-series-input").val();
		}
		complete2 = function() {
			data1.Publisher = $("#page2 .main-raiser-input").val();
			data1.series = $("#page2 #act-series-input").val();
			if( $("#page2 #act-intro").val()!=null)
				data1.Context = $("#page2 #act-intro").val();;
			data1.AttendMethod = $("#page2 #attend-method .clickbox").index($("#page2 #attend-method .click"));
			var array1 = new Array();
			$("#main-raiser-wrap .right .speaker-show").each(function(i, obj) {
				array1[i] = $(obj).find("p").text();
			})
			data1.Publisher = array1;
		}
		complete = function() {

			
			//console.log(data1);
			loading();
			var options = {
				url:'http://stu.fudan.edu.cn/event/test_add_poster.aspx',
				type:'post',
				dataType:'json',
				success:function(data){
					if(data.success==1||data.success=="1"){
						finish(data.id,viewflag);
					}
					
				}

			}
			$("#add-pic-local-form").submit(function(){
				$("#add-pic-local-form").ajaxSubmit(options);
				return false;
			})	
			if(geturlid()!=null){
				tempurl="http://stu.fudan.edu.cn/event/ModifyEvent.aspx";
				data1.id=geturlid();
			}
			else
				tempurl="http://stu.fudan.edu.cn/event/test_addevent.aspx"
			$.ajax({

				url: tempurl,
				data: JSON.stringify(data1),
				dataType: 'json',
				contentType: "application/json;charset=utf-8",
				type: 'post',
				async: false,
			}).done(function(msg) {
				$("#add-pic-local-form").attr("action", "");
				//console.log(msg);
				if(msg.success=="1"||msg.success==1){
					viewflag=msg.ViewFlag;
					$("#add-pic-local-form").submit();

				}
			}).fail(function(msg) {	
				//console.log(msg);
				alert("似乎网络出现了一点问题，请检查~~" + msg);
			});
			

		}
		timetestlong = function(time1) {
			if (re.test(time1) || re2.test(time1) || re5.test(time1))
				return true;
			else
				return false;

		}
		timetestshort = function(time2) {
			if (re3.test(time2) || re4.test(time2))
				return true;
			else
				return false;
		}

		function ck(string, leng) {
			if(string.length>leng)
				string=string.substring(0,leng);
			return string;

		}
		checklength = function(obj) {
			if(obj[0]==$("#event-title")[0]||obj[0]==$("#event-sub-title")[0]){
				var string=(ck(obj.val(),100));
				if(string!=obj.val())
					obj.val(string);
			}
			if(obj[0]==$("#event-location")[0]){
				var string=(ck(obj.val(),30));
				if(string!=obj.val())
					obj.val(string);
			}
			if(obj.hasClass("speaker-show")){
				var string=(ck(obj.val(),50));
				if(string!=obj.val())
					obj.val(string);
			}
			if(obj[0]==$("#event-series-input")[0]||obj[0]==$("#event-brand-input")[0]||obj[0]==$("#act-series-input")[0]){
				var string=(ck(obj.val(),30));
				if(string!=obj.val())
					obj.val(string);
			}
			if(obj[0]==$("#speaker-inf")[0]){
				var string=(ck(obj.val(),100));
				if(string!=obj.val())
					obj.val(string);
			}
		}
		flicker=function(obj,inputobj){
			obj.addClass("checkonly-hover");
			var t=setTimeout(function(){
				obj.removeClass('checkonly-hover');
			},200);
			var t=setTimeout(function(){
				obj.addClass('checkonly-hover');
			},400);
			var t=setTimeout(function(){
				obj.removeClass('checkonly-hover');
			},600);
			var t=setTimeout(function(){
				obj.addClass('checkonly-hover');
			},800);
			inputobj.trigger("focus");
			inputobj.trigger("click");
		}
		bind = function() {
			$("#container-wrap").css("min-height",document.documentElement.clientHeight);
			$(".big-input").keydown(function(){
				
				if($(this)[0].scrollHeight>$(this).height()+2){
					$(this).height($(this)[0].scrollHeight);
				}
			})
			function deleteappend() {
				$(".delete-newtime").hide();
				$(".display").hover(function() {
					$(this).find(".delete-newtime").fadeIn();
				}, function() {
					$(this).find(".delete-newtime").fadeOut();
				})

			} 
			$("#more-inf-confirm").click(function(){
				var string=$(this).prev().val();
				if(string!=""&&string!=null){
					//alert(string.length);
					if(string.length>4){
						var errorcode=-6;
						var errormsg=handleerror($("#more-inf-needed").next(),errorcode);
					}
					else{
						$("#inf-needed .input-wrap").append("<div class='inf-needed-each'><div class='click-box-square click clickboxmul'></div><div class='inf-needed-name'>"+$(this).prev().val()+"</div></div>");
						
						$("#inf-needed .clickboxmul:last").on("click", function() {
							if (!$(this).hasClass("click")) {
								$(this).addClass("click");
			
							} else {
								$(this).removeClass("click");
								$(this).parent().find(".clickbox-special").removeClass("click")
							}
		
						})
						$(this).prev().val("");
					}
				}
	
			})
			$(".time-input-short").mouseout(function() {
				isOut3 = true;
			})
			$(".time-input-short").mouseover(function() {
				isOut3 = false;
			})
			$("#time-selecter-wrap").mouseout(function() {
				isIn3 = false;
			})
			$("#time-selecter-wrap").mouseover(function() {
				isIn3 = true;
			})

			
			$("#add-time-multi .time-input-short").keyup(function(){
				var index=$(this).index("#add-time-multi .time-input-short");
				$("#add-time-multi .short-time-show.null:eq("+index+")").html($(this).val());
			})	
			$("input").on("keyup",function(){
				checklength($(this));
			})
			$("#set-numlimit .clickboxmul").click(function() {
				if ($(this).hasClass("click")) {
					$("#set-numlimit input").fadeOut();
				} else
					$("#set-numlimit input").fadeIn();
			})
			$('input.null').css("background-color", "#cccccc");
			$('input.null').attr("disabled", "disabled");
			$(document).on("focus","input,textarea",function(){
				$("input.click,textarea.click").removeClass("click");
				$(this).addClass("click");
			})
			$("#next").click(function() {
				var empty = false;
				var j = 0;
				var mainpage=false;
				var page3=false;
				var additionpage=false;
				var page4=false;
				var page2=false;
				var page2lec1=false;
				/**if ($("#page1").css("display") != "none")
					page = "#page1";
				if ($("#page2").css("display") != "none")
					page = "#page2";
				if ($("#page2-lec1").css("display") != "none")
					page = "#page2-lec1";
				if ($("#page2-lec2").css("display") != "none")
					page = "#page2-lec2";
				if ($("#page3").css("display") != "none")
					page = "#page3";**/
				if ($("#main-page").css("display")!="none")
					mainpage=true;
				if ($("#page4").css("display") != "none")
					page4=true;
				if ($("#page3").css("display") != "none")
					page3=true;
				if ($("#page2").css("display") != "none")
					page2=true;
				if ($("#page2-lec1").css("display") != "none")
					page2lec1=true;
				if ($("#addition-page").css("display") != "none")
					additionpage=true;
				if (page4==true) {
					complete();
				}
				if(mainpage==true){
					var checknecessary=function(obj){
						$(obj+" .necessary").parent().next().find("input,textarea").each(function(i, obj) {
							if ($(obj).val() == "") {
								empty = true;
								if (j == 0) {
									$(obj).addClass("click");
									$(obj).focus();
								}
								j = j + 1;
							}
						});
					}
					checknecessary("#page1");
					if(page2==true){
						checknecessary("#page2");
					}
					if(page2lec1==true){
						checknecessary("#page2-lec1");
						checknecessary("#page2-lec2");
					}
					
					if($("#time-display").find("li") == null)
						empty=true;
					if ($("#time-display ul").size() == 0)
						empty = true;
					if ($("#page2-lec1").css("display")!="none" && $("#event-brand-input").css("display") != "none" && $("#event-brand-input").val() == "") {
						$("#event-brand-input").focus();
						empty = true;
					}
					if ($("#page2-lec1").css("display")!="none" && $("#speaker-wrap .right").find(".speaker-show").size() == 0) {
					
						flicker($('#page2-lec1 .speaker-confirm'),$("#page2-lec1 .speaker-name-input"));
						empty = true;
					}
					if ($("#page2").css("display")!="none" && $("#main-raiser-wrap .right").find(".speaker-show").size() == 0) {
						flicker($("#page2 .main-raiser-confirm"),$("#page2 .main-raiser-input"));
						empty = true;
					}
					if ($("#page2-lec2").css("display")!="none" && $("#lec-raiser-wrap .right").find(".speaker-show").size() == 0) {
						flicker($("#page2-lec2 .main-raiser-confirm"),$("#page2-lec2 .main-raiser-input"));
						empty=true;
					}
					if (!$("#event-personal").hasClass("click")) {
						$("#page1 .category-each").each(function(i, obj) {
							if ($(obj).css("display") != "none") {
								if ($(obj).find("p").text() == "请选择")
									empty = true;
							}
						})
					}
					if($("#event-personal").hasClass("click")){
						if($("#event-alert-wrap").find(".click").get(0)==null)
							empty=true;
						$("#event-alert-wrap").find(".input").each(function(i,obj){
							if($(obj).css("display")!="none"){
								$(obj).find("input").each(function(j,obj2){
									if($(obj2).val()=="")
										empty=true;
								})
							}
						})
					}
					if (page3==true) {
						var time1 = $("#enroll-time .time-input-long:eq(0)").val();
						var time2 = $("#enroll-time .time-input-short:eq(0)").val();
						var time3 = $("#enroll-time .time-input-long:eq(1)").val();
						var time4 = $("#enroll-time .time-input-short:eq(1)").val();
						var data=function(){
							this.flag=3;
							this.d1;
							this.d2;
							this.t1;
							this.t2;
						}
						var data2=new data();
						data2.d1=time1;
						data2.d2=time3;
						data2.t1=time2;
						data2.t2=time4;
						$.ajax({
						url: "http://stu.fudan.edu.cn/event/Check_Datetime.aspx",
						data: data2,
						dataType: "text",
						type: 'GET',
						async: false,
						}).done(function(errorcode){
							var errormsg=handleerror($("#page3 .check-alert"),errorcode);
							if(errorcode!=0){
								empty=true;
								$("#enroll-time input:eq(0)").trigger("click");
							}
							else{
								empty=false;
							}
	
						}).fail(function(){
	
						})

					}

					if (!empty) {
						var txt = /讲座/;
						if (txt.test($("#main-category .category-show p").text())) {

							if (page3==true) {
								if($("#act-series-cat").next().find("input").val()=="")
									$("#act-series-cat .category-item li:eq(0)").trigger("click");
								} 
								complete3();
								//$("#page3").hide();
								$("#page4").show();
								if(geturlid()==null)
									$("#next p").text("去发布");
								else
									$("#next p").text("完成修改");
								//console.log(data1);
							}
							if ($("#page2-lec2").css("display") != "none") {
								completelec2();
								//$("#page2-lec2").hide();
								if (data1.AttendMethod == 0) {
									$("#page3").attr("name", "1");
									$("#page3").show();
								} else {
									$("#page4").show();
									if(geturlid()==null)
										$("#next p").text("去发布");
									else
										$("#next p").text("完成修改");
									$("#page4").attr("name","1");
								}
							}
							if ($("#page2-lec1").css("display") != "none") {
								completelec1();
							}
							if ($("#page2").css("display") != "none") {
								complete2();
								//$("#page2").hide();
								if (data1.AttendMethod == 0) {
									$("#page3").attr("name", "0");
									//$("#page3").show();
								} else {
									$("#page4").show();
									if(geturlid()==null)
										$("#next p").text("去发布");
									else
										$("#next p").text("完成修改");
									$("#page4").attr("name","0");
								}
							}
							if ($("#page1").css("display") != "none") {
								complete1();
								//$("#page1").hide();
								$("#prev p").text("上一步");
								
							}
							$("#prev p").text("上一步");
							$("#prev p").css("color","white");
							$("#main-page").hide();
						}
						
	
					}
				}
				

				/**if (page == "#page1" && $("#time-display").find("li") == null) {
					empty = true;
				}**/
				
				/**if (page == "#page2-lec1" && $("#event-brand-input").css("display") != "none" && $("#event-brand-input").val() == "") {
					$("#event-brand-input").focus();
					empty = true;
				}**/
				
				/**if ($("#event-personal").hasClass("click") && page == "#page1") {
					var index = $("#event-alert-wrap .clickbox").index($("#event-alert-wrap .click"));
					if (index == 6 || index == 7 || index == 8) {
						var time1 = $("#event-alert-wrap .click").next().next().find(".time-input-long").val();
						var time2 = $("#event-alert-wrap .click").next().next().find(".time-input-short").val();
						if (time1 == "" || time2 == "")
							empty = true;
						if (!(timetestlong(time1) && timetestshort(time2))) {
							empty = true;
							alert("日期格式不正确！");
						}
					}
				}**/
				
			})
			$("#prev").click(function() {
				if($(this).find("p").text()=="详细设置")
				{
					$("#addition-page").slideDown();
				}
				else{
					$("#main-page").show();
					$("#page4").hide();
					$("#prev p").text("详细设置");
					$("#prev p").css("color","#ff3333");
				}
				/**if ($("#page2").css("display") != "none") {
					$("#page2").hide();
					$("#prev p").text("详细设置");
					$("#prev p").css("color","#ff3333");
					$("#page1").show();
				}
				if ($("#page2-lec1").css("display") != "none") {
					$("#page2-lec1").hide();
					$("#page1").show();
					$("#prev p").text("详细设置");
					$("#prev p").css("color","#ff3333");
				}
				if ($("#page2-lec2").css("display") != "none") {
					$("#page2-lec2").hide();
					$("#page2-lec1").show();
				}
				if ($("#page3").css("display") != "none") {
					if ($("#page3").attr("name") == 1) {
						$("#page2-lec2").show();
					} else
						$("#page2").show();
					$("#page3").hide();
				}
				if ($("#page4").css("display") != "none") {
					$("#next p").text("下一步");
					$("#page4").hide();
					if(data1.AttendMethod==0)
						$("#page3").show();
					else{
						if($("#page4").attr("name")==1)
							$("#page2-lec2").show();
						else
							$("#page2").show();
					}
				}**/


			})
			$("#add-time-multi-button").on("click", function() {
				$("#add-time-single").hide();
				$("#add-time-multi").show();
				$("#add-time-content").hide();
				$("#add-time-content").slideDown();
				$("#add-time-content-before").css("margin-left","290px");
				$("#add-time-content-before").show();

			})
			$("#add-time-single-button").on("click", function() {
				$("#add-time-multi").hide();
				$("#add-time-single").show();
				$("#add-time-content").hide();
				$("#add-time-content").slideDown();
				$("#add-time-content-before").css("margin-left","157px");
				$("#add-time-content-before").show();
			})

			$(".show").on("click", function() {
				if (!$(this).hasClass('null')) {
					$(this).prev().focus();
					$(this).hide();
				}
			})
			$("input").on("click", function() {
				if ($(this).next().hasClass("show") && !$(this).hasClass("null")) {
					$(this).next().hide();
				}
			})
			$("input").on("focus", function() {
				if ($(this).next().hasClass("show") && !$(this).hasClass("null")) {
					$(this).next().hide();
				}
			})
			$("input").on("blur", function() {
				if ($(this).next().hasClass("show") && $(this).val() == ""&&$("#time-selecter-wrap").css("display")=="none") {
					$(this).next().show();
				}
				if($("#time-selecter-wrap").css("display")=="none"&&$("#ui-datepicker-div").css("display")=="none")
					$(this).removeClass("click");
			})
			$(".datepicker").change(function(){

				if($(this).val()!=""){
					if ($(this).next().hasClass("show"))
						$(this).next().hide();
				}
			})
			$(".clickbox").on("click", function() {
				$(this).parent().parent().find(".click").removeClass("click");
				$(this).addClass("click");

			})
			$(".clickboxmul").on("click", function() {
				if (!$(this).hasClass("click")) {
					$(this).addClass("click");

				} else {
					$(this).removeClass("click");
					$(this).parent().find(".clickbox-special").removeClass("click")
				}

			})
			$(".clickbox-special").on("click", function() {
				if (!$(this).hasClass("click")) {
					$(this).addClass("click");
					$(this).parent().find(".clickboxmul").addClass("click")
				} else {
					$(this).removeClass("click");
					$(this).parent().find(".clickboxmul").removeClass("click")
				}
			})
			$("#event-public").on("click", function() {
				$("#add-event-attr-alert-before").animate({"margin-left":"157px"});
				$("#add-event-attr-alert p").text("对所有人可见，所有人均可参与");
				$("#add-full-day-wrap").hide();
				$("#event-subtitle-wrap").show();
				$("#category-wrap").show();
				$("#event-alert-wrap").hide();
				$("#event-remark-wrap").hide();
			})	
			$("#event-inside").on("click", function() {
				$("#add-event-attr-alert-before").animate({"margin-left":"260px"});
				$("#add-event-attr-alert p").text("只能通过网址访问，不在首页显示，不可被搜索，且不能推送到日程");
				$("#add-full-day-wrap").hide();
			})
			$("#event-personal").on("click", function() {
				$("#add-event-attr-alert-before").animate({"margin-left":"260px"});
				$("#add-event-attr-alert p").text("只添加进个人日历");
				$("#add-full-day-wrap").show();
				$("#event-subtitle-wrap").hide();
				$("#category-wrap").hide();
				$("#event-alert-wrap").show();
				$("#event-remark-wrap").show();
			})
			handleerror = function(obj,errorcode){
				var errormsg="";
				if(errorcode==-1){
					errormsg="日期错误";
				}
				if(errorcode==-4){
					errormsg=("结束时间应晚于开始时间");
				}
				if(errorcode==-3){
					errormsg=("时间错误");
				}
				if(errorcode==-2){
					errormsg=("结束日期应晚于开始日期");
				}
				if(errorcode==-5){
					errormsg=("请选择重复频率");
				}
				if(errorcode==-6){
					errormsg=("不超过4个字");
				}
				if(errormsg==""){
					obj.empty();
					obj.hide();	
				}
				else{
					obj.html(errormsg);
					obj.show();
				}
				return errormsg;
			}
			$("#add-time-confirm-multi").on("click", function() {
				var startdate = $("#add-time-multi .time-input-long:eq(0)").val();
				var enddate = $("#add-time-multi .time-input-long:eq(1)").val();
				var startstarttime = $("#add-time-multi .time-input-short:eq(0)").val();
				var startendtime = $("#add-time-multi .time-input-short:eq(1)").val();
				var show = false;
				/**if (startdate == "" || enddate == "" || startstarttime == "" || startendtime == "") {
					show = false;
					alert("日期输入不可为空!");
				}

				var style = true;
				if ((!timetestlong(startdate)) || (!timetestlong(enddate)))
					style = false;
				if ((!timetestshort(startstarttime)) || (!timetestshort(startendtime)))
					style = false;
				if (style == false) {
					if (show)
						alert("日期格式不正确！");
					show = false;
				}**/
				var j = 0;
				$("#add-time-multi .each-day .click-box-square").each(function(i, obj) {
					if ($(obj).hasClass("click"))
						j = j + 1;
				})
				if (j == 0)
					show = false;
			
				var data=function(){
					this.flag=1;
					this.d1;
					this.d2;
					this.t1;
					this.t2;
				}
				var data1=new data();
				data1.d1=startdate;
				data1.d2=enddate;
				data1.t1=startstarttime;
				data1.t2=startendtime;
				$.ajax({
					url: "http://stu.fudan.edu.cn/event/Check_Datetime.aspx",
					data: data1,
					dataType: "text",
					type: 'GET',
					async: false,
				}).done(function(errorcode){
					var errormsg=handleerror($("#add-time-multi .check-alert"),errorcode);
					if(errorcode==0)
						show=true;

				}).fail(function(){

				})
				var array1 = new Array();
				var total = 0;
				$("#add-time-multi .each-day .click").each(function(i, obj) {
					array1[i] = $("#add-time-multi .each-day .click-box-square").index($(obj));
					total = total + Math.pow(2, array1[i]);
				})
				var errorcode=0;
				if(total==0){
					var errormsg=handleerror($("#add-time-multi .check-alert"),-5);
					show=false;
				}
				

			
				if (show) {
					$("#time-display").show();
					$("#time-display").append(timedisplay);
					deleteappend();
					$("#time-display ul:last .start-date-display").text(startdate);
					$("#time-display ul:last .end-date-display").text(enddate);
					$("#time-display ul:last .start-starttime-display").text(startstarttime);
					$("#time-display ul:last .start-endtime-display").text(startendtime);
					$("#time-display ul:last .end-starttime-display").text(startstarttime);
					$("#time-display ul:last .end-endtime-display").text(startendtime);
					$("#time-display ul:last .delete-newtime").on("click", function() {
						$(this).parent().remove();
					})
					$("#add-time-content-before").hide();
					$("#add-time-content").slideUp();
					$("#time-display ul:last .start-date-display").attr("value", total);
					
				}


			})
			$("#add-time-confirm-single").on("click", function() {
				var startdate = $("#add-time-single .time-input-long:eq(0)").val();
				var starttime = $("#add-time-single .time-input-short:eq(0)").val();
				var endtime = $("#add-time-single .time-input-short:eq(1)").val();
				var show =false;
				/**if (startdate == "" || starttime == "" || endtime == "") {
					show = false;
					alert("日期输入不可为空!");
				}
				var style = true;
				if ((!timetestlong(startdate)))
					style = false;
				if ((!timetestshort(starttime)) || (!timetestshort(endtime)))
					style = false;
				if (style == false) {
					if (show)
						alert("日期格式不正确！");
					show = false;
				}**/
				var data=function(){
					this.flag=0;
					this.d1;
					this.t1;
					this.t2;
				}
				var data1=new data();
				data1.d1=startdate;
				data1.t1=starttime;
				data1.t2=endtime;
				$.ajax({
					url: "http://stu.fudan.edu.cn/event/Check_Datetime.aspx",
					data: data1,
					dataType: "text",
					type: 'GET',
					async: false,
				}).done(function(errorcode){
					var errormsg=handleerror($("#add-time-single .check-alert"),errorcode);
					
					if(errorcode==0)
						show=true;

				}).fail(function(){

				})
				if (show) {

					$("#time-display").show();
					$("#time-display").append(timedisplaysingle);
					deleteappend();
					$("#time-display .display ul:last .from").hide();
					$("#time-display ul:last .start-date-display").text(startdate);
					$("#time-display ul:last .start-starttime-display").text(starttime);
					$("#time-display ul:last .start-endtime-display").text(endtime);
					$("#time-display ul:last .delete-newtime").on("click", function() {
						$(this).parent().remove();
					})
					$("#add-time-content").slideUp();
					$("#add-time-content-before").hide();
				}



			})
			$("#add-time-content").mouseout(function() {
				isOut2 = true;
			})
			$("#add-time-content").mouseover(function() {
				isOut2 = false;
			})
			$(".add-time-button-each").mouseout(function() {
				isIn2 = false;
			})
			$(".add-time-button-each").mouseover(function() {
				isIn2 = true;
			})
			$("#container").click(function() {
				if (isOut2 && !isIn2)
				{
					//$("#add-time-content").slideUp();
					//$("#add-time-content-before").hide();
				}
			})
			$(".delete-location").on("click", function() {
				$(this).prev().remove();
				$(this).remove();
			})
			$("#ticket-location-confirm").on("click", function() {
				if ($("#ticket-location input").val() != "") {
					$("#ticket-location-display ul").append(newlocation);
					deleteappend();
					$("#ticket-location-display ul li:last p").text($("#ticket-location input").val());
					$("#ticket-location-display ul li:last img").click(function() {
						$(this).prev().remove();
						$(this).remove();
					})
				}
			})

			$(".category-button").on("click", function() {
				if (!$(this).hasClass("click")) {
					$(this).addClass("click");
					$(this).next().show();
				} else {
					$(this).removeClass("click");
					$(this).next().hide();
				}
			})
			document.onmousedown = function() {

				if (isOut && !isIn) {
					$(".category-item").hide();
					$(".category-button").removeClass("click");
				}
				if (isOut3 && !isIn3) {
					$("#time-selecter-wrap").fadeOut();
				}
			}
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
			$(".category-item li").on("click", function() {
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
			$("#main-category .category-item li").on("click", function() {
				$(".sub-category").hide();
				if ($(this).text() == "讲座"){
					$("#lecture-addition").show();
					$("#page2").slideUp();
					$("#page2-lec1").slideDown();
					$("#page2-lec2").slideDown();
				}
				else{
					$("#page2").slideDown();
					$("#page2-lec1").slideUp();
					$("#page2-lec2").slideUp();
				}
				if ($(this).text() == "出行")
					$("#outgoing-addition").show();
				if ($(this).text() == "线上") {
					$("#online-addition").show();
					$("#event-location-wrap").slideUp();
					$("#page1 #event-location-wrap .necessary").addClass("necessary-hide");
					$("#page1 #event-location-wrap .necessary").removeClass("necessary");
				}
				else
				{
					$("#event-location-wrap").slideDown();
					$("#page1 #event-location-wrap .necessary-hide").addClass("necessary");
					$("#page1 #event-location-wrap .necessary-hide").removeClass("necessary-hide");
				}
				if ($(this).text() == "比赛"){
					$("#contest-addition").slideUp();
					$("#page1 #event-location-wrap .necessary").slideDown();
					$("#page1 #event-location-wrap .necessary").addClass("necessary-hide");
					$("#page1 #event-location-wrap .necessary").removeClass("necessary");
				}
				if($(this).text()!="比赛"&&$(this).text()!="线上")
				{
					$("#page1 #event-location-wrap .necessary-hide").slideUp();
					$("#page1 #event-location-wrap .necessary-hide").addClass("necessary");
					$("#page1 #event-location-wrap .necessary-hide").removeClass("necessary-hide");
				}
			})
			$("#act-series-cat li").click(function() {
				if (!$(this).hasClass("last"))
					$("#event-brand-input").hide();
				else {
					$("#event-brand-input").show();
					$("#event-brand-input").focus();
				}
			})
			$("#choose-pic").click(function(){
				$("#File1").trigger("click");
			})
			$("#File1").change(function() {
				var obj = $("#File1")[0];
				var url = window.URL.createObjectURL(obj.files[0]);
				//var url = document.selection.createRange().text;
				var URL = window.URL || window.webkitURL,
					imageUrl, image;
				var file = document.createElement("img");
				file.src = url;
				var style = true;
				if (parseInt(obj.files[0]).size > 0 && parseInt(obj.files[0].size) < (1024 * 1024 * 4)) {
					style = false;
					ptb();
				}
				var str = new Array();
				str = obj.files[0].type.split('/');	
				if (str[0] != "image") {
					style = false;
					psw();
				}
				if (style) {
					$("#choose-pic-wrap").hide();
					$(".album-pic-wrap").show();
					$(".album-pic-wrap img").remove();
					$(".album-pic-wrap").prepend(file);
					$(".album-pic-wrap img").load(function()  
    				{   
    					var width = $(".album-pic-wrap img").width();
    					var height = $(".album-pic-wrap img").height();
    					$(".album-pic-wrap img").width("120px");
    					$(".album-pic-wrap img").height("180px");
						$(".album-pic-delete").css("margin-top","-180px");
						$(".album-pic-delete").css("margin-left",(120-22)+"px");
						
						
  					});
					$(".album-pic-delete").click(function() {
						$("#File1").val("");
						$(this).prev().remove();
						$(this).parent().hide();
						$("#choose-pic-wrap").show();
					})
				} else {

				}
				file.onload = function() {
					URL.revokeObjectURL(url);
				}

			})
			$("#add-fullday").click(function() {
				if (!$(this).hasClass("click")) {
					$("#add-time-single .time-input-short:eq(0)").val("00:00");
					$("#add-time-single .time-input-short:eq(1)").val("24:00");
					$("#add-time-single .time-input-short:eq(0)").attr("disabled", "disabled");;
					$("#add-time-single .time-input-short:eq(1)").attr("disabled", "disabled");
					$("#add-time-single .add-time-show1").hide();
					$("#add-time-single .add-time-show2").hide();
					$(this).addClass("click");
				} else {
					$("#add-time-single .time-input-short:eq(0)").val("");
					$("#add-time-single .time-input-short:eq(1)").val("");
					$("#add-time-single .time-input-short:eq(0)").removeAttr("disabled");
					$("#add-time-single .time-input-short:eq(1)").removeAttr("disabled");
					$("#add-time-single .add-time-show1").show();
					$("#add-time-single .add-time-show2").show();
					$(this).removeClass("click");
				}
			})
			$(".add-pic-method-each:eq(0) .clickbox").click(function() {
				$("#add-pic-net").hide();
				$("#add-pic-local").show();
			})
			$(".add-pic-method-each:eq(1) .clickbox").click(function() {
				$("#add-pic-net").show();
				$("#add-pic-local").hide();
			})
			$(".add-pic-confirm").click(function() {
				var url = $("#add-pic-net .add-pic-url").val();
				if (url == "")
					url = "http://stu.fudan.edu.cn/event/img/picture.png";
				var file = document.createElement("img");
				file.src = url;
				$("#add-pic-net .pic-show").empty();
				$(file).css("width", "120px");
				$(file).css("height", "180px");
				$("#add-pic-net .pic-show").append(file);
				$("#add-pic-net .pic-show").append("<div class='pic-show-delete'></div>");
				$(".pic-show-delete").click(function() {
					$(this).parent().prev().prev().val("");
					$(this).parent().empty();

				})
			})
			$(".speaker-confirm").on("click", function() {
				if ($(this).prev().find(".category-show").find("p").text() != "请选择" && $(this).prev().prev().val() != "") {
					var query = $(this).prev().prev().val() + "&nbsp&nbsp&nbsp&nbsp" + $(this).prev().find(".category-show").find("p").text();
					if ($("#speaker-wrap .right .speaker-show").get(0))
						$("#speaker-wrap .right .speaker-show:last").after("<div class='speaker-show'><p>" + query + "</p><div class='delete-newtime'><div class='delete-icon'></div></div></div>");
					else
						$("#speaker-wrap .right").prepend("<div class='speaker-show'><p>" + query + "</p><div class='delete-newtime'><div class='delete-icon' /></div></div></div>");
					$("#speaker-wrap .right .speaker-show:last .delete-newtime").hide();
					$("#speaker-wrap .speaker-show:last").hover(function() {
						$(this).find(".delete-newtime").fadeIn();
					}, function() {
						$(this).find(".delete-newtime").fadeOut();
					})
					$("#speaker-wrap .speaker-show:last .delete-newtime").on("click", function() {
						$(this).parent().remove();
						if (!$("#speaker-wrap .right .speaker-show").get(0)&&!$("#speaker-wrap .right .speaker-confirm").get(0))
							addspeaker();

					})
					$(this).parent().empty();
				}
			})
			$("#page2 .main-raiser-confirm").on("click", function() {
				if ($(this).prev().val() != "") {
					var query = $(this).prev().val();
					if ($("#main-raiser-wrap .right .speaker-show").get(0))
						$("#main-raiser-wrap .right .speaker-show:last").after("<div class='speaker-show'><p>" + query + "</p><div class='delete-newtime'><div class='delete-icon'></div></div></div>");
					else
						$("#main-raiser-wrap .right").prepend("<div class='speaker-show'><p>" + query + "</p><div class='delete-newtime'><div class='delete-icon'></div></div></div>");
					$("#main-raiser-wrap .right .speaker-show:last .delete-newtime").hide();
					$("#main-raiser-wrap .speaker-show:last").hover(function() {
						$(this).find(".delete-newtime").fadeIn();
					}, function() {
						$(this).find(".delete-newtime").fadeOut();
					})
					$("#main-raiser-wrap .speaker-show:last .delete-newtime").on("click", function() {

						$(this).parent().remove();
						if (!$("#main-raiser-wrap .right .speaker-show").get(0)&&!$("#main-raiser-wrap .right .main-raiser-confirm").get(0))
							addmainraiser();
					})
					$(this).parent().empty();
				}
			})
			$("#page2-lec2 .main-raiser-confirm").on("click", function() {
				if ($(this).prev().val() != "") {
					var query = $(this).prev().val();
					if ($("#lec-raiser-wrap .right .speaker-show").get(0))
						$("#lec-raiser-wrap .right .speaker-show:last").after("<div class='speaker-show'><p>" + query + "</p><div class='delete-newtime'><div class='delete-icon' /></div></div></div>");
					else
						$("#lec-raiser-wrap .right").prepend("<div class='speaker-show'><p>" + query + "</p><div class='delete-newtime'><div class='delete-icon' /></div></div></div>");
					$("#lec-raiser-wrap .right .speaker-show:last .delete-newtime").hide();
					$("#lec-raiser-wrap .speaker-show:last").hover(function() {
						$(this).find(".delete-newtime").fadeIn();
					}, function() {
						$(this).find(".delete-newtime").fadeOut();
					})
					$("#lec-raiser-wrap .speaker-show:last .delete-newtime").on("click", function() {

						$(this).parent().remove();
						if (!$("#lec-raiser-wrap .right .speaker-show").get(0)&&!$("#lec-raiser-wrap .right .main-raiser-confirm").get(0))
							addlecraiser();
					})
					$(this).parent().empty();
				}
			})

			function addspeaker() {
				var html = "<div class='input-wrap'><input type='text' class='speaker-name-input'/><div class='choosebox category-each speaker-cat-input'>" + "<div class='category-show'><p>请选择</p></div><div class='category-button'></div><div class='category-item'>" + "<ul><li>老师</li><li>教授</li><li>副教授</li><li>讲师</li><li>研究员</li><li>副研究员</li><li>院士</li><li>先生</li><li class='last'>女士</li></ul></div></div>" + "<div class='speaker-confirm checkonly pointer'></div></div>"
				$("#speaker-wrap .right .input-wrap:last").after(html);
				$("#speaker-wrap .category-item").hide();
				$("#speaker-wrap .category-button:last").on("click", function() {
					if (!$(this).hasClass("click")) {
						$(this).addClass("click");
						$(this).next().show();
					} else {
						$(this).removeClass("click");
						$(this).next().hide();
					}
				})
				$("#speaker-wrap .speaker-name-input:last").on("click", function() {
					$("input.click").removeClass("click");
					$(this).addClass("click");
				})
				document.onmousedown = function() {

					if (isOut && !isIn) {
						$(".category-item").hide();
						$(".category-button").removeClass("click");
					}
				}
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
				$(".category-item li").on("click", function() {
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
				$("#speaker-wrap .speaker-confirm:last").on("click", function() {
					if ($(this).prev().find(".category-show").find("p").text() != "请选择" && $(this).prev().prev().val() != "") {
						var query = $(this).prev().prev().val() + "&nbsp&nbsp&nbsp&nbsp" + $(this).prev().find(".category-show").find("p").text();
						if ($("#speaker-wrap .right .speaker-show").get(0))
							$("#speaker-wrap .right .speaker-show:last").after("<div class='speaker-show'><p>" + query + "</p><div class='delete-newtime'><div class='delete-icon' /></div></div></div>");
						else
							$("#speaker-wrap .right").prepend("<div class='speaker-show'><p>" + query + "</p><div class='delete-newtime'><div class='delete-icon' /></div></div></div>");
						$("#speaker-wrap .right .speaker-show:last .delete-newtime").hide();
						$("#speaker-wrap .speaker-show:last").hover(function() {
							$(this).find(".delete-newtime").fadeIn();
						}, function() {
							$(this).find(".delete-newtime").fadeOut();
						})
						$("#speaker-wrap .speaker-show:last .delete-newtime").on("click", function() {
							$(this).parent().remove();
							if (!$("#speaker-wrap .right .speaker-show").get(0)&&!$("#speaker-wrap .right .speaker-confirm").get(0))
								addspeaker();

						})
						$(this).parent().empty();
					}
				})
			}
			$("#add-speaker").on("click", function() {

				addspeaker();
			})

			function addlecraiser() {
				var html = "<div class='input-wrap'>" + "	<input type='text' class='main-raiser-input normal-input'/>" + "<div class='main-raiser-confirm checkonly pointer'></div></div>";
				$("#lec-raiser-wrap .right .input-wrap:last").after(html);
				$("#lec-raiser-wrap .normal-input:last").on("click", function() {
					$("input.click").removeClass("click");
					$(this).addClass("click");
				})
				$("#lec-raiser-wrap .main-raiser-confirm:last").on("click", function() {
					if ($(this).prev().val() != "") {
						var query = $(this).prev().val();
						if ($("#lec-raiser-wrap .right .speaker-show").get(0))
							$("#lec-raiser-wrap .right .speaker-show:last").after("<div class='speaker-show'><p>" + query + "</p><div class='delete-newtime'><div class='delete-icon' /></div></div></div>");
						else
							$("#lec-raiser-wrap .right").prepend("<div class='speaker-show'><p>" + query + "</p><div class='delete-newtime'><div class='delete-icon' /></div></div></div>");
						$("#lec-raiser-wrap .right .speaker-show:last .delete-newtime").hide();
						$("#lec-raiser-wrap .speaker-show:last").hover(function() {
							$(this).find(".delete-newtime").fadeIn();
						}, function() {
							$(this).find(".delete-newtime").fadeOut();
						})
						$("#lec-raiser-wrap .speaker-show:last .delete-newtime").on("click", function() {
							$(this).parent().remove();
							if (!$("#lec-raiser-wrap .right .speaker-show").get(0)&&!$("#lec-raiser-wrap .right .main-raiser-confirm").get(0))
								addlecraiser();

						})
						$(this).parent().empty();
					}
				})
			}
			$("#add-raiser-lec").on("click", function() {

				addlecraiser();
			})

			function addmainraiser() {
				var html = "<div class='input-wrap'>" + "	<input type='text' class='main-raiser-input' class='normal-input'/>" + "<div class='main-raiser-confirm checkonly pointer'></div></div>";
				$("#main-raiser-wrap .right .input-wrap:last").after(html);
				$("#main-raiser-wrap .normal-input:last").on("click", function() {
					$("input.click").removeClass("click");
					$(this).addClass("click");
				})
				$("#main-raiser-wrap .main-raiser-confirm:last").on("click", function() {
					if ($(this).prev().val() != "") {
						var query = $(this).prev().val();
						if ($("#main-raiser-wrap .right .speaker-show").get(0))
							$("#main-raiser-wrap .right .speaker-show:last").after("<div class='speaker-show'><p>" + query + "</p><div class='delete-newtime'><div class='delete-icon' /></div></div></div>");
						else
							$("#main-raiser-wrap .right").prepend("<div class='speaker-show'><p>" + query + "</p><div class='delete-newtime'><div class='delete-icon' /></div></div></div>");
						$("#main-raiser-wrap .right .speaker-show:last .delete-newtime").hide();
						$("#main-raiser-wrap .speaker-show:last").hover(function() {
							$(this).find(".delete-newtime").fadeIn();
						}, function() {
							$(this).find(".delete-newtime").fadeOut();
						})
						$("#main-raiser-wrap .speaker-show:last .delete-newtime").on("click", function() {
							$(this).parent().remove();
							if (!$("#main-raiser-wrap .right .speaker-show").get(0)&&!$("#main-raiser-wrap .right .main-raiser-confirm").get(0))
								addmainraiser();
						})
						$(this).parent().empty();
					}
				})
			}
			$("#add-raiser-normal").on("click", function() {
				addmainraiser();

			})
			$("#event-alert-wrap .right .input").prev().prev().on("click", function() {
				$("#event-alert-wrap .input").hide();
				$(this).next().next().show();
				$(this).next().next().find(".time-input-long").focus();
			})

			

			function psw(){		//图片格式错误
				picstyle(picstylewrong);
			}
			function ptb(){	//图片太大
				picstyle(pictoobig)
			}



		}

		bind();
		init();
		if(geturlid()!=null)
			addcontent(geturlid());


	})