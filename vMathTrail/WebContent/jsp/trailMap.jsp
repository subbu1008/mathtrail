<!doctype html>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s" %>
<%@taglib uri="/struts-jquery-tags" prefix="sj" %>
<html lang="en">
   <head>

		<meta name="viewport" content="width=device-width,initial-scale=1" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		
		<link rel="icon" type="image/png" href="images/heymath.png" />
		
		<link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/css/960/min/960.css" />
		<link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/css/960/min/960_16_col.css" />
		<link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/css/normalize/min/normalize.css" />
		<link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/css/prettify/min/prettify.css" />
		<link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/css/style.css" />
		<link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/css/buttons.css" />
		<link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/css/jquery-mobile-1.0/jquery.mobile-1.1.1.css" />
		<link href='http://fonts.googleapis.com/css?family=Aclonica' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Kite+One' rel='stylesheet' type='text/css'>
	
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/modernizr-2.0.6/modernizr.min.js"></script>
		<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
		
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-1.7.1/jquery.min.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/underscore-1.2.2/underscore.min.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/backbone-0.5.3/backbone.min.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/demo.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/ui/jquery.ui.map.js"></script>	
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/infobubble/infobubble.js"></script>		
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/mathtrail/trail.js"></script>
		<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false&v=3&libraries=geometry"></script>
    </head>
    
     <body style="background-image: url('<%=request.getContextPath()%>/images/background.png');">
     
  	<!--   <div id="fb-root"></div>
			<script>(function(d, s, id) {
				  var js, fjs = d.getElementsByTagName(s)[0];
				  if (d.getElementById(id)) return;
				  js = d.createElement(s); js.id = id;
				  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
				  fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));
			</script> --> 

		<input type="hidden" id="contextPath" value = "<%=request.getContextPath()%>"/>
   		<input type="hidden" id="locCount" value = "0"/>
   		<input type="hidden" id="locIndex" value = <s:property value="locIndex"/> />
   		<input type="hidden" id="questionAttempted" value = "<s:property value="questionAttempted"/>" />
   		<input type="hidden" id="helperFlag" value = "<s:property value="helperFlag"/>" />
   		
   		<s:form id="closeForm" action="feedbackForm" theme="simple">
   			<input type="hidden" id="userId" name="userId" value = <s:property value="userId"/> />
   			<input type="hidden" id="trailKey" name="trailKey" value = "<s:property value="trailKey"/>" />
   		</s:form>
   		
   		<input type="hidden" id="goldScore" value = <s:property value="goldScore"/> />
   		<input type="hidden" id="silverScore" value = <s:property value="silverScore"/> />
   		<input type="hidden" id="copperScore" value = <s:property value="copperScore"/> />
   		
   		<input type="hidden" id="trailComplete" value = <s:property value="trailComplete"/> />
   		<input type="hidden" id="distanceTravelled" value = "" />

<div id="trailMap" style="vertical-align: top" class="container_16">
<article class="grid_16">

	<!--  <div align="left">	
	  <img src="/images/heymathlogo.png" /> 
	</div>  -->
	<br>
	
	<!--   <div align="right">
	
	    <a id="instructions" class="button blue bigrounded">?</a> 
	    &nbsp&nbsp&nbsp&nbsp
	    <a id="trailClose" class="button red bigrounded">X</a> 
	    &nbsp&nbsp
	</div>
	
	<s:if test='%{trailKey == "Ramanujan"}'>
  		 <div align="center" style="color: #6D1E1E;font-size: 30pt;font-family:'Aclonica', sans-serif;">
			<span>Ramanujan Trail</span>
		</div>	
	</s:if>
	<s:elseif test='%{trailKey == "7Wonders"}'>
		<div align="center" style="color: #6D1E1E;font-size: 30pt;font-family:'Aclonica', sans-serif">
			<span>7 Wonders Trail</span>
		</div>
	</s:elseif> -->
	
	
	<div style="width:100%;color: #6D1E1E;font-size: 30pt;font-family:'Aclonica', sans-serif;">
    	<div style="float:left;padding-left:250px;">
    	<s:if test='%{trailKey == "Ramanujan"}'>
    		<span style="font-size: 30pt">Ramanujan Trail</span>
    	</s:if>
    	<s:elseif test='%{trailKey == "Rjunior"}'>
    		<span style="font-size: 20pt">Ramanujan Trail - Junior</span>
    	</s:elseif>
    	<s:elseif test='%{trailKey == "Cricket"}'>
    		<span style="font-size: 30pt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cricket Trail</span>
    	</s:elseif>  
    	<s:elseif test='%{trailKey == "7Wonders"}'>
    		<span style="font-size: 30pt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7 Wonders Trail</span>
    	</s:elseif>
    	<s:elseif test='%{trailKey == "Islands"}'>
    		<span style="font-size: 20pt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Famous Islands Trail</span>
    	</s:elseif>
    	<s:elseif test='%{trailKey == "Towers"}'>
    		<span style="font-size: 30pt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Towers Trail</span>
    	</s:elseif>
    	<s:elseif test='%{trailKey == "EminMath1"}'>
    		<span style="font-size: 20pt">Eminent Mathematicians - I</span>
    	</s:elseif>
    	<s:elseif test='%{trailKey == "Rivers"}'>
    		<span style="font-size: 30pt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rivers Trail</span>
    	</s:elseif>
    	<s:elseif test='%{trailKey == "Olympics"}'>
    		<span style="font-size: 30pt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Olympics Trail</span>
    	</s:elseif>
    	<s:elseif test='%{trailKey == "Rail"}'>
    		<span style="font-size: 30pt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rail Trail</span>
    	</s:elseif>
    	</div>
    	<div style="float:right;width:200px;margin:-10px;">
	    <a class="button blue bigrounded" id="instructions">?</a>&nbsp;<a class="button red bigrounded" id="trailClose">X</a>
    	</div>
    	<div style="clear:both;"></div>
	</div>
	
	
	<br>
	
	<div id="coinScore" align="center">	
	  
	</div>
	

<div class="item rounded dark">
	<div id="map_canvas" class="map rounded"></div>
</div>

				
	<div id= "divClueLoc" align="center">
		<a id="locClue" href="#" class="button white bigrounded">Click on the START icon to start the trail !</a>	
	</div> 
	
	<div id= "divClueNextLoc" style="display:none" align="center">
		<a id="nextlocClue" href="#" class="button white bigrounded">Please wait !</a>	
	</div>
	
	<br>
	
	<div id="divShowOverall" style="display:none" align="center">	
				<a id="showOverall" class="button green bigrounded">Show location !</a> 
			<!-- &nbsp&nbsp&nbsp&nbsp
			   <div id="divShowVicinity" align="right">
				<a id="showVicinity" class="button green bigrounded">Show vicinity !</a>
			</div> 
			&nbsp&nbsp&nbsp&nbsp -->
	</div>				
					
</article>
</div>
	
	<br><br>
	
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
