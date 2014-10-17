$(document).ready(function(){
	var isOut = true;
	var isIn = false;
	var addok="<div id='picstyle-wrong'><p>添加成功~</p><p>正在等待审核~</p></div>";
	function picstyle2(content,string){	//报错消息
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
		$("#join-time-confirm").append("<p id='back'>确定</p>");
		$("#title").attr("name",id);
		$("#back").click(function(){
			
			window.location.href="http://stu.fudan.edu.cn/event/main.html";
		});
	};
	var bind=function(){
		$(document).on("focus","input,textarea",function(){
			$("input.click,textarea.click").removeClass("click");
			$(this).addClass("click");
		})
		$(".category-item").hide();
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
		$("#prev").click(function(){

		})
		$("#confirm").click(function(){
			if($("#orgname").val()=="")
				$("#orgname").focus();
			else{
				var datatemp=function(){
					this.Name;
					this.Type;
				}
				var data1=new datatemp();
				$.ajax({
	
					url: "http://stu.fudan.edu.cn/event/RequireOrganization.aspx",
					data: data1
					dataType: 'json',
					contentType: "application/json;charset=utf-8",
					type: 'get',
					async: false,
				}).done(function(json) {
					if(json=="1"||json==1){
						picstyle2(addok);
					}
				}).fail(function(json){

				});
			}
		})
	}
	var init=function(){
		$(".category-item li:eq(0)").trigger("click");
		$("#orgname").focus();
	}
	bind();
	init();
})