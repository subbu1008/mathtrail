function selectStudent()
{
	var radioButtons = document.getElementsByName("group2");
	var selectedValue;
	
	      for (var x = 0; x < radioButtons.length; x ++) {
	        if (radioButtons[x].checked) {
	        	selectedValue = radioButtons[x].value;
	        }
	      }
	      
    document.getElementById('userRole').value = selectedValue;
	      
	if( selectedValue == 'ST' )
		document.getElementById('parentMail').style.display = "block";
	else
		document.getElementById('parentMail').style.display = "none";
	
	document.getElementById("userRole").value = selectedValue;
	
}

function selectRating()
{
	var ratRadioButtons = document.getElementsByName("group1");
	var selectedRating;
	
	for (var x = 0; x < ratRadioButtons.length; x ++) {
        if (ratRadioButtons[x].checked) {
        	selectedRating = ratRadioButtons[x].value;
        }
      }
	
	document.getElementById('trailRating').value = selectedRating;
	
}

function selectSourceOfInfo()
{
	var ratRadioButtons = document.getElementsByName("group3");
	var sourceOfInfo;
	
	for (var x = 0; x < ratRadioButtons.length; x ++) {
        if (ratRadioButtons[x].checked) {
        	sourceOfInfo = ratRadioButtons[x].value;
        }
      }
	
	document.getElementById('sourceOfInfo').value = sourceOfInfo;
	
}

function submitFeedback()
{
	var feedbackForm = document.getElementById('feedbackForm');
	
	var trailRating = document.getElementById("trailRating").value;
	var userRole = document.getElementById("userRole").value;
	var comments = document.getElementById("userComments").value;
	var institute = document.getElementById("institute").value;
	
	
	var msgRating = document.getElementById("msgRating");
	var msgComments = document.getElementById("msgComments");
	var msgUserRole = document.getElementById("msgUserRole");
	var msgSchool = document.getElementById("msgSchool");	
	
	selectRating();
	selectStudent();
	selectSourceOfInfo();
	
	var letters = /^[A-Za-z\s]+$/;
	
	if( trim(comments) == '' || trim(institute) == '' || trailRating == '' ||  userRole == '' )  
	{  
		
			
		if(trim(comments) == '' )  
		{  
			msgComments.style.display = 'block';
		}else{
			msgComments.style.display = 'none';
		}
		
		if(trim(institute) == '')  
		{  
			msgSchool.style.display = 'block';
		}else{
			msgSchool.style.display = 'none';
		}
		
		if(trailRating == '' )  
		{  
			msgRating.style.display = 'block';
		}else{
			msgRating.style.display = 'none';
		}
		
		if(userRole == '' )  
		{  
			msgUserRole.style.display = 'block';
		}else{
			msgUserRole.style.display = 'none';
		}
		
		return;  
	} 
	
	feedbackForm.submit();

}

function trim(text) {
    return text.replace(/^\s+|\s+$/g, "");
}
