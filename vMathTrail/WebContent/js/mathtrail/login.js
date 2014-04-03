			var submitForm = false;
			var validateOthers = false;
		
			function startTrail()
			{

				if(!submitForm){
					
						var email = document.getElementById('email').value;
						var nameField = document.getElementById('name').value;
						var countryField = document.getElementById('country').value;
						var contextPath = document.getElementById('contextPath').value;
						
						var trElementLoggedMsg = document.getElementById("trLoggedMsg");
						var trElementNameMsg = document.getElementById("trInvalidName");
						var trElementCountryMsg = document.getElementById("trInvalidCountry");
						var trInvalidEmail = document.getElementById("trInvalidEmail");
						

						if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))  
						  {  
							
							/* var emailValidationUrl = 'http://192.168.46.150/cgi-bin/response.cgi?mailaddress=' + email;
							
							alert(emailValidationUrl);
							
							var data = jQuery.parseJSON(
							      jQuery.ajax({
								  url: emailValidationUrl,
								  async: false
								 }).responseText
							);	
							
							alert(data);
							
							var validEmail = emailValidResponse.valid;
							
							if(validEmail == 'N'){
								trInvalidEmail.style.display = 'block';
								return;
							} */
							
							trInvalidEmail.style.display = 'none';
						  }
						else{
							  trInvalidEmail.style.display = 'block';
							  return;
						  }				
		
						var userCheckUrl = contextPath + '/checkUserLogin.action';
					    var userCheckParams = 'email=' + email;
		
					    // alert("The userCheckUrl : " + userCheckUrl);
					    				
						var userCountData = jQuery.parseJSON(
								      jQuery.ajax({
									  url: userCheckUrl,
									  data: userCheckParams,
									  async: false
									 }).responseText
								);
		
		
						var userCount = parseInt(userCountData.userCount); 
		
						if( userCount <= 0)
						{				
							if(!validateOthers){
								showOthers();
								validateOthers = true;
								return;
							}

							var letters = /^[A-Za-z\s]+$/;  

							if( ( !nameField.match(letters) || trim(nameField)  == '' ) || ( !countryField.match(letters) || trim(countryField) == '') )  
							{  
								
								trElementLoggedMsg.style.display = 'none';
								
								if(!nameField.match(letters) || trim(nameField) == '' )  
								{  
									trElementNameMsg.style.display = 'block';
								}else{
									trElementNameMsg.style.display = 'none';
								}
								
								if(!countryField.match(letters) || trim(countryField) == '' )  
								{  
									trElementCountryMsg.style.display = 'block';
								}else{
									trElementCountryMsg.style.display = 'none';
								}
								
								return;  
							} 
							
							submitForm = true;							
						}else{
							submitForm = true;
						}

				}

				if(submitForm){
					var loginForm = document.getElementById('loginForm');
					
					loginForm.submit();
				}
				 				
			}  
			
			function trim(text) {
			    return text.replace(/^\s+|\s+$/g, "");
			}

			function showOthers()
			{
				var optionalTrs = ["trLoggedMsg","trLabelName","trTextName","trLabelCountry","trTextCountry"];

				for (var i = 0; i < optionalTrs.length; ++i) {

					  var trElement = document.getElementById(optionalTrs[i]);

					  trElement.style.display = 'block';
					
					  //alert(trElement.id);
					  
					}

				var trElementNameMsg = document.getElementById("trInvalidName");
				trElementNameMsg.style.display = 'none';
				
			} 	
			
			 $("#trailDashboard").click(function(){
				
				var trailDashboardForm = document.getElementById('dashboardForm');
				
				trailDashboardForm.submit();
				
			});
			
			    $(function() {
			        var countryTags = [
						"Afghanistan",
						"Argentina",
						"Australia",
						"Austria",
						"Bahamas",
						"Bahrain",
						"Bangladesh",
						"Belgium",
						"Benin",
						"Bermuda",
						"Bhutan",
						"Bolivia",
						"Bouvet Island",
						"Brazil",
						"Bulgaria",
						"Burkina Faso",
						"Burundi",
						"Cambodia",
						"Canada",
						"Chile",
						"China",
						"Colombia",
						"Croatia",
						"Cuba",
						"Cyprus",
						"Denmark",
						"Djibouti",
						"Dominica",
						"Ecuador",
						"Egypt",
						"Eritrea",
						"Estonia",
						"Ethiopia",
						"Fiji",
						"Finland",
						"France",
						"Gabon",
						"Gambia",
						"Georgia",
						"Germany",
						"Ghana",
						"Gibraltar",
						"Greece",
						"Greenland",
						"Grenada",
						"Guadeloupe",
						"Guam",
						"Guatemala",
						"Guernsey",
						"Guinea",
						"Guinea-Bissau",
						"Guyana",
						"Haiti",
						"Honduras",
						"Hong Kong",
						"Hungary",
						"Iceland",
						"India",
						"Indonesia",
						"Iraq",
						"Ireland",
						"Isle Of Man",
						"Israel",
						"Italy",
						"Jamaica",
						"Japan",
						"Jersey",
						"Jordan",
						"Kazakhstan",
						"Kenya",
						"Kiribati",
						"Kuwait",
						"Kyrgyzstan",
						"Latvia",
						"Lebanon",
						"Lesotho",
						"Liberia",
						"Liechtenstein",
						"Lithuania",
						"Luxembourg",
						"Macao",
						"Madagascar",
						"Malawi",
						"Malaysia",
						"Maldives",
						"Mali",
						"Malta",
						"Martinique",
						"Mauritania",
						"Mauritius",
						"Mayotte",
						"Mexico",
						"Monaco",
						"Mongolia",
						"Montserrat",
						"Morocco",
						"Mozambique",
						"Myanmar",
						"Namibia",
						"Nauru",
						"Nepal",
						"Netherlands",
						"New Zealand",
						"Nicaragua",
						"Niger",
						"Nigeria",
						"Niue",
						"Norway",
						"Oman",
						"Pakistan",
						"Palau",
						"Panama",
						"Paraguay",
						"Peru",
						"Philippines",
						"Pitcairn",
						"Poland",
						"Portugal",
						"Puerto Rico",
						"Qatar",
						"Reunion",
						"Romania",
						"Russian Federation",
						"Rwanda",
						"Saint Helena",
						"Samoa",
						"San Marino",
						"Saudi Arabia",
						"Senegal",
						"Seychelles",
						"Sierra Leone",
						"Singapore",
						"Slovakia",
						"Slovenia",
						"Solomon Islands",
						"Somalia",
						"South Africa",
						"Spain",
						"Sri Lanka",
						"Sudan",
						"Suriname",
						"Swaziland",
						"Sweden",
						"Switzerland",
						"Tajikistan",
						"Thailand",
						"Timor-Leste",
						"Togo",
						"Tokelau",
						"Tonga",
						"Trinidad And Tobago",
						"Tunisia",
						"Turkey",
						"Turkmenistan",
						"Turks And Caicos Islands",
						"Tuvalu",
						"Uganda",
						"Ukraine",
						"United Arab Emirates",
						"United Kingdom",
						"USA",
						"Uruguay",
						"Uzbekistan",
						"Vanuatu",
						"Venezuela",
						"Viet Nam",
						"Wallis And Futuna",
						"Western Sahara",
						"Yemen",
						"Zambia",
						"Zimbabwe"
												            
			        ];
			        $( "#country" ).autocomplete({
			            source: countryTags
			        });
			    });