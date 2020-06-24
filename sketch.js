
function setup() {
	canvas = createCanvas(displayWidth, displayHeight-100);
	canvas.doubleClicked(canvasDoubleClicked);
	assignColors();
	for(var i = 0; i < numOfPlayers; i++){
		player.push(new Player(i));
	}
	slider = new Slider();
	// setupHeader();
	// setupBody();
	setupFooter();
}

function draw() {
	background(colorGreen);
	drawHeader();
	drawBody();
	drawFooter();
}



function mousePressed() {
	selected = undefined;
	for(var i = numOfPlayers - 1; i >= 0; i--){
		player[i].pressed();
		if (selected != undefined){
			break;	
		}
	}
	slider.pressed();
}

function canvasDoubleClicked() {
	console.log("selected");
	// selected = undefined;
	// for(var i = numOfPlayers - 1; i >= 0; i--){
	// 	player[i].pressed();
	// 	if (selected != undefined){
	// 		break;	
	// 	}
	// }

}

function mouseReleased() {
	for(var i = numOfPlayers - 1; i >= 0; i--){
		player[i].released();
	}
	slider.released();
}
