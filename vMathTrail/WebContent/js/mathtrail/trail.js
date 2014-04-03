$(function() {

				var self;
				var trailZoom;
				var trailMinZoom;
				var trailCenter;
				var currMap;
				var locCount;
				var locations;
				var markers = new Array();
				var oCircles = new Array();
				var mCircles = new Array();
				var vCircles = new Array();
				var arrowSequence = new Array();
				var trailLatLngs = new Array();
				var markerIndex;
				var trailMap;
				var trailPolyLine;
				var tTrailPolyLine;
				var visibleZoom;
				var trailDesc;
				var oCircleRequired;
				var oCircleRadius;
				var oButtonZoom;
				var oButtonRequired;
				var mCircleRequired;
				var mCircleRadius;
				var mCircleZoom;
				var vCircleRequired;
				var vCircleRadius;
				var vCircleZoom;
				var roundOffDivFactor;
				var infoBubbleLoc;
				var helpInfoBubble;
				var startInfoBubble;
				var setInv;
				var questionBox;
				var questionBoxContent;
				var questionHtmlSecStart;
				var questionHtmlSecEnd;
				var questionContentList;
				var nextLoc;
				var clueText;
				var qOpenFlag = false;
				var trailStarted = false;
				var threadStarted = false;
				var currOCircle;
				var prevOCircle;
				var closeForm;
				var nextLocCoord;
				
				var overallCircleInfoBubble;
				var vicinityCircleInfoBubble;
								
				var contextPath = document.getElementById("contextPath").value;
				var userId = document.getElementById("userId").value;
				var locIndex = parseInt(document.getElementById("locIndex").value);
				var trailKey = document.getElementById("trailKey").value;
				var goldScore = parseInt(document.getElementById('goldScore').value);
				var silverScore = parseInt(document.getElementById('silverScore').value);
				var copperScore = parseInt(document.getElementById('copperScore').value);
				var questionAttempted = document.getElementById('questionAttempted').value;
				var helperFlag = document.getElementById('helperFlag').value;
				var trailComplete = document.getElementById('trailComplete').value;
				var distanceTravelled;
				
				var touchMove = function(event) {
					event.preventDefault();
					};
					
				// alert("Context path : " + contextPath);

				demo.add(function() {
						
						/* window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,
						function (str, key, value) {

						  if(key=="trail")
						  {
						    trailName = value;
						  }

						}); */
												
						// alert("Trail : " + trailName + " Lesson : " + lessonName);


						var trailTxtUrl = contextPath + '/data/' + trailKey + '.txt';
												
						var data = jQuery.parseJSON(
						      jQuery.ajax({
							  url: trailTxtUrl,
							  async: false
							 }).responseText
						);

						trailDesc = data.trailDesc;
						
						trailCenter = new google.maps.LatLng(parseFloat(data.trailCenter.latCoord),parseFloat(data.trailCenter.lngCoord));
						trailZoom = parseFloat(data.trailZoom);
						trailMinZoom = parseFloat(data.trailMinZoom);
						visibleZoom = parseFloat(data.visibleZoom);

						oCircleRadius = parseFloat(data.oCircleRadius);
						oCircleRequired = data.oCircleRequired;
						
						oButtonZoom = parseFloat(data.oButtonZoom);
						oButtonRequired = data.oButtonRequired;
						
						mCircleZoom = parseFloat(data.mCircleZoom);
						mCircleRadius = parseFloat(data.mCircleRadius);
						
						vCircleZoom = parseFloat(data.vCircleZoom);
						vCircleRadius = parseFloat(data.vCircleRadius);
						
						roundOffDivFactor = parseFloat(data.roundOffDivFactor);
						
						vCircleRequired = data.vCircleRequired;
						mCircleRequired = data.mCircleRequired;
						infoBubbleLoc = new google.maps.LatLng(parseFloat(data.infoBubbleLoc.latCoord),parseFloat(data.infoBubbleLoc.lngCoord));

						var arrowPoint = new google.maps.Point(10,0);

						/* var arrowSymbol = new google.maps.Symbol({
								anchor: arrowPoint,
								path:  'M 2 1 L 1 0 L 1 5 M -2 1 L -1 0 L -1 5',
								strokeColor: '#A5EDF6',
								strokeOpacity: 1.0,
								strokeWeight: 1.0,
								scale: 1,
								rotation: 0.1
						}); */

						// var zoomControlOptions = new google.maps.ZoomControlOptions({position:google.maps.ControlPosition.BOTTOM_LEFT,style:google.maps.ZoomControlStyle.LARGE});

						$('#map_canvas').gmap({'mapTypeId':google.maps.MapTypeId.HYBRID,'center': trailCenter, 'zoom': trailZoom,'zoomControl':true,'zoomControlOptions':{position:google.maps.ControlPosition.BOTTOM_LEFT,style:google.maps.ZoomControlStyle.SMALL},'minZoom':trailMinZoom,'maxZoom':visibleZoom,'disableDefaultUI':true, 'callback': function() {
						self = this;
						trailMap = this;
						
						currMap = self.get('map');
						
						// var markers = new Array();
						locations = new Array();
						// var trailLatLngs = new Array();

						locCount = 0;

						var trailLocs = data.trailLocs;
						    $.each(trailLocs, function(i, trailLoc) {

							var location = new Object();

							location.locTitle = trailLoc.locTitle;
							location.locClue = trailLoc.locClue;
							location.latCoord = trailLoc.latCoord;
							location.lngCoord = trailLoc.lngCoord;

							locCount = locCount + 1;

							// alert(i + '&&' + location.locTitle + '  ||' + location.latCoord + ','+ location.lngCoord);

							location.latLngs = new google.maps.LatLng(parseFloat(trailLoc.latCoord),parseFloat(trailLoc.lngCoord));

							trailLatLngs[i] =  location.latLngs;

							locations[i] = location;

						    });
						    
						    document.getElementById('locCount').value = locCount;

						    if(locIndex <= (locCount-1))
						    {
						    	
						    	displayLocClueText();
						    	
						    	// alert('locIndex is within limits');
						    	
						    	if(locIndex > 0){
						    		trailStarted = true;
						    		
						    		// alert('locIndex is > 0');
						    		
						    		if(oButtonRequired == "true"){						    			
						    			if((locIndex > 0 && questionAttempted == 'Y') || (locIndex == 0 && trailStarted == true)){
						    				// alert('Now dispalying Show overall button');
						    				document.getElementById('divShowOverall').style.display = "block";
								    	}
						    		} 
						    	}						    	
						    	
						    }
						    							  
							  questionBox = new InfoBubble({
						          maxWidth: 1800,
						          maxHeight: 600
						        });
							  
							  var startLoc = locations[0];
							  
							  var helpInfoBubbleTxt = '<div class="infbubbletext"><span style="font-size:15px;"><b><u>Instructions</u></b></span><br>';
							  helpInfoBubbleTxt = helpInfoBubbleTxt + trailDesc;
							  helpInfoBubbleTxt = helpInfoBubbleTxt + '* Zoom in within the map to the location suggested by the clue.<br>';
							  helpInfoBubbleTxt = helpInfoBubbleTxt + '* Keep zooming till you locate the H! balloon <img src="images/heymath.png"/>. <br>';
							  helpInfoBubbleTxt = helpInfoBubbleTxt + '* If you are not sure of a location use the button "Show location" at the bottom.<br>';
							  helpInfoBubbleTxt = helpInfoBubbleTxt + '* By using the "Show location" button you forego your chance of winning a Gold coin at that location.<br>';
							  helpInfoBubbleTxt = helpInfoBubbleTxt + '* Watch the clue section in white background. It keeps giving you additional tips to reach a location.</div>';
							  
							  helpInfoBubble = new InfoBubble({
						          map: this.get('map'),
						          content:helpInfoBubbleTxt ,
						          position: infoBubbleLoc,
						          shadowStyle: 1,
						          padding: 0,
						          backgroundColor: 'rgb(57,57,57)',
						          borderRadius: 4,
						          arrowSize: 0,
						          borderWidth: 1,
						          borderColor: '#2c2c2c',
						          disableAutoPan: true,
						          hideCloseButton: false,
						          arrowPosition: 30,
						          backgroundClassName: 'infbubble',
						          arrowStyle: 2
						        });
							  
							  overallCircleInfoBubble = new InfoBubble({
						          map: this.get('map'),
						          content: '<div class="infbubbletext">Zoom in within the blue circle <br> to locate the H! balloon <img src="images/heymath.png"/>.</div>',
						          position: infoBubbleLoc,
						          shadowStyle: 1,
						          padding: 0,
						          backgroundColor: 'rgb(57,57,57)',
						          borderRadius: 4,
						          arrowSize: 0,
						          borderWidth: 1,
						          borderColor: '#2c2c2c',
						          disableAutoPan: true,
						          hideCloseButton: false,
						          arrowPosition: 30,
						          backgroundClassName: 'infbubble',
						          arrowStyle: 2
						        });
							  							  
							  vicinityCircleInfoBubble = new InfoBubble({
						          map: this.get('map'),
						          content: '<div class="infbubbletext">Zoom in within this red circle <br> to locate the H! balloon <img src="images/heymath.png"/>.</div>',
						          position: infoBubbleLoc,
						          shadowStyle: 1,
						          padding: 0,
						          backgroundColor: 'rgb(57,57,57)',
						          borderRadius: 4,
						          arrowSize: 0,
						          borderWidth: 1,
						          borderColor: '#2c2c2c',
						          disableAutoPan: true,
						          hideCloseButton: false,
						          arrowPosition: 30,
						          backgroundClassName: 'infbubble',
						          arrowStyle: 2
						        });							  
							  
							  startInfoBubble = new InfoBubble({
						          map: this.get('map'),
						          content: '<div class="infbubbletext">Click on the START icon to start the trail !</div>',
						          position: infoBubbleLoc,
						          shadowStyle: 1,
						          padding: 0,
						          backgroundColor: 'rgb(57,57,57)',
						          borderRadius: 4,
						          arrowSize: 0,
						          borderWidth: 1,
						          borderColor: '#2c2c2c',
						          disableAutoPan: true,
						          hideCloseButton: false,
						          arrowPosition: 30,
						          backgroundClassName: 'infbubble',
						          arrowStyle: 2
						        });
							  
							  // overallCircleInfoBubble.open();
							  
							 // startInfoBubble.open();
							  
							  google.maps.event.addListener(questionBox,'closeclick',function(){
								   // alert('You just closed the infobubble');
								  
								  qOpenFlag = false;
								  
								  questionAttempted = document.getElementById('questionAttempted').value;
								  
								  // alert('locIndex ' + locIndex + ' questionAttempted ' + questionAttempted);
								  
								  if((markerIndex >= locIndex) && (questionAttempted == 'Y')){
								  
									   updateCoinScore();
									   showCoinScore();
									   
									   helperFlag = 'N';								   
									   document.getElementById('helperFlag').value = helperFlag;
									   
									   displayLocClueText();
									   
									   document.getElementById('divShowOverall').style.display = "block";
								  }
								   
								   // currMap.setOptions({draggable : true});
								  showTTrail();
								 /* if(trailComplete == 'Y')
								  {
									   closeForm = document.getElementById('closeForm');
										
									   closeForm.submit();
								  } */
								   								   
								});
							  
							  questionBoxContent = document.createElement('DIV');  
							  								
							  questionBox.addTab(' ', questionBoxContent);
							  
							  prepareQuestionHtml();
							  getQuestionContentList();
							  
						      for (var i = 0; i < locCount; i++) {
						      // markers[i].setVisible(false);
						      // alert('Done loading' + i);

						      var currLoc = locations[i];

						      var locVisible;

						      if(i > 0)
						      {
						    	  locVisible = false;
						      }
						      else
						      {
						    	  locVisible = true;
						      }

						      // alert('Loc ' + i + ' ' + '||' + currLatLng.getPosition());

						      markers[i] = new google.maps.Marker({
						      position: currLoc.latLngs,
						      visible: locVisible,
						    //  animation : google.maps.Animation.BOUNCE,
						      map: this.get('map'),
						      clickable: true,
						      icon: contextPath + '/images/heymath.png',
						      shadow: contextPath + '/images/hmshadow.png',
						      title:currLoc.locTitle,
						      zIndex:i
						      });

							vCircles[i] = new google.maps.Circle({
								center: currLoc.latLngs,
								radius: vCircleRadius,
								map: this.get('map'),
								visible: false,
								strokeColor: '#FF0101',
								strokeWeight: 1.0,
								fillOpacity: 0
							});
							
							mCircles[i] = new google.maps.Circle({
								center: currLoc.latLngs,
								radius: mCircleRadius,
								map: this.get('map'),
								visible: false,
								strokeColor: '#FF0101',
								strokeWeight: 1.0,
								fillOpacity: 0
							});

							oCircles[i] = new google.maps.Circle({
								center: currLoc.latLngs,
								radius: oCircleRadius,
								map: this.get('map'),
								visible: false,
								strokeColor: '#A5EDF6',
								strokeWeight: 1.0,
								fillOpacity: 0
							});
							
							if(oButtonRequired == "true"){						    			
				    			if( i == (locIndex+1) && ((locIndex > 0 && questionAttempted == 'Y') || (locIndex == 0 && trailStarted == true)) && helperFlag == 'Y' ){
				    				currOCircle = oCircles[locIndex + 1];
				    				currOCircle.setVisible(true);
				    				nextLocCoord = trailLatLngs[locIndex + 1];
				    				currMap.panTo(nextLocCoord);
				    				overallCircleInfoBubble.setPosition(nextLocCoord);
				    				overallCircleInfoBubble.open();
						    	}
				    		}

							var startMarker = markers[0];
														
							startMarker.setIcon(contextPath + '/images/startIcon.png');
							startMarker.setShadow(contextPath + '/images/startShadow.png');
							
							/* var startIconURL = contextPath + '/images/startIcon.png';
							var startIconShadowURL = contextPath + '/images/startShadow.png';
							
							var startIconMarker = new MarkerImage([{url : startIconURL, size:{width: 100,height:100}}]);
							var startIconShadow = new MarkerImage([{url : startIconShadowURL, size:{width: 100,height:100}}]);
							
							startMarker.setIcon(startIconMarker);
							startMarker.setShadow(startIconShadow);

							 arrowSequence[i] = new google.maps.IconSequence({
													    icon: arrowSymbol,
													    offset: '50%'
						   }); */

						    // var j = i + 1;
						    var conText;
						    
						    // var conText = '<div align="center"><img src="http://www.heymath.com/web/images/logo.png" border="0"/></div>';

						    if(i<(locCount-1))
						    {
						    	nextLoc = locations[i+1];							
						    	// conText = '<div align="center" text-color:#F50606><span style="color:red"><B>Next Location : ' + nextLoc.locClue + '</B></span></div>';
							}	
						    
						    // conText = conText + '<div align="center"><p>------------------------------------------------------------------------------------------------------</p></div>';
						   //  conText = '<br><iframe src=' + contextPath + '/htmls/Question' + j + '.html frameborder="0" width="650" height="400" ></iframe><br>';
						    						    
						    // var dataUrlTxt = contextPath + '/htmls/Question' + j + '.html';
							
						    var questionTxtBodyUrl = contextPath + '/htmls/Questions/' + trailKey + '/Question' + i + '.html';
							
						    (function(questionTxtBodyUrl) {
						    google.maps.event.addListener(markers[i], 'click',function(){

						    trailStarted = true;
						    
						    if(locIndex == 0)
							  {
								  helpInfoBubble.open();
							  }
						    	
							var currentMarker = this;
							
							computeDistanceTravelled();
							
							if(oButtonRequired == "true"){
								/* if(currMap.getZoom() > oButtonZoom ){
									document.getElementById('divShowOverall').style.display = "none";						    	
								}else{		*/							
									if((locIndex > 0 && questionAttempted == 'Y') || (locIndex == 0 && trailStarted == true)){
										document.getElementById('divShowOverall').style.display = "block";
							    	}
								// }
						    }
							
							// self.openInfoWindow({ 'content': conText }, this);
							
							// alert(questionTxt);
													 
							
							 // alert(questionTxtUrl);
				
							
							markerIndex = currentMarker.getZIndex();
							
							if(markerIndex > 0){
								
								qOpenFlag = true;		
								
								var questionTxtBody = questionContentList[markerIndex];
								 
								 var questionTxt = questionHtmlSecStart + questionTxtBody + questionHtmlSecEnd;
								// var questionTxt = questionTxtBody;
																								 
								questionBoxContent.innerHTML = questionTxt;
																	
								questionBox.open(self.get('map'),currentMarker);
								
								currentMarker.setClickable(false);
																																								
								// currMap.setOptions({draggable : false});								
								
							    	var currLoc = locations[markerIndex];							
								// conText = conText + '<div align="center" text-color:#F50606><span style="color:red"><B>Next Location : ' + nextLoc.locClue + '</B></span></div>';
							    	
							    	altLocMessage = false;
							    	validateNextLocDisplay();
							    	
									clueText = '<a id="locClue" href="#" class="button whiteGreen bigrounded"> Current Location : ' + currLoc.locTitle + '</a>';
									document.getElementById('divClueLoc').innerHTML = clueText;			
									// setInv = setInterval(function () {blinkLocCludeDiv(); } , 2000);
														
							}
							
							if( markerIndex > locIndex || locIndex == 0 ){
																			
							locIndex = currentMarker.getZIndex();
							
							document.getElementById('locIndex').value = locIndex;	
							questionAttempted = 'N';
							document.getElementById('questionAttempted').value = 'N';
							
							if(locIndex == 0){
								helperFlag = 'N';
								document.getElementById('helperFlag').value = helperFlag;	
							}							
							
						    var trailUpdateUrl = contextPath + '/updateTrailLoc';
						    var trailUpdateParams = 'userId=' + userId + '&trailKey=' + trailKey + '&locIndex=' + locIndex + '&questionAttempted=' + questionAttempted + '&helperFlag=' + helperFlag;
						    
						    // alert("trailUpdateUrl : " + trailUpdateUrl);
							
							   jQuery.ajax({
								  url: trailUpdateUrl,
								  data: trailUpdateParams,
								  async: true
								 });
							   
							    if(locIndex == 0)
							    {
							    	altLocMessage = true;
							    	validateNextLocDisplay();
									
							    } 
							   
							}
							
								// 
								
								// alert("Max LocIndex : " + locIndex);
						    });
						    						    

						    })(questionTxtBodyUrl);


						    }

						    trailPolyLine = new google.maps.Polyline({
						      map: this.get('map'),
						      geodesic: true,
						      path:trailLatLngs,
						      icons: [{
										icon: {
										  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
										  // path: 'M 2 1 L 1 0 L 1 5 M -2 1 L -1 0 L -1 5',
										  strokeColor: '#A5EDF6',
										  strokeOpacity: 1.0,
										  strokeWeight: 1.0,
										  fillColor: '#A5EDF6',
										  fillOpacity: 1.0,
										  scale: 3
										},
										repeat: '10%',
										offset: '5%'
									  }],
						      strokeColor:'#A5EDF6',
						      strokeWeight: 1.5,
						      visible: false
						    });

						showTTrail();
						showCoinScore();

						google.maps.event.addListener(this.get('map'), 'zoom_changed', function() {
						    
							helpInfoBubble.close();
							overallCircleInfoBubble.close();
						    
						    if(locIndex<(locCount-1))
						    {
						    	
							    	/* if(oButtonRequired == "true"){
										if(currMap.getZoom() > oButtonZoom ){
											document.getElementById('divShowOverall').style.display = "none";
											// overallCircleInfoBubble.close();
										}else{
											document.getElementById('divShowOverall').style.display = "block";
											// overallCircleInfoBubble.open();
										}
								    } */
								    
								    if(this.getZoom() > vCircleZoom ){
								    	   	if((locIndex > 0 && questionAttempted == 'Y') || (locIndex == 0 && trailStarted == true)){
								    				computeDisplayDistanceFromLoc();						    	
								        	}
								    }else{
								    	displayLocClueText();
								    }
						    	
								    var nextMCircle = mCircles[locIndex+1];
								    var nextVCircle = vCircles[locIndex+1];
						    		var nextLocMarker = markers[locIndex+1];

									if(this.getZoom() >= visibleZoom){
										// alert('locIndex : ' + locIndex + ' questionAttempted : ' + questionAttempted + ' trailStarted : ' + trailStarted);									
										if((locIndex > 0 && questionAttempted == 'Y') || (locIndex == 0 && trailStarted == true)){
											nextLocMarker.setVisible(true);
											// nextLocMarker.setAnimation(google.maps.Animation.BOUNCE);
										}
									}
									else
									{
										nextLocMarker.setVisible(false);
										nextLocMarker.setAnimation(null);
									}
									
									
									if(this.getZoom() >= mCircleZoom){										
										if((locIndex > 0 && questionAttempted == 'Y') || (locIndex == 0 && trailStarted == true)){
											if( mCircleRequired == "true" ){
												nextMCircle.setVisible(true);
												// nextLocCoord = trailLatLngs[locIndex + 1];
												// vicinityCircleInfoBubble.setPosition(nextLocCoord);
												// vicinityCircleInfoBubble.open();
											}
										}
									}
									else
									{
										nextMCircle.setVisible(false);
										// vicinityCircleInfoBubble.close();
									}
									
									if(this.getZoom() >= vCircleZoom){										
										if((locIndex > 0 && questionAttempted == 'Y') || (locIndex == 0 && trailStarted == true)){
											if( vCircleRequired == "true" ){
												nextVCircle.setVisible(true);
												nextLocCoord = trailLatLngs[locIndex + 1];
												// vicinityCircleInfoBubble.setPosition(nextLocCoord);
												// vicinityCircleInfoBubble.open();
											}
										}
									}
									else
									{
										nextVCircle.setVisible(false);
										// vicinityCircleInfoBubble.close();
									}
							
						    }


						 });
						
						google.maps.event.addListener(this.get('map'), 'center_changed', function() {
							// alert('vCircleZoom : ' + vCircleZoom + ' qOpenFlag : ' + qOpenFlag);			    
						    if(this.getZoom() >= vCircleZoom && qOpenFlag == false){
						    	// alert('Inside center changed - locIndex : ' + locIndex + ' questionAttempted : ' + questionAttempted + ' trailStarted : ' + trailStarted);						    	
						    	if((locIndex > 0 && questionAttempted == 'Y') || (locIndex == 0 && trailStarted == true)){
						    		// alert('Inside center changed !');
						    		computeDisplayDistanceFromLoc();
						    	}
						    }
						 
						 });

					}});
				}).load();
				
					function displayLocClueText(){
					
						if(locIndex == 0 && trailStarted == false )
					    {
						    	var startLoc = locations[0];							
								clueText = '<a id="locClue" href="#" class="button white bigrounded">' + 'Click on the START icon in the map to start the trail !' + '</a>';
								// startInfoBubble.open();
								altLocMessage = false;
					    } 	
						else if(locIndex == 0 && trailStarted == true )
					    {
								// nextLoc = locations[locIndex+1];							
								// clueText = '<a id="locClue" href="#" class="button white bigrounded"> Next Location clue : ' + nextLoc.locClue + '</a>';
								altLocMessage = true;
					    }
						else if(locIndex == (locCount-1)){
							   		if(questionAttempted == 'Y'){
							   			clueText = '<a id="locClue" href="#" class="button white bigrounded">' + 'You have completed this trail. Please click on the close(X) button above.' + '</a>';
							    	}else{
							    	  var currLoc = locations[locIndex];							
									  clueText = '<a id="locClue" href="#" class="button white bigrounded"> Current Location : ' + currLoc.locTitle + '</a>';	
							    	}
							  	altLocMessage = false;
					      }						    	 						    	 
			    	 else{
					    	
					    	if(questionAttempted == 'Y'){
						      // nextLoc = locations[locIndex+1];							
							  // clueText = '<a id="locClue" href="#" class="button white bigrounded"> Next Location clue : ' + nextLoc.locClue + '</a>';
					    		altLocMessage = true;
					    	}else{
					    	  var currLoc = locations[locIndex];							
							  clueText = '<a id="locClue" href="#" class="button white bigrounded"> Current Location : ' + currLoc.locTitle + '</a>';	
							  altLocMessage = false;
					    	}
					    }
			    	 
						validateNextLocDisplay();
			    	 	document.getElementById('divClueLoc').innerHTML = clueText;
			    	 	// setInv = setInterval(function () {blinkLocCludeDiv(); } , 2000);
						
					}					
				
					function computeDisplayDistanceFromLoc(){
																		
						var currMapBounds = currMap.getBounds();
						var currCenter = currMapBounds.getCenter();
						
						var distFromLoc = google.maps.geometry.spherical.computeDistanceBetween (trailLatLngs[locIndex+1], currCenter);
						
						var distFromLocKm = Math.round(distFromLoc/1000);
						
						if(distFromLocKm <= 20){
							clueText = '<a id="locClue" href="#" class="button white bigrounded">You are very close to the next location. Zoom in within the red circle to locate the balloon!</a>';
						}else if(distFromLocKm > 20 && distFromLocKm < 500){
							clueText = '<a id="locClue" href="#" class="button white bigrounded">You are at a distance of ' + distFromLocKm + ' Km from the next location ! Keep looking around for a red circle.</a>';
						}else{
							clueText = '<a id="locClue" href="#" class="button white bigrounded">You are very far from the next location. Zoom out and zoom in elsewhere !</a>';
						}
						
						altLocMessage = false;
						validateNextLocDisplay();
			    	    	 
			    	 	document.getElementById('divClueLoc').innerHTML = clueText;
			    	 	// setInv = setInterval(function () {blinkLocCludeDiv(); } , 2000);
						
					}
				
					function computeDistanceTravelled(){
						
						var tTrailLatLngs = new Array();
						
						   for (var j = 0; j <= locIndex; j++) {
						      tTrailLatLngs[j] = trailLatLngs[j];

						      currMarker = markers[j];
						      currMarker.setVisible(true);
						      currMarker.setClickable(false);
						      
						      if(j == locIndex){
						    	  if(questionAttempted == 'N' || questionAttempted == '' ){
						    		  currMarker.setClickable(true);
						    	  }						    	  
						      }

						    }
						   
						   distanceTravelled = Math.round((google.maps.geometry.spherical.computeLength (tTrailLatLngs) * roundOffDivFactor)/1000)/roundOffDivFactor;
						   
						   document.getElementById('distanceTravelled').value = distanceTravelled;
						
					}
					
					function showTTrail(){
						
						var currMarker;
						var currCircle = oCircles[locIndex];
						
						
						currMap.setZoom(trailZoom);
					    currMap.panTo(trailCenter);
					    currCircle.setVisible(false);
					    // overallCircleInfoBubble.close();
										
						var tTrailLatLngs = new Array();
						tTrailPolyLine = null;

						   for (var j = 0; j <= locIndex; j++) {
						      tTrailLatLngs[j] = trailLatLngs[j];

						      currMarker = markers[j];
						      currMarker.setVisible(true);
						      currMarker.setClickable(false);
						      currMarker.setAnimation(null);
						      
						      if(j == locIndex){
						    	  if(questionAttempted == 'N' || questionAttempted == '' ){
						    		  currMarker.setClickable(true);
						    	  }						    	  
						      }

						    }

						    tTrailPolyLine = new google.maps.Polyline({
						      map: self.get('map'),
						      geodesic: true,
						      path:tTrailLatLngs,
						      icons: [{
								icon: {
								  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
								  // path: 'M 2 1 L 1 0 L 1 5 M -2 1 L -1 0 L -1 5',
								  strokeColor: '#A5EDF6',
								  strokeOpacity: 1.0,
								  strokeWeight: 1.0,
								  fillColor: '#A5EDF6',
								  fillOpacity: 1.0,
								  scale: 1
								},
								repeat: '50%'
								// offset: '50%'
							}],
						      strokeColor:'#A5EDF6',
						      strokeWeight: 1.5,
						      visible: true
						    });
						    
						    if( locIndex <= 0 ){
						    	tTrailPolyLine.setVisible(false);
						    }
						
					}
					
					function prepareQuestionHtml()
					{
							
						var questionCssTxtUrl = contextPath + '/css/mathtrail/question.css';
						
						var questionCssTxt = jQuery.ajax({
							  url: questionCssTxtUrl,
							  async: false
							}).responseText;						
						
						var questionJScriptTxtUrl = contextPath + '/js/mathtrail/questionValidate.js';						
						  
						var questionJScriptTxt = jQuery.ajax({
							  url: questionJScriptTxtUrl,
							  async: false
							}).responseText;
						
						var questionResSectionTxtUrl = contextPath + '/htmls/common/resultSection.html';						
						  
						var questionResSectionTxt = jQuery.ajax({
							  url: questionResSectionTxtUrl,
							  async: false
							}).responseText;						
						
						questionHtmlSecStart = '<html><head>' +  questionCssTxt + questionJScriptTxt + '</head><body><br/>' + '<div class="quesDiv">';
						questionHtmlSecEnd = questionResSectionTxt + '</div></body></html>';
						
						// questionHtmlSecStart = '<html><head>' +  questionCssTxt;
						// questionHtmlSecEnd = questionResSectionTxt + '</div></body></html>';
						
					}
					
					function getQuestionContentList()
					{
						
						questionContentList = new Array();
						
						for (var i = 1; i < locCount; i++){
						
							var questionTxtBodyUrl = contextPath + '/htmls/Questions/' + trailKey + '/Question' + i + '.html';
							
							var questionTxtBody = jQuery.ajax({
								  url: questionTxtBodyUrl,
								  async: false
								}).responseText;
							
							// alert('Question ' + i + ' : ' + questionTxtBody);
							
							questionContentList[i] = questionTxtBody;
						
						}
												
					}
					
					function updateCoinScore()
					{
						  goldScore = parseInt(document.getElementById('goldScore').value);
						  silverScore = parseInt(document.getElementById('silverScore').value);
						  copperScore = parseInt(document.getElementById('copperScore').value);
						  
						  // alert('Now ending the trail ' + locIndex + ' locCount : ' + locCount);
						
						  if(locIndex == (locCount-1)){							  
							  trailComplete = 'Y';
							  document.getElementById('trailComplete').value = 'Y';
						  }else{
							  trailComplete = 'N';
							  document.getElementById('trailComplete').value = 'N';
						  }
						  
						  var coinScoreUpdateUrl = contextPath + '/updateCoinScore';
						  var coinScoreUpdateParams = 'userId=' + userId + '&trailKey=' + trailKey + '&goldScore=' + goldScore + '&silverScore=' + silverScore + '&copperScore=' + copperScore + '&trailComplete=' + trailComplete;
						    
						  // alert("coinScoreUpdateUrl : " + coinScoreUpdateUrl);
						  // alert("coinScoreUpdateParams : " + coinScoreUpdateParams);
						  
						  jQuery.ajax({
							  url: coinScoreUpdateUrl,
							  data: coinScoreUpdateParams,
							  async: true
							 });
					}
					
					function showCoinScore(){
					
						  var goldCoinImgPath = contextPath + '/images/coins/gold_small.png';
						  var silverCoinImgPath = contextPath + '/images/coins/silver_small.png';
						  var copperCoinImgPath = contextPath + '/images/coins/copper_small.png';
						  
						  var coinsDiv = document.getElementById('coinScore');
					
						  coinsDiv.innerHTML = "";
						  
						  for(i=1;i<=goldScore;i++){
							  						  
							  var goldCoinImg = document.createElement('img');
							  goldCoinImg.setAttribute('src',goldCoinImgPath);
							  
							  coinsDiv.appendChild(goldCoinImg);
						  
						  }
						  
						  for(i=1;i<=silverScore;i++){
	  						  
							  var silverCoinImg = document.createElement('img');
							  silverCoinImg.setAttribute('src',silverCoinImgPath);
							  
							  coinsDiv.appendChild(silverCoinImg);
							  
						 }				
						  
						  for(i=1;i<=copperScore;i++){
	  						  
							  var copperCoinImg = document.createElement('img');
							  copperCoinImg.setAttribute('src',copperCoinImgPath);
							  
							  coinsDiv.appendChild(copperCoinImg);
							  
						 }
						
					}

				  $("#fullMapView").click(function(){
						   					    
						    showTTrail();
				  });
				  
				  $("#instructions").click(function(){
					  showTTrail();
					  overallCircleInfoBubble.close();
					  helpInfoBubble.open();
				  });
				  
				  $("#trailClose").click(function(){
					  closeForm = document.getElementById('closeForm');
						
					  closeForm.submit();
				  });

				   $("#showTrail").click(function(){

					 var currMarker;

						    for (var i = 0; i < markers.length; i++) {

							currMarker = markers[i];

							currMarker.setVisible(true);
						    }


				         trailPolyLine.setVisible(true);


				  });

				  $("#showOverall").click(function(){

					  				 var nextLocCoord = trailLatLngs[locIndex + 1];
					  
					  				 showTTrail();
					  				 
					  				 currMap.panTo(nextLocCoord);
					  
				  					 currOCircle = oCircles[locIndex + 1];
				  					 prevOCircle = oCircles[locIndex];

				  					if(oCircleRequired=="true" && ((locIndex > 0 && questionAttempted == 'Y') || (locIndex == 0 && trailStarted == true)) )
						  			{
				  						// overallCircleInfoBubble.setPosition(trailLatLngs[locIndex+1]);
				  						helpInfoBubble.close();
				  						overallCircleInfoBubble.setPosition(nextLocCoord);
				  						overallCircleInfoBubble.open();
				  										  						
				  						currOCircle.setVisible(true);
										prevOCircle.setVisible(false);
										
										helperFlag = 'Y';
					  					document.getElementById('helperFlag').value = helperFlag;
					  					
					  					var trailUpdateUrl = contextPath + '/updateTrailLoc';
					  					var trailUpdateParams = 'userId=' + userId + '&trailKey=' + trailKey + '&locIndex=' + locIndex + '&questionAttempted=' + questionAttempted + '&helperFlag=' + helperFlag;
									    
									    // alert("trailUpdateUrl : " + trailUpdateUrl);
										
										   jQuery.ajax({
											  url: trailUpdateUrl,
											  data: trailUpdateParams,
											  async: true
											 });
										
									}
				  					
				  });

				  $("#showVicinity").click(function(){

									var currVCircle = vCircles[locIndex + 1];
				  					var prevVCircle = vCircles[locIndex];

				  					if(vCircleRequired=="true" && locIndex != -1 )
						  			{
										currVCircle.setVisible(true);
										prevVCircle.setVisible(false);
									}

				  					helperFlag = 'Y';
				  					document.getElementById('helperFlag').value = helperFlag;
				  });
				  
				  var the_count = 1;
				  var the_timeout;
				  var hide = true;
				  
				  var blinkLocCludeDiv = function()
				  {
					
					  the_count = the_count + 1;				  			  				
					 
					  // alert("the count : " + the_count);
					  
					  if(hide){
						  // document.getElementById("divClueLoc").style.display = "none";
						  document.getElementById('locClue').style.color = '#fff';
						  hide = false;
					  }
					  else{
						  // document.getElementById("divClueLoc").style.display = "block";
						  document.getElementById('locClue').style.color = '#FF0000';
						  hide = true;
					  }
					  
					  if(the_count > 10){
						the_count = 1;
						clearInterval(setInv);
						return;  
					  }
					  
					 // the_timeout = setTimeout(blinkLocCludeDiv(), 2000);	
					  
					  return the_count;
					  
				  };
				  
				  var showNextLoc = true;
				  var altLocMessage = false;
				  				  
				  function validateNextLocDisplay(){
				  
					  if(altLocMessage){
						  if(!threadStarted){
							  setInv = setInterval(function () {alternateNextLocMessage(); } , 6000);
							  threadStarted = true;
						  }
						  
						  document.getElementById("divClueLoc").style.display = "none";
						  document.getElementById("divClueNextLoc").style.display = "block";
					  }else{
						  // clearInterval(setInv);
						  // threadStarted = false;
						  document.getElementById("divClueNextLoc").style.display = "none";
						  document.getElementById("divClueLoc").style.display = "block";
					  }
				  }
				  
				  var alternateNextLocMessage = function()
				  {  
					  
							  if(showNextLoc){
								  nextLoc = locations[locIndex+1];
								  if(locIndex == 0){
									  clueText = '<a id="nextlocClue" href="#" class="button white bigrounded"> First Location clue : ' + nextLoc.locClue + '</a>';
								  }else{
									  clueText = '<a id="nextlocClue" href="#" class="button white bigrounded"> Next Location clue : ' + nextLoc.locClue + '</a>';
								  }
								  showNextLoc = false;
							  }
							  else{
								  clueText = '<a id="nextlocClue" href="#" class="button white bigrounded">Keep zooming in till you locate a red circle. Zoom in further within the circle to locate the balloon.</a>';
								  showNextLoc = true;
							  }
							  
							  document.getElementById('divClueNextLoc').innerHTML = clueText;
					  					  
							  return showNextLoc;
					  
				  };
				  
				  
				  function show()
				  {
					// alert("Inside show");
				  	document.getElementById("divClueLoc").style.display = "block";
				  }
				  
				  function hide()
				  {
					// alert("Inside hide");
				  	document.getElementById("divClueLoc").style.display = "none";
				  	setTimeout(show(),2000);
				  }
				  
			});