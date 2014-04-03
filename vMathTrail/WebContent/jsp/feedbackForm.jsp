<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Trail Feedback</title>

<script type="application/javascript" src="<%=request.getContextPath()%>/js/mathtrail/feedback.js"></script>

<link rel="icon" type="image/png" href="images/heymath.png" />

<link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/css/mathtrail/dashboard.css" />
<link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/css/buttons.css" />

<link href='http://fonts.googleapis.com/css?family=Aclonica' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=New+Rocker' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Englebert' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Rancho' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Kite+One' rel='stylesheet' type='text/css'>

</head>
<script type="text/javascript">var switchTo5x=true;</script>
<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
<script type="text/javascript">stLight.options({publisher: "f74c1669-6193-447c-8226-453b6ca894b7"});</script>

<body style="background: url('<%=request.getContextPath()%>/images/backgroundTrailSelect.png');">

<div id="fb-root"></div>
			<script>(function(d, s, id) {
			  var js, fjs = d.getElementsByTagName(s)[0];
			  if (d.getElementById(id)) return;
			  js = d.createElement(s); js.id = id;
			  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
			  fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));</script> 


	<div align="center">	
	  <img style="height:40px;width: auto;" src="<%=request.getContextPath()%>/images/heymathlogo.png" /> 
	</div><br><br>

<s:form id="feedbackForm" action="submitFeedback" theme="simple">

<input type="hidden" id="userId" name="userId" value = <s:property value="userId"/> />
<input type="hidden" id="trailKey" name="trailKey" value = "<s:property value="trailKey"/>" />

<div class="dashBoardStyle">

<br>
<div align="left" style="color: #6D1E1E;padding:0px 0px 0px 30px;font-size: 20pt;font-family:'Aclonica', sans-serif">
			<span style="font-family: 'Kite One', sans-serif;font-size: 20pt; font-weight:bolder;text-decoration:underline;">Trail Feedback</span>
			<br><br>
			<span style="font-family: 'Kite One', sans-serif;font-size: 15pt;">What do you think of the trail ?</span>
			<br><br>			
			<s:hidden id="trailRating" name="trailRating" value="AW"/>
			
			<div id="msgRating" style="display: none;"><s:label cssStyle="font:cursive;font-size:10pt;color:red;" value="Please rate the trail !" /></div>
			<div style="font-family: 'Kite One', sans-serif;font-size: 12pt;">
			<input type="radio" name="group1" id="awesome" onclick="selectRating()" value="AW" checked="checked"><label for="awesome"><span>Awesome</span></label>
			<input type="radio" name="group1" id="verygood" onclick="selectRating()" value="VG"><label for="verygood"><span>Very Good</span></label>
			<input type="radio" name="group1" id="good" onclick="selectRating()" value="GD"><label for="good"><span>Good</span></label>
			<input type="radio" name="group1" id="needimp" onclick="selectRating()" value="NI"><label for="needimp"><span>Needs Improvement</span></label>
			</div>
			<br>			
			<span style="font-family: 'Kite One', sans-serif;font-size: 15pt;">Share on Social Media !</span><br>
			<!--	<span class='st_fblike_hcount' displayText='Facebook Like'></span>
				<span class='st_twitter_hcount' displayText='Tweet'></span>
				<span class='st_email_hcount' displayText='Email'></span> -->
			<div class="fb-like" data-href="http://mathtrail.heymath.com" data-send="true" data-layout="button_count" data-width="450" data-show-faces="false"></div>
			<br><br>
			<span style="font-family: 'Kite One', sans-serif;font-size: 15pt;">What can be made better ?</span> 
			<br><br>
				<div id="msgComments" style="display: none;"><s:label cssStyle="font:cursive;font-size:10pt;color:red;" value="Please enter valid comments !" /></div>
			<s:textarea name="userComments" id="userComments" rows="6" cols="70" value="" />
			<br><br>
			<span style="font-family: 'Kite One', sans-serif;font-size: 15pt;">How did you come to know of the Trail ?</span>
			<br><br>			
			<s:hidden id="sourceOfInfo" name="sourceOfInfo" value="YW"/>
			
			<div id="msgSourceOfInfo" style="display: none;"><s:label cssStyle="font:cursive;font-size:10pt;color:red;" value="Please enter Source of Info !" /></div>
			<div style="font-family: 'Kite One', sans-serif;font-size: 12pt;">
			<input type="radio" name="group3" id="youngworld" onclick="selectSourceOfInfo()" value="YW" checked="checked"><label for="youngworld"><span>Young World</span></label>
			<input type="radio" name="group3" id="facebook" onclick="selectSourceOfInfo()" value="FB"><label for="facebook"><span>Facebook</span></label>
			<input type="radio" name="group3" id="twitter" onclick="selectSourceOfInfo()" value="TW"><label for="twitter"><span>Twitter</span></label>
			<input type="radio" name="group3" id="heymath" onclick="selectSourceOfInfo()" value="HM"><label for="heymath"><span>HeyMath! Website</span></label>
			<input type="radio" name="group3" id="others" onclick="selectSourceOfInfo()" value="OT"><label for="others"><span>Others</span></label>
			</div>
			<br>
</div>

</div>

<br>

<div class="dashBoardStyle">

<br>
<div align="left" style="color: #6D1E1E;padding:0px 0px 0px 30px;font-size: 20pt;font-family:'Aclonica', sans-serif">
			<span style="font-family: 'Kite One', sans-serif;font-size: 20pt;font-weight:bolder;text-decoration:underline;">A little bit more about yourself</span>
			<br><br>
			<span style="font-family: 'Kite One', sans-serif;font-size: 15pt;">I am a</span>
			<br>
			
			<s:hidden id="userRole" name="userRole" value="ST"/>
			<div id="msgUserRole" style="display: none;"><s:label cssStyle="font:cursive;font-size:10pt;color:red;" value="Please tell us what you do !" /></div>
			
			<div style="font-family: 'Kite One', sans-serif;font-size: 12pt;">
				<input type="radio" name="group2" id="student" onclick="selectStudent()" value="ST" checked="checked"><label for="student"><span>Student</span></label>
				<input type="radio" name="group2" id="parent" onclick="selectStudent()" value="PA"><label for="parent"><span>Parent</span></label>
				<input type="radio" name="group2" id="teacher" onclick="selectStudent()" value="TC"><label for="teacher"><span>Teacher</span></label>
				<input type="radio" name="group2" id="others" onclick="selectStudent()" value="OT"><label for="others"><span>Others</span></label>
			</div>
			<div id="parentMail" style="display: block">
				<br>
				<span style="font-family: 'Kite One', sans-serif;font-size: 15pt;">My Parent's mail id:</span><br>
				<s:textfield id="parentMailId" name="parentMailId"/>
			</div>
			<br>
			<div id="msgSchool" style="display: none;"><s:label cssStyle="font:cursive;font-size:10pt;color:red;" value="Please mention your School/Institution !" /></div>
			<span style="font-family: 'Kite One', sans-serif;font-size: 15pt;">School / Institution:</span><br>
			<s:textfield id="institute" name="institute" value=""/>
			<br><br>
</div>

</div>

<br>
		<div align="center">
		 <a id="feedbackSubmit" onclick="submitFeedback();" class="button red bigrounded">Submit Feedback</a>
		</div>

</s:form>

</body>
	<!--  Code added below for Google Analytics -->
	
	<script type="text/javascript">

		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-950239-10']);
		  _gaq.push(['_trackPageview']);
		
		  (function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();
		
	</script>

</html>