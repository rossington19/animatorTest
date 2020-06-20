var player = [];
var numOfPlayers = 6;
var keyframe = 0;
var displayKeyframe = 0;
var refreshKeyframe = false;
var totalKeyFrame = 5;
var maxNumOfKeyFrames = 12;
var slider;
var playing = false;
var pitchMargin = 0;
var selected = undefined;

var colours;



// let pitchBackground;
// function preload(){
// 	pitchBackground = loadImage("./Pitch.png");
// }

function setup() {
	canvas = createCanvas(540,600);
	canvas.parent("animationContainer");
	colours = defineColours();
	noStroke();
	for(var i = 0; i < numOfPlayers; i++){
		player.push(new Player(i));
	}
	slider = new Slider();
	setupButtons();
	ball = new Ball()
}

function draw() {
	background(210);
	drawPitch();
	drawGUI();
	if (displayKeyframe != keyframe){
		refreshKeyframe = true;
	}
	for(var i = 0; i < numOfPlayers; i++){
		player[i].drawLines();
	}
	for(var i = 0; i < numOfPlayers; i++){
		player[i].update();
		player[i].over();
		player[i].show();
	}
	ball.update();
	ball.over();
	ball.show();
	displayKeyframe = keyframe;
	refreshKeyframe = false;
}

function drawPitch(){
	// image(img, 100, 100, 500, 500);
	fill(70, 155, 46);
	rect(pitchMargin, pitchMargin, 540, 540)
}

function saveLocations(){
	for(var i = 0; i < numOfPlayers; i++){
		player[i].save();
	}
	ball.save();
}

function calculateLocations(time){
	for(var i = 0; i < numOfPlayers; i++){
		player[i].goToLocation(time);
	}
	ball.goToLocation(time);
}


function mousePressed() {
	if(mouseY < 540 + pitchMargin)
		{selected = undefined;}
	for(var i = 0; i < numOfPlayers; i++){
		player[i].pressed();
		if (selected != undefined){
			break;
		}
	}
	slider.pressed();
	ball.pressed();
	refreshSelectionInDOM();
}



function mouseReleased() {
	for(var i = 0; i < numOfPlayers; i++){
		player[i].released();
	}
	slider.released();
	ball.released();
}


function keyPressed() {
}