$(document).ready(function(){
	var id=1;
	var eid;
	var picstylewrong="<div id='picstyle-wrong'><p>这是什么啊~</p><p>换个服务器君认识的格式好嘛拜托了~</p></div>";
	var pictoobig="<div id='picstyle-wrong'><p>太大了，人家搬不动啦~</p></div>";
	var picok="<div id='picstyle-wrong'><p>上传成功~</p></div>";
	var loadingcontent="<div id='picstyle-wrong'><p>祈祷中~</p></div>";
	function albumbind(){

		$(".album-each:last .album-intro-display").hide();
		$(".album-each:last .album-pic-delete").hide();
		$(".album-each:last .album-intro-confirm").prev().on("keyup",function(){
			if($(this).val().length>30){
				var string = $(this).val();
				string = string.substring(0,30);
				if(string!=$(this).val()){
					$(this).val(string);
				}
			}
		})
		$(".album-each:last .album-intro-confirm").click(function(){
			if(!($(this).prev().val()=="")){
				$(this).parent().hide();
				$(this).parent().next().show();
				$(this).parent().next().find("p").html($(this).prev().val());
				$(this).prev().val("");
			}
		})
		$(".album-each:last .album-intro-display").hover(function(){
			$(this).find(".delete-icon").fadeIn();
		},function(){
			$(this).find(".delete-icon").fadeOut();
		})
		$(".album-each:last .album-pic-wrap").hover(function(){
			$(this).find(".delete-icon").fadeIn();
		},function(){
			$(this).find(".delete-icon").fadeOut();
		})
		$(".album-each:last .album-intro-delete").click(function(){
			$(this).parent().prev().show();
			$(this).prev().text("");
			$(this).parent().hide();
		})
		$(".album-each:last .album-pic-delete").click(function(){
			var index=$(".album-each").index($(this).parent().parent());
			index=index+1;
			$("#album"+index).remove();
			$(this).parent().parent().remove();

		})
	}
	function addpic(id){
		$("#choose-pic").unbind("click");
		$("#choose-pic").click(function(){
			$("#album"+id).trigger("click");
		})
		$("#album"+id).change(function(){
			var obj = $("#album"+id)[0];
			var url = window.URL.createObjectURL(obj.files[0]);
			//var url = document.selection.createRange().text;
			var URL = window.URL || window.webkitURL,
				imageUrl, image;
			var file = document.createElement("img");
			file.src = url;
			$(".album-pic-wrap:eq("+id+") .delete-icon").html("");
			var style = true;
			if (parseInt(obj.files[0]).size > 0 && parseInt(obj.files[0].size) < (1024 * 1024 * 2)) {
				style = false;
				ptb();
			}
			var str = new Array();
			str = obj.files[0].type.split('/');
			if (str[0] != "image") {
				style = false;
				psw();
			}
			if(style==true){
				$("#album-preview").append("<div class='album-each'><div class='album-pic-wrap'><div class='album-pic-delete delete-icon'></div></div>"
							+"<div class='album-intro-input' ><input type='text'/><div class='album-intro-confirm checkonly' ></div></div>"
							+"<div class='album-intro-display'><p></p><div class='album-intro-delete delete-icon'></div></div></div>");
				$(".album-each:last .album-pic-wrap").prepend(file);
				file.onload = function()  
    			{   
    				var width = $(file).width();
    				var height = $(file).height();
    				if(height>=width){
						width=width/(height/120);
						$(".album-each:last").find("img").width(width);
						$(".album-each:last").find("img").height(120);
						$(".album-pic-delete:last").css("margin-top","-120px");
						var marginleft=(120-width)/2;
						$(".album-pic-delete:last").css("margin-left",(width-22+marginleft)+"px");
						$(".album-each:last").find("img").css("margin-left",marginleft);
					}
					else{
						height=height/(width/120);
						$(".album-each:last").find("img").height(height);
						$(".album-each:last").find("img").width(120);
						$(".album-pic-delete:last").css("margin-left","98px");
						$(".album-pic-delete:last").css("margin-top",(-height)+"px");
						var margintop=(120-height)/2;
						$(".album-each:last").find("img").css("margin-top",margintop);
					}
  				}  
  				albumbind();
  				$("#album"+id).after("<input id='album"+(id+1)+"' class='album-input' type='file' name='album'>");
  				$("#album"+id).hide();
  				addpic(id+1);

				
				
			}
		})
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
		});
	};
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
		$("#join-time-confirm").append("<p id='back'>马上去看"+string+"页面</p>");
		$("#back").click(function(){
			var URL=document.URL; 
			var arraytemp=new Array();
			arraytemp=URL.split("?");
			window.location.href="http://stu.fudan.edu.cn/event/main.html?"+arraytemp[1];
		});
	};
	
	function psw(){		//图片格式错误
		picstyle(picstylewrong);
	}
	function ptb(){	//图片太大
		picstyle(pictoobig)
	}
	addpic(1);
	$("#next").click(function(){
		
		$("#album-form").submit();
	})
	var options  = {
           url:'AlbumUpload.aspx',
           type:'post',
           dataType : 'json',
           success:function(data){
           		var datatype=function(){
           			this.FileName;
           			this.Description;
           		}
               	data=data.root;
               	
               	var imageinf=new Array();
               	imageinf=data.Album;
               	console.log(imageinf.length);
               	var i;
               	var arraytemp=new Array();
               	var j=0;
               	for(i=0;i<imageinf.length;i++){
               		var datatemp=new datatype();
               		datatemp.FileName=imageinf[i].FileName;
               		var Description=$(".album-each:eq("+i+") .album-intro-display p").text();
               		if(Description!=""){
               			datatemp.Description=Description;
               			arraytemp[j]=datatemp;
               			j=j+1;
               		}

               	}
               	var datatype=function(){
               		this.Album;
               	}
               	var data1=new datatype();
               	data1.Album=arraytemp;
               	var datatype=function(){
               		this.root;

               	}
               	var data2=new datatype();
               	data2.root=data1;
               	var datatype=function(){
               		this.description;
               	}
               	var data3=new datatype();
               	data3.description=JSON.stringify(data2);
               	console.log(data3);	
               	$.ajax({
					url : "AlbumUpload.aspx",
					data:data3,
					type : 'get',
					async:false
				}).done(function(success){
					finish();
					picstyle2(picok,"活动");

				}).fail(function(msg){
		
				});
            }
     	 };
	$("#album-form").submit(function(){
		loading();
		$("#album-form").ajaxSubmit(options);
		return false;
	})
	$("#prev").click(function(){
		history.back();
	})
	var URL=document.URL; 
	var arraytemp=new Array();
	arraytemp=URL.split("?");
	$("#container-wrap").css("min-height",document.documentElement.clientHeight);
	if(arraytemp[1]!=""&&arraytemp[1])
	{
		var success=0;
		var datatype=function(){
			this.id;
		}
		var data1=new datatype();
		eid=arraytemp[1];
		data1.id=arraytemp[1];
		$.ajax({
			url : "AlbumUpload.aspx",
			data:data1,
			type : 'get',
			async:false
		}).done(function(success){
			success=1;
		}).fail(function(msg){

		});
			
	}
	function loading(){
		picstyle(loadingcontent);
		$('#confirm').hide();
	}
	function finish(){
		$("#back").trigger("click");
		$("#confirm").show();
		$(".confirm-each").show();
		$("#back").hide();
		$("#join-time-confirm").show();	
	}
})