		
function album(imageload){
		var position;
		var speed;
		var a;	
		var maxspeed=15 ;	
		var minspeed=3;
		var eachwidth=145;
		var canvaswidth=420;
		var acc=0.05;	//初始加速度
		var int;
		


			var c=document.getElementById("myCanvas");
			var ctx=c.getContext("2d");
			
			var img=new Array();
			for(i=0;i<imageload.length;i++){
				img[i] = new Image();
				img[i].src = imageload[i].src;
			}
			for(i=0;i<imageload.length;i++){
				var image=img[i];
				image.onload=function(){
					for(i=0;i<imageload.length;i++){

						var left=eachwidth*(i);
						ctx.drawImage(img[i],left, 0,130,90);
					}
				};
				
			}
			if(imageload.length<3){
				$("#left-arrow").hide();
				$("#right-arrow").hide();
			}
			position=0;
			window.rmove=function(){
					ctx.clearRect(0,0,canvaswidth,100);
					for(i=0;i<imageload.length;i++){

						var left=eachwidth*(i);
						var width=eachwidth*(imageload.length);
						if((left+position)>canvaswidth)
							left=left-width;
						if(position>width)
							position=position-width;
						ctx.drawImage(img[i],left+position, 0,130,90);
					}
					position=position+speed;
					if(speed<maxspeed)
						speed=speed+acc;
				};
				
			window.lmove=function(){
					ctx.clearRect(0,0,canvaswidth,100);
					for(i=0;i<imageload.length;i++){

						var left=eachwidth*(i);
						var width=eachwidth*(imageload.length);
						if((left+position)>canvaswidth)
							left=left-width;
						if(position<0)
							position=position+width;
						ctx.drawImage(img[i],left+position, 0,130,90);
					}
					position=position-speed;
					if(speed<maxspeed)
						speed=speed+acc;
				};

			window.rstop=function(){
				ctx.clearRect(0,0,canvaswidth,100);
					for(i=0;i<imageload.length;i++){

						var left=eachwidth*(i);
						var width=eachwidth*(imageload.length);
						if((left+position)>canvaswidth)
							left=left-width;
						if(position>width)
							position=position-width;
						ctx.drawImage(img[i],left+position, 0,130,90);
					}
					
					position=position+speed;
					if(speed>0)
						speed=speed-a;
					else
					{
						speed=0;
						a=0;
						int=clearInterval(int);
					}
			}

			window.lstop=function(){
				ctx.clearRect(0,0,canvaswidth,100);
					for(i=0;i<imageload.length;i++){

						var left=eachwidth*(i);
						var width=eachwidth*(imageload.length);
						if((left+position)>canvaswidth)
							left=left-width;
						if(position<0)
							position=position+width;
						ctx.drawImage(img[i],left+position, 0,130,90);
					}
					
					position=position-speed;
					if(speed>0)
						speed=speed-a;
					else
					{
						speed=0;
						a=0;
						int=clearInterval(int);
					}
			}
			$("#right-arrow").mousedown(function(){
				speed=minspeed;
				int=clearInterval(int);
				int=self.setInterval("rmove()",20);
			})
			$("#left-arrow").mousedown(function(){
				speed=minspeed;
				int=clearInterval(int);
				int=self.setInterval("lmove()",20);
			})
				
			
			$("#right-arrow").mouseup(function(){
				rstopwrap();
			})
			$("#right-arrow").mouseleave(function(){
				rstopwrap();
			})
			$("#left-arrow").mouseup(function(){
				lstopwrap();
			})
			$("#left-arrow").mouseleave(function(){
				lstopwrap();
			})

			function lstopwrap(){
				if(speed>1){
					int=window.clearInterval(int);
					n=Math.ceil(position/eachwidth);
					n=n-1;
					if(speed>5)
						n=n-1;
					if(speed>9)
						n=n-2;
					if(speed>12)
						n=n-3;
					var s=-eachwidth*n+position;
					a=((speed*speed)/(2*s));
					int=self.setInterval("lstop()",20);
				}
			}
			function rstopwrap(){
				if(speed>1){
					int=window.clearInterval(int);
					n=Math.ceil(position/eachwidth);
					if(speed>5)
						n=n+1;
					if(speed>9)
						n=n+2;
					if(speed>12)
						n=n+3;
					var s=eachwidth*n-position;
					a=((speed*speed)/(2*s));
					int=self.setInterval("rstop()",20);
				}
			}

}