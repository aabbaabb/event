<%@ Page Language="C#" AutoEventWireup="true" CodeFile="addevent.aspx.cs" Inherits="addevent" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>新建活动</title>
	
	<link rel="stylesheet" type="text/css" href="css/smoothness/jquery-ui-1.10.3.custom.css"/>
	 <link rel="stylesheet" type="text/css" href="css/reset.css" media="all" />
	 <link rel="stylesheet" type="text/css" href="css/addevent-style.css" media="all" />
	 <script type="text/javascript" src="js/jquery-1.9.min.js"></script>
	
	<script tyoe="text/javascript" src="js/jquery-ui-1.10.3.custom.js"></script>
	<script type="text/javascript" src="js/addevent.js"></script>
	<script type="text/javascript" src="js/timepicker.js"></script>

</head>
<body>
	<div id="time-selecter-wrap">
	</div>
	<div id="container-wrap">
		<div id="title">
			<span id="title-chi">新活动</span>
			<span id="title-eng">PUBLISH</span>
		</div>
		<div id="container">
			<ul id="page1" class="page">
				<li id="add-event-attr-wrap">
					<div class="left">
						<p>添加</p>
					</div>
					<div class="right">
						<ul id="add-event-attr">
							<li>
								<div class="clickbox click-box-round click" id="event-public"></div>
								<div>公开活动</div>
							</li>
							<!--<li class="click-text">
								<div class="clickbox click-box-round" id="event-inside"></div>
								<div>内部活动</div>
							</li>
							<li class="click-text">
								<div class="clickbox click-box-round" id="event-personal"></div>
								<div>个人活动</div>
							</li>-->
						</ul>
						
					</div>
				</li>
				<div id="add-event-attr-alert-before">
				</div>
				<li id="add-event-attr-alert" class="alert">
					<p>对所有人可见，所有人均可参与</p>
				</li>
				<li id="event-title-wrap">
					<div class="left">

						<p>标题</p>
						<p class="necessary">*</p>
					</div>
					<div class="right">
						<div class="input-wrap">
							<input type="text" id="event-title" class="normal-input"/>
						</div>
						
					</div>
				</li>
				<li id="event-subtitle-wrap">
					<div class="left">
						<p>副题</p>
					</div>
					<div class="right">
						<div class="input-wrap">
							<input type="text" id="event-sub-title" class="normal-input"/>
						</div>
						
					</div>
				</li>
				<li id="category-wrap" class="choosebox">
					<div class="left">
						<p>分类</p>
						<p class="necessary">*</p>
					</div>
					<div class="right" id="category">
						<div class="input-wrap">
							<div class="category-each" id="main-category">
								<div class="category-show">
									<p>请选择</p>
								</div>
								<div class="category-button"></div>
								<div class="category-item">
									<ul>
										<li>讲座</li>
										<li>出行</li>
										<li>演出</li>
										<li>比赛</li>
										<li>线上</li>
										<li class="last">其他</li>
									</ul>
								</div>
							</div>
							<div class="category-each sub-category" id="lecture-addition">
								<div class="category-show">
									<p>请选择</p>
								</div>
								<div class="category-button"></div>
								<div class="category-item">
									<ul>
										<li>人文</li>
										<li>社政</li>
										<li>科技</li>
										<li>经管</li>
										<li>艺术</li>
										<li>交流</li>
										<li class="last">其他</li>
									</ul>
								</div>
							</div>
							<div class="category-each sub-category" id="outgoing-addition">
								<div class="category-show">
									<p>请选择</p>
								</div>
								<div class="category-button"></div>
								<div class="category-item">
									<ul>
										<li>公益</li>
										<li>聚会</li>
										<li>运动</li>
										<li>旅行</li>
										<li class="last">其他</li>
									</ul>
								</div>
							</div>
							<div class="category-each sub-category" id="contest-addition">
								<div class="category-show">
									<p>请选择</p>
								</div>
								<div class="category-button"></div>
								<div class="category-item">
									<ul>
										<li>校内</li>
										<li class="last">校际</li>
									</ul>
								</div>
							</div>
							<div class="category-each sub-category" id="online-addition">
								<div class="category-show">
									<p>请选择</p>
								</div>
								<div class="category-button"></div>
								<div class="category-item">
									<ul>
										<li>招募</li>
										<li>STU</li>
										<li class="last">其他</li>
									</ul>
								</div>
							</div>
							

						</div>
						
					</div>
				</li>
				<li id="time-display-wrap">
					<div class="left">
						<p>时间</p>
						<p class="necessary">*</p>
					</div>
					<div class="right">
						<div id="time-display">
							
						</div>
						<div id="add-time-button">
							<div class="add-time-button-each" id="add-time-single-button">
							</div>
							<div class="add-time-button-each" id="add-time-multi-button">
							</div>

						</div>
						
					</div>

				</li>
				<div id="add-time-content-before">
				</div>
				<li id="add-time-content" class="alert">

					<ul id="add-time-multi">
						<li>

							<span class="hint">从</span>
							<input type="text" class="time-input-long datepicker"/>
							
							<div class="show add-date-show long-time-show">
								2013-03-06
							</div>
							<input type="text" class="time-input-short"/>
							<div class="show add-time-show1 short-time-show">
								08:00
							</div>
							<input type="text" class="time-input-short"/>
							<div class="show add-time-show2 short-time-show">
								10:00
							</div>
						</li>
						<li>

							<span class="hint">至</span>
							<input type="text" class="time-input-long datepicker"/>
							
							<div class="show add-date-show long-time-show">
								2013-03-06
							</div>
							<input type="text" class="time-input-short null"/>
							<div class="show add-time-show1 null short-time-show">
								08:00
							</div>
							<input type="text" class="time-input-short null"/>
							<div class="show add-time-show2 null short-time-show">
								10:00
							</div>
						</li>
						<li>
							<div class="each-day">
								<div class="click-box-square clickbox-special"></div>
								<div class="each-day-intro">每天</div>
								<div class="click-box-square clickboxmul"></div>
								<div class="each-day-intro">周一</div>
								<div class="click-box-square clickboxmul"></div>
								<div class="each-day-intro">周二</div>
								<div class="click-box-square clickboxmul"></div>
								<div class="each-day-intro">周三</div>
								<div class="click-box-square clickboxmul"></div>
								<div class="each-day-intro">周四</div>
								<div class="click-box-square clickboxmul"></div>
								<div class="each-day-intro">周五</div>
								<div class="click-box-square clickboxmul"></div>
								<div class="each-day-intro">周六</div>
								<div class="click-box-square clickboxmul"></div>
								<div class="each-day-intro">周日</div>
							</div>
						</li>
						<li class="check-alert">
						</li>
						<li>
							<div id="add-time-confirm-multi" class="add-time-confirm check pointer">
							</div>
						</li>
					</ul>
					<ul id="add-time-single">
						<li>


							<input type="text" class="datepicker time-input-long"/>
							<div class="show add-date-show long-time-show">
								2013-03-06
							</div>

							<input type="text" class="time-input-short"/>
							
							<div class="show add-time-show1 short-time-show">
								08:00
							</div>
							<input type="text" class="time-input-short"/>
							<div class="show add-time-show2 short-time-show">
								10:00
							</div>
						</li>
						<li>
							<div id="add-full-day-wrap">
								<div class="click-box-square" id="add-fullday"></div>
								<div>全天事件</div>
							</div>
							<div class="check-alert">
							</div>
							<div id="add-time-confirm-single" class="add-time-confirm check pointer">
							</div>
						</li>
					</ul>
				</li>
				<li id="event-location-wrap">
					<div class="left">
						<p>地点</p>
						<p class="necessary">*</p>
					</div>
					<div class="right">
						<div class="input-wrap">
							<input type="text" id="event-location" class="normal-input"/>
						</div>
						
					</div>
				</li>
				<li id="event-alert-wrap">
					<div class="left">
						<p>提醒</p>
					</div>
					<div class="right">
						<div class="clickbox click-box-round cl"></div>
						<div class="event-alert-intro">1分钟前</div>
						<div class="clickbox click-box-round"></div>
						<div class="event-alert-intro-right">5分钟前</div>
						<div class="clickbox click-box-round cl"></div>
						<div class="event-alert-intro">15分钟前</div>
						<div class="clickbox click-box-round"></div>
						<div class="event-alert-intro-right">30分钟前</div>
						<div class="clickbox click-box-round cl"></div>
						<div class="event-alert-intro">1小时前</div>
						<div class="clickbox click-box-round"></div>
						<div class="event-alert-intro-right">2小时前</div>
						<div class="clickbox click-box-round cl"></div>
						<div class="event-alert-intro">当天早晨</div>
						<div class="event-alert-right input">
								<input type="text" class="time-input-long datepicker"/>
						
								<div class="show event-alert-show1 long-time-show">
									2013-03-06
								</div>
								<input type="text" class="time-input-short"/>
								<div class="show event-alert-show2 short-time-show">
									08:00
								</div>	
						</div>
						<div class="clickbox click-box-round cl"></div>
						<div class="event-alert-intro">前天晚上</div>
						<div class="event-alert-right input">
								<input type="text" class="time-input-long datepicker"/>
						
								<div class="show event-alert-show1 long-time-show">
									2013-03-06
								</div>
								<input type="text" class="time-input-short"/>
								<div class="show event-alert-show2 short-time-show">
									08:00
								</div>	
						</div>
						<div class="clickbox click-box-round cl"></div>
						<div class="event-alert-intro">指定时间</div>
						<div class="event-alert-right input">
								<input type="text" class="time-input-long datepicker"/>
						
								<div class="show event-alert-show1 long-time-show">
									2013-03-06
								</div>
								<input type="text" class="time-input-short"/>
								<div class="show event-alert-show2 short-time-show">
									08:00
								</div>	
						</div>
						
					</div>
				</li>
				<li id="event-remark-wrap">
					<div class="left">
						<p>备注</p>
					</div>
					<div class="right">
						<div class="input-wrap">
							 <textarea name="" id="event-remark" class="big-input"></textarea>
						</div>
						
					</div>
				</li>
			</ul>


			<ul id="page2" class="page">
				<li id="main-raiser-wrap">
					<div class="left">
						<p>主办</p>
						<p class="necessary1">*</p>
					</div>
					<div class="right">
						<div class="input-wrap">
							 <input type="text" class="main-raiser-input" class="normal-input"/>
							<div class="main-raiser-confirm checkonly pointer"></div>
						</div>
						<div id="add-raiser-normal" class="add add-raiser">
						</div>

					</div>
				</li>
				<li>
					<div class="left">
						<p>活动系列</p>
					</div>
					<div class="right">
						
						<div class="input-wrap">
							<input type="text" id="act-series-input" class="normal-input"/>
						</div>
						
					</div>
				</li>
				<li id="act-intro-wrap">
					<div class="left">
						<p>活动简介</p>
						<p class="necessary">*</p>
					</div>
					<div class="right">
						<div class="input-wrap">
							<textarea name="" class="big-input" id="act-intro"></textarea>
						</div>
						
					</div>
				</li>
				<li id="attend-method-wrap">
					<div class="left">
						<p>参加方式</p>
						<p class="necessary">*</p>
					</div>
					<div class="right">
						<ul id="attend-method">
							<li>
								<div class="clickbox click-box-round click"></div>
								<div>需要报名才能参加</div>
							</li>
							<li class="click-text">
								<div class="clickbox click-box-round"></div>
								<div>无需报名即可参加</div>
							</li>
						</ul>
						
					</div>
				</li>
			</ul>



			<ul id="page2-lec1" class="page">
				<li class="speaker" id="speaker-wrap">
					<div class="left">
						<p>主讲人</p>
						<p class="necessary1">*</p>
					</div>
					<div class="right">
						<div class="input-wrap">
							<input type="text" class="speaker-name-input"/>
							<div class="choosebox category-each" id="speaker-cat-input">
								<div class="category-show">
									<p>请选择</p>
								</div>
								<div class="category-button"></div>
								<div class="category-item">
									<ul>
										<li>老师</li>
										<li>教授</li>
										<li>副教授</li>
										<li>讲师</li>
										<li>研究员</li>
										<li>副研究员</li>
										<li>院士</li>
										<li>先生</li>
										<li class="last">女士</li>
									</ul>
								</div>
							</div>
							<div class="speaker-confirm checkonly pointer"></div>
						</div>

						<div id="add-speaker" class="add">
						</div>
					
					</div>
					
				</li>
				<li id="speaker-inf-wrap">
					<div class="left">
						<p>主讲人信息</p>
						<p class="necessary">*</p>
					</div>
					<div class="right">
						<div class="input-wrap">
							<textarea name="" class="big-input" id="speaker-inf"></textarea>
						</div>
						
					</div>
				</li>
				<li id="event-brand-wrap">
					<div class="left">
						<p>讲座品牌</p>
					</div>
					
					<div class="right">
						<div id="act-series-cat" class="choosebox">
							<div class="category-show">
								<p>请选择</p>
							</div>
							<div class="category-button"></div>
							<div class="category-item">
								<ul>
									<li>无</li>
									<li>复旦光华人文基金系列讲座</li>
									<li>光华杰出人文学者系列讲座</li>
									<li>复旦文史讲堂</li>
									<li>文史研究院小型学术研究会系列</li>
									<li>历史地理研究中心讲座</li>
									<li>史学论坛</li>
									<li>中国古代文学研究中心系列讲座</li>
									<li>星空讲坛</li>
									<li>3108讲会</li>
									<li>图书馆培训讲座</li>
									<li class="last">其他</li>
								</ul>
							</div>
						</div>
						<div class="input-wrap">
							<input type="text" id="event-brand-input" class="normal-input"/>
						</div>
						
					</div>
				</li>
				<li id="event-series-wrap">
					<div class="left">
						<p>讲座系列</p>
					</div>
					<div class="right">
						<div class="input-wrap">
							<input type="text" id="event-series-input" class="normal-input"/>
						</div>
						
					</div>
				</li>
			
			</ul>
			
			<ul id="page2-lec2" class="page">
				<li id="lec-raiser-wrap">
					<div class="left">
						<p>主办</p>
						<p class="necessary1">*</p>
					</div>

					<div class="right">
						<div class="input-wrap">
							<input type="text" class="main-raiser-input" class="normal-input"/>
							<div class="main-raiser-confirm checkonly pointer"></div>
						</div>
						<div id="add-raiser-lec" class="add add-raiser">
						</div>
					</div>
				</li>
				<li id="act-intro-wrap">
					<div class="left">
						<p>内容简介</p>
						<p class="necessary">*</p>
					</div>
					<div class="right">
						<div class="input-wrap">
							<textarea name="" class="big-input" id="act-intro"></textarea>
						</div>
						
					</div>
				</li>
				<li id="attend-method-wrap">
					<div class="left">
						<p>参加方式</p>
						<p class="necessary">*</p>
					</div>
					<div class="right">
						<ul id="attend-method">
							<li>
								<div class="clickbox click-box-round click"></div>
								<div>需要报名才能参加</div>
							</li>
							<li class="click-text">
								<div class="clickbox click-box-round"></div>
								<div>无需报名即可参加</div>
							</li>
						</ul>
						
					</div>
				</li>
			</ul>


			<ul id="page3" class="page">	
				<li>
					<div id="enroll-time-intro">
						<p>报名起止时间</p>
						<p class="necessary special">*</p>
					</div>
					<div class="difright" id="enroll-time">
						<div class="input-wrap">
							<ul>
								<li>
									<input type="text" class="time-input-long datepicker"/>
							
									<div class="show enroll-time-show1 long-time-show">
										2013-03-06
									</div>
									<input type="text" class="time-input-short"/>
									<div class="show enroll-time-show2 short-time-show">
										08:00
									</div>
								</li>
								<li>
									<input type="text" class="time-input-long datepicker"/>
							
									<div class="show enroll-time-show1 long-time-show">
										2013-03-06
									</div>
									<input type="text" class="time-input-short"/>
									<div class="show enroll-time-show2 short-time-show">
										08:00
									</div>
								</li>
								<li class="check-alert">
								</li>
							</ul>	
						</div>
						
					</div>
				</li>
				
				<li>
					<div class="difleft">
						<p>报名者提供的信息</p>
					</div>
					<div id="inf-needed" class="sub-content">
						<div class="input-wrap">
							<div class="inf-needed-each">
								<div class="click-box-null"></div>
								<div class="inf-needed-name">姓名</div>
							</div>
							<div class="inf-needed-each">
								<div class="click-box-null"></div>
								<div class="inf-needed-name">学号</div>
							</div>
							<div class="inf-needed-each">
								<div class="click-box-square clickboxmul"></div>
								<div class="inf-needed-name">手机</div>
							</div>
							<div class="inf-needed-each">
								<div class="click-box-square clickboxmul"></div>
								<div class="inf-needed-name">邮箱</div>
							</div>
							<div class="inf-needed-each">
								<div class="click-box-square clickboxmul"></div>
								<div class="inf-needed-name">年级</div>
							</div>
							<div class="inf-needed-each">
								<div class="click-box-square clickboxmul"></div>
								<div class="inf-needed-name">专业</div>
							</div>
							<div class="inf-needed-each">
								<div class="click-box-square clickboxmul"></div>
								<div class="inf-needed-name">性别</div>
							</div>
							<div class="inf-needed-each">
								<div class="click-box-square clickboxmul"></div>
								<div class="inf-needed-name">寝室</div>
							</div>
							
						
						</div>
						
					</div>
					
					<li id="more-inf-needed" class="difleft">
						<img src="img/add-icon.png" alt="" />
						<input type="text" class="input-long"/>
						<div id="more-inf-confirm" class="check" >
						</div>
					</li>
					
				</li>
				<li>
					<div class="left-sub-content" id="set-numlimit">
						<div class="click-box-square clickboxmul"></div>
						<div>设定名额限制</div>
						<input type="text" class="time-input-long"/>
					</div>
				</li>
				<li style="display:none">
					<div class="left-sub-content" id="need-to-provide">
						<div class="click-box-square clickboxmul"></div>
						<div>主办方需提供</div>
					</div>
					<div class="sub-content" id="need-to-provide-content">
						<ul>
							<li>
								<div class="click-box-square clickboxmul"></div>
								<div>联系人手机</div>
								<input type="text" class="input-long"/>
							</li>
							<li>
								<div class="click-box-square clickboxmul"></div>
								<div>领票地点</div>
							</li>
							<li id="ticket-location-display">
								<ul>
								</ul>
							</li>
							<li id="ticket-location">
								<img src="img/add-icon.png" alt="" />
								<input type="text" class="input-long"/>
								<div id="ticket-location-confirm" class="check" >
								</div>
								

							</li>
						</ul>
					</div>
				</li>
			</ul>

			<ul id="page4" class="page">

				<div id="album-topic">
					上传海报
				</div>
				<div class="pic-show">
					<div class='album-pic-wrap addevent-special'><div class='album-pic-delete delete-icon'></div></div>
				</div>
				<form id="add-pic-local-form" enctype="multipart/form-data" method="post" action="">
				<div id="choose-pic-wrap">
					<div id="choose-pic"></div>
					<div id="album-alert">每张图片大小最多可以为4MB</div>
					<input type="submit" id="pic-submit"/> 
					<input id="File1" class="album-input" type="file" name="File1"/>
				</div>
				</form>
					
			</ul>
		</div>
		<div id="confirm">
			<div class="confirm-each" id="prev"><p>上一步</p></div>
			<div class="confirm-each" id="next"><p>下一步</p></div>
		</div>
	</div>
</body>
</html>