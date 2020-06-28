
function setup() {
	canvas = createCanvas(displayWidth, displayHeight - 150);
	canvas.parent("canvasContainer")
	assignColors();
	for(var i = 0; i < numOfPlayers; i++){
		player.push(new Player(i));
	}
	items.push(new Item(0));
	slider = new Slider();
	setupHeader();
	// setupBody();
	setupFooter();
	populateColorsOfOptions();
}

function draw() {
	background(colorPitch);
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
	itemSelected = undefined;
	for(var i = 0; i < items.length; i++){
		items[i].pressed();
		if (itemSelected != undefined){
			break;	
		}
	}
	slider.pressed();
}

function mouseClicked(){
	let now = new Date()
	let delta = now - doubleClickTimer;
	if ( delta < 250 && selected != undefined){		//Double Clicked
		populatePlayerEdit();
	} else if ( delta < 250 && itemSelected != undefined){		//Double Clicked
		populateItemEdit();
	}
	doubleClickTimer = now;
}


function mouseReleased() {
	for(var i = numOfPlayers - 1; i >= 0; i--){
		player[i].released();
	}
	for(var i = 0; i < items.length; i++){
		items[i].released();
	}
	slider.released();
}


