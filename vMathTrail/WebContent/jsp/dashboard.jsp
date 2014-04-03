<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Top Players</title>

<link rel="icon" type="image/png" href="images/heymath.png" />

<link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/css/mathtrail/dashboard.css" />
<link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/css/buttons.css" />

<link href='http://fonts.googleapis.com/css?family=Aclonica' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=New+Rocker' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Englebert' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Rancho' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Kite+One' rel='stylesheet' type='text/css'>

</head>

<script type="text/javascript">
	function selectTrailDashBoard(trailKey){
				
				document.getElementById('trailKey').value = trailKey.value;

				// alert('After select' + trailKey.value);
				
				var dashboardForm = document.getElementById('dashboardForm');
				
				dashboardForm.submit();
				
			}

	function preSelectTrail(){

			var trailDropDown = document.getElementById('trailDropDown');
			var trailKey = document.getElementById('trailKey').value;

			// alert(trailKey);

			for ( var i = 0; i < trailDropDown.options.length; i++ ) {
		        if ( trailDropDown.options[i].value == trailKey ) {
		        	trailDropDown.options[i].selected = true;
		            return;
		        }
		    }
		
	}
</script>

<body onload="preSelectTrail();" style="background: url('<%=request.getContextPath()%>/images/backgroundTrailSelect.png');">

<div align="center">	
	  <img style="height:40px;width: auto;" src="<%=request.getContextPath()%>/images/heymathlogo.png" /> 
	</div>

<div align="right">
	<a id="trailClose" href="close" class="button red bigrounded">X</a> 
	    &nbsp&nbsp
	</div><br>
	

<div class="dashBoardStyle">

<div>
<br>
	<!--  <div align="center"> <img src="<%=request.getContextPath()%>/images/dashboard/trailChampsTitle.gif" /> </div> -->
	<div align="center" style="color: #6D1E1E;font-size: 40pt;font-family:'Aclonica', sans-serif">
		<span>Trail Champions</span>
	</div>
<br>
	<div align="center"><span style="color: #6D1E1E;font-family: 'Kite One', sans-serif;font-size: 14pt;"><b>( Top 20 Players )</b></span></div>

</div>

<br>

<s:form id="dashboardForm" action="getDashBoard" theme="simple" >
  	<input type="hidden" id="trailKey" name="trailKey" value="<s:property value="trailKey" />" /> 
</s:form>

<div align="center">
<div style="overflow:hidden;display:inline-block;color: #6D1E1E;font-family: 'Kite One', sans-serif;font-size: 14pt;font-weight:bold">Trail : </div>
	<!--  <a id="trailDashboard" href="getDashBoard" >Ramanujan</a>&nbsp;|&nbsp;
	<a id="trailDashboard" href="getDashBoard" >Ramanujan - Junior</a> -->
	<div class="styddd">	
	<select id="trailDropDown" onchange="selectTrailDashBoard(this);">
	
	<s:iterator value="allTrailDetails">
		<s:if test='%{trailLiveStatus == "Y"}'>
	  		<option value="<s:property value="trailKey" />" ><s:property value="trailName" /></option>
	  	</s:if>
	</s:iterator> 
	 
	</select>
	</div> 
</div>

<br>

<div style="overflow:auto;font-family: 'Kite One', sans-serif;" >
<table>
<tr style="height:80px;">
<td>Rank</td><td>Player</td><td>Institution</td><td>Country</td><td>Score</td>
<td>Time taken</td>
</tr>

<s:iterator value="dashBoardData">

<tr height="60px";style="overflow:auto;font-family: 'Kite One', sans-serif;">
<td><s:property value="playerRank" /></td>
<td><s:property value="userName" /></td>
<td><s:property value="institution" /></td>

<td align="center"><s:if test='%{country == "India" || country == "Singapore" || country == "USA" || country == "Canada"}'>
    <img style="width: 80px;height: auto" src="<%=request.getContextPath()%>/images/countryFlags/<s:property value="country"/>.jpg" />
</s:if>
<s:else>
   <s:property value="country" />
</s:else>
</td>

<!--   <td align="center">
<s:if test='%{trailKey == "7Wonders"}'>
   <span>7 Wonders</span>
</s:if>
<s:elseif test='%{trailKey == "SGRiver"}'>
	<span>SG River</span>
</s:elseif>
<s:else>
   <s:property value="trailKey" />
</s:else>
</td> -->

<!-- <td align="center">
<s:if test='%{trailComplete == "Y"}'>
   <img style="width: 50px;height: auto" src="<%=request.getContextPath()%>/images/dashboard/standingHorse.png" />
</s:if>
<s:elseif test='%{trailComplete == "N"}'>
   <img style="width: 50px;height: auto" src="<%=request.getContextPath()%>/images/dashboard/runningHorse.png" />
</s:elseif>
</td> -->

<td>
<s:if test='%{trailComplete == "Y"}'>
   <div style="padding:0px 0px 0px 10px;" align="center">
			<img style="width: 50px;height: auto;float:left;" src="images/dashboard/standingHorse.png" >
	</div>
</s:if>
<s:elseif test='%{trailComplete == "N"}'>
   <div style="padding:0px 0px 0px 10px;" align="center">
			<img style="width: 50px;height: auto;float:left;" src="images/dashboard/runningHorse.png" >
	</div>
</s:elseif>
	
<div align="left" style="padding:0px 0px 10px 70px;">
<s:if test='%{trailComplete == "Y"}'>
   <span>Complete with </span>
</s:if>
<s:elseif test='%{trailComplete == "N"}'>
   <span></>In progress with </span>
</s:elseif>
	<span><s:property value="goldScore" /> Gold , <s:property value="silverScore" /> Silver and <s:property value="copperScore" /> Copper coins</span><br><br>	

<s:iterator begin="1" end='%{goldScore}' step="1">
	 <img src="<%=request.getContextPath()%>/images/coins/gold_small.png" />
</s:iterator>

<s:iterator begin="1" end='%{silverScore}' step="1">
	 <img src="<%=request.getContextPath()%>/images/coins/silver_small.png" />
</s:iterator>

<s:iterator begin="1" end='%{copperScore}' step="1">
	 <img src="<%=request.getContextPath()%>/images/coins/copper_small.png" />
</s:iterator>
</div>

</td>

<td>
	<s:property value="totalTime" />
</td>

</tr>
</s:iterator>
</table>
</div>

</div>

</body>
</html>