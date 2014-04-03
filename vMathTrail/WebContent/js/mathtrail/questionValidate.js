<script type="text/javascript">

function selectAnswer(){

	// alert('');
	// document.getElementById('ansSubmit').disabled = false;

}

function submitAnswer(){


	var uax = document.getElementById('uax').value;
	var goldScore = parseInt(document.getElementById('goldScore').value);
	var silverScore = parseInt(document.getElementById('silverScore').value);
	var copperScore = parseInt(document.getElementById('copperScore').value);
	var locIndex = parseInt(document.getElementById("locIndex").value);
	var contextPath = document.getElementById("contextPath").value;
	
	var locCount = parseInt(document.getElementById('locCount').value);
	var helperFlag = document.getElementById('helperFlag').value;
	
	// var questionAttempted = document.getElementById('questionAttempted').value;
	var ax = "";

	// alert(uxId);

	var answer = document.frmRadio.answer;

	var radioLength = answer.length;

	for (var i = 0; i < radioLength; i++) {
        if (answer[i].checked) {
        	ax = answer[i].value;
            break;
        }
      }
	
	if( ax != "" ){

			displayDistanceTravelled();
		
		    if(uax == ax && helperFlag == 'N'){
		    	goldScore++;
				// alert('JS Cheers! Right answer - Score :' + score);
				document.getElementById('questionSection').style.display = "none";
				document.getElementById('resultSectionGold').style.display = "block";
		    }else if(uax == ax && helperFlag == 'Y'){
		    	silverScore++;
		    	document.getElementById('questionSection').style.display = "none";
				document.getElementById('resultSectionSilverHelp').style.display = "block";
		    }else if(uax != ax && helperFlag == 'N'){
		    	silverScore++;
		    	document.getElementById('questionSection').style.display = "none";
				document.getElementById('resultSectionSilver').style.display = "block";
		    }else if(uax != ax && helperFlag == 'Y'){
		    	copperScore++;
		    	document.getElementById('questionSection').style.display = "none";
				document.getElementById('resultSectionCopper').style.display = "block";
		    }
		    
		    if( locIndex == (locCount-1) )
		    {
		    	
		    	// alert('End of trail ' + locIndex + ' locCount : ' + locCount);
		    	
		    	document.getElementById('questionSection').style.display = "none";
				document.getElementById('resultSectionGold').style.display = "none";
				document.getElementById('resultSectionSilverHelp').style.display = "none";
				document.getElementById('resultSectionSilver').style.display = "none";
				document.getElementById('resultSectionCopper').style.display = "none";
				document.getElementById('resultSectionTrailComplete').style.display = "block";
				
				var resultCoinsDiv = document.getElementById('resultCoinScore');
				
				resultCoinsDiv.innerHTML = "";
				
				var coinScore = goldScore + ' gold <img src="images/coins/gold_small.png"/> coin(s)<br/><br/>';
				coinScore = coinScore + silverScore + ' silver <img src="images/coins/silver_small.png"/> coin(s)<br/><br/>';
				coinScore = coinScore + copperScore + ' copper <img src="images/coins/copper_small.png"/> coin(s)<br/><br/>';
				
				resultCoinsDiv.innerHTML = coinScore;		
				
		    }
		            
		    // alert('goldScore ' + goldScore);
		    // alert('silverScore ' + silverScore);
		    
		    document.getElementById('goldScore').value = goldScore;
		    document.getElementById('silverScore').value = silverScore;
		    document.getElementById('copperScore').value = copperScore;
		    
		    document.getElementById('questionAttempted').value = 'Y';
    
	}
    
}

function displayDistanceTravelled()
{
	var distanceTravelled = document.getElementById('distanceTravelled').value;
	
	var divDistanceTravelled = document.getElementById('divDistanceTravelled');
	
	// divDistanceTravelled.innerHTML = '<span style="font-size: 14px;color: blue;font-weight: bold">So far, you have travelled a distance of ' + distanceTravelled + ' km. </span>';
	
}

</script>