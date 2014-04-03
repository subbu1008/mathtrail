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
    
  <script type="text/javascript">
  
	function selectTrail(trailKey){
				
				document.getElementById('trailKey').value = trailKey;
				
				var trailSelectForm = document.getElementById('trailSelectForm');
				
				trailSelectForm.submit();
				
			}
	
	</script>
	
    
<body style="background-image: url('<%=request.getContextPath()%>/images/backgroundTrailSelect.png');" onload="getFriends()">

 <s:form id="trailSelectForm" action="userTrailDetails" theme="simple" >
	<input type="hidden" id="userId" name="userId" value = <s:property value="userId"/> />
	<input type="hidden" id="trailKey" name="trailKey" value = "" />
 </s:form>

<div id="selectTrail" align="center" class="container_16">

	<div align="center">	
	  <img style="height:40px;width: auto;" src="<%=request.getContextPath()%>/images/heymathlogo.png" /> 
	</div>
	
	<br>
	
	<div align="center" style="color: #6D1E1E;font-size: 25pt;font-family:'Aclonica', sans-serif">
			<span>Trail List</span>
		</div>
		
	<br>
		
	<div style="width: 960px;">
	
	<s:iterator value="allTrailDetails" status="status">
	
	
		<div style="box-align:center;padding:10px 5px 15px 5px;font:italic;font-family:Arial;font-size: 12pt;vertical-align:middle;width: 290px;height: 150px;border: 3px #6D1E1E solid;border-width: 4px;border-style: groove;border-radius:10px;float:left;margin: 5px;">
			
			<div style="color: #6D1E1E;font-size: 14pt;font-family:'Aclonica', sans-serif;">
				<span><s:property value="trailName" /></span><br><br>
			</div>
			
			<s:if test='%{trailKey == "EminMath1"}'>
    			<div style="padding:0px 0px 0px 20px;" align="center">
					<img style="float:left;" src="images/trailLogos/<s:property value="trailKey" />.png" >
				</div>
    		</s:if>
    		<s:else>
				<div style="padding:0px 0px 0px 0px;" align="center">
						<img style="float:left;" src="images/trailLogos/<s:property value="trailKey" />.png" >
				</div>
			</s:else>
	    		    			
			<div align="left" style="padding:0px 0px 10px 120px;color: #6D1E1E;font-size: 14pt;font-family:'Aclonica', sans-serif;">
				<!-- <span style="font-family: 'Kite One', sans-serif;font-size: 14pt;"><s:property value="trailDesc" /></span><br> -->
				 
				<span style="font-family: 'Kite One', sans-serif;font-size: 10pt;">Difficulty level :</span>
				<s:if test='%{trailDiffLevel == "High"}'>
					<span style="font-family: 'Kite One', sans-serif;font-size: 10pt;font-weight: bold;color: red"><s:property value="trailDiffLevel" /></span>
				</s:if>
				<s:elseif test='%{trailDiffLevel == "Medium"}'>
					<span style="font-family: 'Kite One', sans-serif;font-size: 10pt;font-weight: bold;color: blue"><s:property value="trailDiffLevel" /></span>
				</s:elseif>
				<s:elseif test='%{trailDiffLevel == "Low"}'>
					<span style="font-family: 'Kite One', sans-serif;font-size: 10pt;font-weight: bold;color: green"><s:property value="trailDiffLevel" /></span>
				</s:elseif>
								
				<br>
				<span style="font-family: 'Kite One', sans-serif;font-size: 10pt;">Location count : <s:property value="maxLocCount" /></span><br><br>
				<s:if test='%{trailLiveStatus == "Y"}'>
					<a id="ramanujanTrail" onclick="selectTrail('<s:property value="trailKey" />');" class="button red bigrounded">Go</a>
				</s:if>
				<s:else>
					<span style="font-family: 'Kite One', sans-serif;font-size: 18pt;color:#C31616"><B>Coming soon ...</B></span>
				</s:else>
			</div>	
	
		</div>
					
	</s:iterator>
	
	<div style="clear:both;"></div>
	
	</div>
	
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
