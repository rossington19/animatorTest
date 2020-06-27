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

