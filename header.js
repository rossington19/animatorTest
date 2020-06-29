function setupHeader() {
	
}

function drawHeader(){
	push();
		noStroke();
		fill(235);
		rect(0, 0, width, headerHeight);
	pop();
}

function showDomElement(elem){
	document.getElementById(elem).style.display = "block";
}

function hideDomElement(elem){
	document.getElementById(elem).style.display = "none";
}

function openSideNavMenu() {
  document.getElementById("sideNavMenu").style.width = "150px";
  document.getElementById("sideNavMenuCover").style.display = "block";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeSideNavMenu() {
  document.getElementById("sideNavMenu").style.width = "0";
  document.getElementById("sideNavMenuCover").style.display = "none";
  // document.getElementById("canvasContainer").style.marginLeft = "0"
}

function closeHeaderMenu(elmnt){
	document.getElementById(elmnt).style.top = "-40px";
}

function openHeaderMenu(elmnt){
	document.getElementById(elmnt).style.top = "0px";
}

function updateGlobalSliderIncrement(){
	let speedInput = document.getElementById('globalSpeedSlider');
	let dropDown = document.getElementById('speedTargetDropDown');
	let selectedFrame = parseInt(dropDown.options[dropDown.selectedIndex].value);
	if(selectedFrame === 0){	//Global
		let newInc = map(speedInput.value, 1, 100, 0.004, 0.025);
		slider.increment = newInc;
	} else {
		slider.frameIncrement[selectedFrame-1]= map(speedInput.value, 1, 100, 0.5, 1.5)
	}
}

function populateSpeedDropDown(){
	let elmnt = document.getElementById("speedTargetDropDown");
	for(var i = 0; i < totalKeyFrame - 1; i++){
		var option = document.createElement("option");
	    option.value = i+1;
	    option.text = "Frame " + (i+1);
	    elmnt.appendChild(option);
	}
	setSpeedSlider();
}

function setSpeedSlider(){
	let speedInput = document.getElementById('globalSpeedSlider');
	let dropDown = document.getElementById('speedTargetDropDown');
	let selectedFrame = parseInt(dropDown.options[dropDown.selectedIndex].value);
	if(selectedFrame === 0){	//Global
		speedInput.value = map(slider.increment, 0.004, 0.025, 1, 100);
	} else {
		speedInput.value = map(slider.frameIncrement[selectedFrame-1], 0.5, 1.5 , 1, 100)
	}
	// slider.frameIncrement[selectedFrame.value-1]
	// speedInput.value = ;
	// console.log(speedInput.value);
}