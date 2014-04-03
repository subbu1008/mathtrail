<!doctype html>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s" %>
<html lang="en">
   <head>
   		<meta name="viewport" content="width=device-width,initial-scale=1" />
   		<meta name="apple-mobile-web-app-capable" content="yes" />
   		<title>Math Trail</title>
   		
   		<link rel="icon" type="image/png" href="images/heymath.png" />
   
   		<input type="hidden" id="contextPath" value = "<%=request.getContextPath()%>"/>
   		
   		<link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/css/960/min/960.css" />
		<link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/css/960/min/960_16_col.css" />
   
   		<link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/css/buttons.css" />
   		<link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/css/mathtrail/add2home.css">
   		
   		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-1.7.1/jquery.min.js"></script>
   		<script type="application/javascript" src="<%=request.getContextPath()%>/js/mathtrail/add2home.js"></script>
   		<script type="application/javascript" src="<%=request.getContextPath()%>/js/mathtrail/login.js"></script>
   		<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css" />
   		
   		<link href='http://fonts.googleapis.com/css?family=Aclonica' rel='stylesheet' type='text/css'>
   		<link href='http://fonts.googleapis.com/css?family=New+Rocker' rel='stylesheet' type='text/css'>
   		<link href='http://fonts.googleapis.com/css?family=Englebert' rel='stylesheet' type='text/css'>
   		<link href='http://fonts.googleapis.com/css?family=Rancho' rel='stylesheet' type='text/css'>
   		<link href='http://fonts.googleapis.com/css?family=Kite+One' rel='stylesheet' type='text/css'>
   		
   		<script src="http://code.jquery.com/jquery-1.8.2.js"></script>
    	<script src="http://code.jquery.com/ui/1.9.1/jquery-ui.js"></script>   	
    	   		
    </head>
    
   <!--  <script type="text/javascript">var switchTo5x=true;</script>
	<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
	<script type="text/javascript">stLight.options({publisher: "f74c1669-6193-447c-8226-453b6ca894b7"});</script>  -->
	
    
    <body style="background-image: url('<%=request.getContextPath()%>/images/background.png');">

			<div id="fb-root"></div>
			<script>(function(d, s, id) {
			  var js, fjs = d.getElementsByTagName(s)[0];
			  if (d.getElementById(id)) return;
			  js = d.createElement(s); js.id = id;
			  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
			  fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));</script> 

