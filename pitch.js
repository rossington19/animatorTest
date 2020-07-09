let pitchImg; // Declare variable 'pitchImg'.
let pitch_xLoc = 0;
let pitch_yLoc = 0;
let pitchBeingDragged = false;
let pitchLandscape = false
let pitchMouseOffX, pitchMouseOffY;
let pitchScale = 0.5;

function drawPitch(){
	push();
	translate(width / 2, height / 2);
	scale(pitchScale)
	imageMode(CENTER);
	if(pitchLandscape){
		push();
		rotate(PI / 180 * 90);
		image(pitchImg, pitch_yLoc, -pitch_xLoc);
		pop()
	} else {
		image(pitchImg, pitch_xLoc, pitch_yLoc);
	}
	pop();
}

function pitchDragging(){
	if(!pitchBeingDragged){
		pitchMouseOffX = mouseX - (pitch_xLoc*pitchScale);
		pitchMouseOffY = mouseY - (pitch_yLoc*pitchScale);
		pitchBeingDragged = true;
	}
	pitch_xLoc = (mouseX - pitchMouseOffX)/pitchScale;
	pitch_yLoc = (mouseY - pitchMouseOffY)/pitchScale;
}

function pitchReleased(){
	pitchBeingDragged = false;
}

function pitchZoom(){
	let zoomSlider = document.getElementById("pitchZoomSlider");
	pitchScale = map(zoomSlider.value, 1, 100, 0.1, 1.5);
}
