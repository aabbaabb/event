$(document).ready(function(){
	var isIn4=false;

	$("#time-selecter-wrap").mouseout(function() {
		isIn4 = false;
	})
	$("#time-selecter-wrap").mouseover(function() {
		isIn4 = true;
	})
	function timepicker(X,Y,div,i,obj){
		console.log(obj);
		this.initpositionX=X;
		this.initpositionY=Y;
		this.nowpositionY=Y+120;
		this.lastpositionY=Y+120;
		this.division=div;
		this.i=i;
		this.obj=obj;
		/**var c = document.getElementById("time-selecter");  
       var cxt = c.getContext("2d"); 
       this.img = new Image();
       this.img.src = "../img/time-select-bar.png";

       this.img2=new Image();
       this.img2.src = "../img/time-select-button.png";
       var tempimage=this.img2;
       this.img2.onload=function(){
       	cxt.drawImage(tempimage,X,Y+140);
       }**/
       var temparray=new Array();
       temparray = obj.val().split(":");
       var change=0;
       //console.log(temparray[0]);

       if(temparray[0]<0){
			temparray[0]="00";
			change=1;
		}
		if(temparray[0]>23){
			temparray[0]=23;
			change=1;
		}
		if(temparray[1]<0){
			temparray[1]="00";
			change=1;
		}
		if(temparray[1]>59){
			temparray[1]=59;
			change=1;
		}
		if(!temparray[1])
			temparray[1]="";
		if(change==1){
			this.obj.val(temparray[0]+":"+temparray[1]);
			
		}
       var eachsize=120/(this.division);
       if(!temparray[0]&&!temparray[1]){
       	tempheight=0;
       }else{
       	if(i==0){
       		if(temparray[0]){
       			tempheight=parseInt(temparray[0]);
       			tempheight=tempheight*eachsize;
       		}
       		if(!parseInt(temparray[0]))
       			tempheight=0;
       		
       	}
       	else{
       		if(temparray[1]){
       			tempheight=parseInt(temparray[1]);
       			tempheight=tempheight*eachsize;
       		}
       		if(!parseInt(temparray[1]))
       			tempheight=0;
       	}
       }
       $("#time-selecter-wrap").append("<div class='time-selecter'></div>");
       $(".time-selecter:eq("+i+")").css("margin-left",X);
       $(".time-selecter:eq("+i+")").css("margin-top",21+120-tempheight);
       $(".time-selecter:eq("+i+")").on("mouseover",function(){
       		this.style.cursor="pointer";

       })
      

    	
	
	}
	timepicker.prototype={
		constructor:timepicker,
		pickermove:function(event){
			$(".time-select-button").css("cursor","pointer");
			var X=this.initpositionX;
       	this.nowpositionY=this.getPosition(event).y-this.initpositionY+10;
       	var eachsize=120/(this.division);
       	var showtemp=Math.round((this.nowpositionY-21)/eachsize);
       	if(this.division==23){
				showtemp=23-showtemp;
				if(showtemp<=0)
					showtemp="00";
				if(showtemp>23)
					showtemp="23";
				if(showtemp>0&&showtemp<=9){
					showtemp="0"+showtemp;
				}
			}
			if(this.division==59){
				showtemp=59-showtemp;
				if(showtemp<=0)
					showtemp="00";
				if(showtemp>59)
					showtemp="59";
				if(showtemp>0&&showtemp<=9){
					showtemp="0"+showtemp;
				}
			}
			//console.log(this.obj);
			lasttemp=this.obj.val();
			var temparray=new Array();
			temparray=lasttemp.split(":");
			if(!temparray[1])
				temparray[1]="00";

			if(this.division==23){
				showtemp=showtemp+":"+temparray[1];
			}
			if(this.division==59)
				showtemp=temparray[0]+":"+showtemp;

			this.obj.val(showtemp);
			//console.log(1);
			if(this.obj.parent().parent().attr("id")=="add-time-multi"){
				var index=this.obj.index("#add-time-multi .time-input-short");
				$("#add-time-multi .short-time-show.null:eq("+index+")").html(showtemp);
			}
			if(this.obj.next().hasClass("show"))
				this.obj.next().hide();
       	/**var c = document.getElementById("time-selecter");  
      		var cxt = c.getContext("2d"); 
       	cxt.clearRect(X,this.lastpositionY,20,20);
			cxt.drawImage(this.img2,X,this.nowpositionY);**/
			if(this.nowpositionY<21){
				this.nowpositionY=21;
			}
			if (this.nowpositionY>21 + 120){
				this.nowpositionY = 21+120;
			}
			//console.log(this.nowpositionY);
			$(".time-selecter:eq("+this.i+")").css("margin-top",this.nowpositionY);
			this.lastpositionY=this.nowpositionY;
		},
		pickermovefinal:function(event){
			this.nowpositionY=this.getPosition(event).y-this.initpositionY+10;
			var eachsize=120/(this.division);
			var showtemp=Math.round((this.nowpositionY-21)/eachsize);
			if(this.division==23){
				showtemp=23-showtemp;
				if(showtemp<0)
					showtemp="00";
				if(showtemp>23)
					showtemp="23";
				if(showtemp>0&&showtemp<=9){
					showtemp="0"+showtemp;
				}
			}
			var change=0;
			if(this.division==59){
				showtemp=59-showtemp;
				if(showtemp<0){
					showtemp="00";
					change=1;
				}
				if(showtemp>59){
					showtemp="59";
					change=1;
				}
				if(showtemp>0&&showtemp<=9){
					showtemp="0"+showtemp;
				}
			}
			lasttemp=this.obj.val();
			var temparray=new Array();
			temparray=lasttemp.split(":");
			if(temparray[1]==null)
				temparray[1]="00"
			if(this.division==23){
				showtemp=showtemp+":"+temparray[1];
			}
			if(this.division==59){

				showtemp=temparray[0]+":"+showtemp;
				
			}
			this.obj.val(showtemp);
			this.nowpositionY=21+eachsize*Math.round((this.nowpositionY-21)/eachsize);
			//var c = document.getElementById("time-selecter");  
      		//var cxt = c.getContext("2d"); 
      		//cxt.clearRect(this.initpositionX,this.lastpositionY,20,20);
			//cxt.drawImage(this.img2,this.initpositionX,this.nowpositionY);
			if(this.nowpositionY<21){
				this.nowpositionY=21;
			}
			if (this.nowpositionY>21+120){
				this.nowpositionY = 21+120;
			}
			$(".time-selecter:eq("+this.i+")").css("margin-top",this.nowpositionY);
			this.lastpositionY=this.nowpositionY;
			if(change==1){
				this.obj.val(showtemp);
			}

		},
		getPosition:function(e){
			e=e||window.event;
 			var x=e.pageX||(e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft));
 			var y=e.pageY||(e.clientY+(document.documentElement.scrollTop||document.body.scrollTop));
 			return {'x':x,'y':y};
		}
	}

	function createtimepicker(newtimepicker,i){
		
		function startSelection(event){
			newtimepicker.pickermove(event);
		}
		function cancelSelection(event){
			newtimepicker.pickermovefinal(event);
			$(this).unbind('mousemove',startSelection).unbind("mouseup",cancelSelection);
		}

		/**$(".time-selecter:eq("+i+")").on("mousedown",function(){
 			$(".time-select-button").css("cursor","pointer");
       		$(window).mousemove(startSelection).mouseup(cancelSelection);
       });**/
		$(window).on("mousedown",function(e){
			e=e||window.event;
 			var x=e.pageX||(e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft));
 			var arraytemp=new Array();
 			arraytemp=$("#time-selecter-wrap")[0].style.marginLeft.split("px");
 			var temp=parseInt(arraytemp[0]);
			x=x-temp;
			if(isIn4==true&&x>(i*50)&&x<((i+1)*50)){
 				$(".time-select-button").css("cursor","pointer");
       			$(window).mousemove(startSelection).mouseup(cancelSelection);
       		}
       	
       	});
	}
	getPosition=function(element){
 			var actualLeft = element.offsetLeft;
　　		var current = element.offsetParent;
	
　　		while (current !== null){
　　		　　actualLeft += current.offsetLeft;
　　		　　current = current.offsetParent;
　　		}
			var x = actualLeft;
			var actualTop = element.offsetTop;
　　		var current = element.offsetParent;
	
　　		while (current !== null){
　　		　　actualTop += current.offsetTop;
　　		　　current = current.offsetParent;
　　		}
			var y = actualTop;
 			return {'x':x,'y':y};
		}
	$(".time-input-short").keyup(function(){
		$("#time-selecter-wrap").empty();
		var y=getPosition($(this)[0]).y-170;
		$(window).unbind("mousedown");
		var newtimepicker1=new timepicker(22,y+21,23,0,$(this));
		var newtimepicker2=new timepicker(57,y+21,59,1,$(this));	
		createtimepicker(newtimepicker1,0);
		createtimepicker(newtimepicker2,1);

	})	
	
	$(".time-input-short").on("focus",function(){
		var x=getPosition($(this)[0]).x;
		var y=getPosition($(this)[0]).y-170;
		$("#time-selecter-wrap").css("margin-left",x);
		$("#time-selecter-wrap").css("margin-top",y);
		$("#time-selecter-wrap").fadeIn();
		$("#time-selecter-wrap").empty();
		$(window).unbind("mousedown");
		var newtimepicker1=new timepicker(22,y+21,23,0,$(this));
		var newtimepicker2=new timepicker(57,y+21,59,1,$(this));
		createtimepicker(newtimepicker1,0);
		createtimepicker(newtimepicker2,1);
	})
})