<br>
<div id="login" class="container_16">
<article class="grid_16">

	<div style="display:none" >
			<img src="images/heymath.png">
		</div>

	<!--   <div align="center">	
	  <img src="<%=request.getContextPath()%>/images/MathTrailLogo.gif" /> 
	</div> -->
	
	   <!--  <div align="center" style="color: #6D1E1E;font-size: 40pt;font-family:'Aclonica', sans-serif">
			<span>Math Trail</span>
		</div> -->
		
		<div align="center" style="position:absolute;index:-9999;width:100%;top:-50px;left:0%;">
			<img src="images/header.png" width="526" height="300">
		</div>
	
	<br><br>
	
	<div id="loginDetails" style="box-align:center;padding:0px;font:italic;font-family:Arial;font-size: 12pt;vertical-align:middle;border-color:#FFCD50;border-width: 5px;border-style: solid;border-radius:25px;background-color:white;margin-top:50px;position:relative;" >
	
	<!--  <div align="center">	
	  <a style="margin-top:0px;" href="http://www.heymath.com"  target="_blank" title="HeyMath! Home"><img src="<%=request.getContextPath()%>/images/heymathlogo.png" /></a>	   
	</div>  -->
	
	 <table cellspacing="0" cellpadding="0" border="0">	
	 <tr>
	 	<td colspan="2" style="text-align:center;margin-top:10px;padding-top:10px;"><img src="images/welcome.gif" /></td>
	 </tr>
	 <tr>
	 
   <td style="padding:0px 10px 0px 10px;font-family: 'Kite One', sans-serif;font-size: 12pt;" valign="top">
   		
   	 <ul>
   	   <li>Powered by Google Maps, these exciting trails take you to locations connected by a theme.</li>
   	   <li>Test your Math and geography skills along the way.</li>
   	   <li>To know how to play, please watch the video below.</li>
   	  </ul>  
   	    <!--  
   	   <li>You will visit 5 locations of importance to this great mathematician’s life.</li>
   	   <li>Test your Math and geography skills along the way.</li>
   	   <li>Follow the clues given to you to reach the correct locations. Then answer the Math problems to win gold, silver or copper coins.</li>
   	   <li>Once you solve a problem, a clue for the next location appears.</li>
   	   <li>Finally, click on "Trail Champions" to see where you stand!</li>
   	   </ul>  -->
   	   
		<div align="center">
		
			<iframe width="420" height="315" src="http://www.youtube.com/embed/icuq6vbE8mo?showsearch=0&showinfo=0&playlist=&modestbranding=1&egm=0&rel=0" frameborder="0" allowfullscreen></iframe>

		</div>
		
		<br>
		
		<div align="center">
	    
	    <!--   <s:form id="dashboardForm" action="getDashBoard" theme="simple" >
	     	<s:hidden id="trailKey" name="trailKey" value="Ramanujan" /> 
	     </s:form> --> 
	    
		 <a id="trailDashboard" href="getDashBoard" class="button blue bigrounded">Trail Champions !</a>
		</div>
	
   </td>
   <td valign="top" style="font-family: 'Kite One',sans-serif; font-size: 12pt; padding: 15px 20px 0px 10px;border-left:solid 1px #96A0AF;">
	 <s:form id="loginForm" action="loginUser" theme="simple" >
			    <table class="wwFormTable">				
			       		<tr>
			       		   <td style="font-size: 10pt;font-weight: bold"><s:label value="Please enter your E-mail id !" /></td>
						</tr>
		
			            <tr>
		    			    <td><s:textfield name="email" id="email"/></td>
						</tr>
						
						<tr id="trLoggedMsg" style="display:none">
		    			   <td width="175px"><s:label cssStyle="font:cursive;font-size:10pt;color:red;font-weight:bold" value="Looks like you are a new user ! Please provide the below details." /></td>
						</tr>
						
						<tr id="trInvalidEmail" style="display:none">
		    			   <td width="175px"><s:label cssStyle="font:cursive;font-size:10pt;color:red;font-weight:bold" value="A valid E-mail id please !" /></td>
						</tr>
			            
			            <tr id="trLabelName" style="display:none">
		    			   <td><s:label value="Name : " /></td>
						</tr>
				            
					    <tr id="trTextName" style="display:none">
		    			   <td><s:textfield name="name" maxlength="100" id="name"/></td>
		    			</tr>
		    			
		    			<tr id="trInvalidName" style="display:none">
		    			   <td width="175px"><s:label cssStyle="font:cursive;font-size:10pt;color:red;font-weight:bold" value="Only alphabets are allowed in the Name !" /></td>
						</tr>
					          
					    <tr id="trLabelCountry" style="display:none">
		    			   <td><s:label value="Country : " /></td>
						</tr>
		
					    <tr id="trTextCountry" style="display:none">
		    				<td><s:textfield name="country" maxlength="50" id="country" value="India"/></td>
						</tr>	
						
						<tr id="trInvalidCountry" style="display:none">
		    			   <td width="175px"><s:label cssStyle="font:cursive;font-size:10pt;color:red;font-weight:bold" value="Pls enter a valid Country !" /></td>
						</tr>
							        	            
     			</table>
		        	            
     </s:form>
     
     		<br>
     
       		  <a id="startTrail" onclick="startTrail();" class="button red bigrounded">Start</a>
   </td>
   </tr>
   </table>
       
       <br><br>
       
       <div align="center" ><div class="fb-like" data-href="http://mathtrail.heymath.com" data-send="true" data-layout="button_count" data-width="450" data-show-faces="false"></div></div>
		
	<!-- <div align="center">
				<span class='st_fblike_hcount' displayText='Facebook Like'></span>
				<span class='st_twitter_hcount' displayText='Tweet'></span>
				<span class='st_email_hcount' displayText='Email'></span>
		</div>    -->


<div id="notes" style="background:#f0f0f0;border-radius:0px 0px 25px 25px;margin:15px 0px 0px 0px;">
	   <div style="float:left;width:550px;">
	   <ul style="font-size:12px;color:#96A0AF;padding:10px 25px;margin:0;width:580px;">
	   	<li>Site best viewed in Firefox 12+, Chrome 23+ at 1024 x 768 pixels resolution on MS Windows. Javascript should be enabled.</li>
	   	<li>All coins won in the trail will be virtual.</li>
	   	<li>Please do not hit the browser refresh button on the page with the map.</li>
	   	<li>For any queries contact <a href="mailto:mathtrail@heymath.com">mathtrail@heymath.com</a></li>
	   </ul>
	   </div>
	   <div style="float:right;padding-right:15px;"><a href="http://www.heymath.com"  target="_blank" title="HeyMath! Home"><img src="images/heymathlogo2.png" /></a></div>
	   <div style="clear:both;"></div>
	   
	   </div>	
          
 </div>

    
</article>

</div>
	

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
