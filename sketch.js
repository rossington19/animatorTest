
function setup() {
	canvas = createCanvas(displayWidth, displayHeight - 150);
	canvas.parent("canvasContainer");
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
	if(drawingMode){
		drawOnCanvas();
	}
	
}



function mousePressed() {
	if(!drawingMode){
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
	} else {
		startPath();
	}
	slider.pressed();
}

function mouseClicked(){
	if(!drawingMode){
		let now = new Date()
		let delta = now - doubleClickTimer;
		if ( delta < 250 && selected != undefined){		//Double Clicked
			populatePlayerEdit();
		} else if ( delta < 250 && itemSelected != undefined){		//Double Clicked
			populateItemEdit();
		}
		doubleClickTimer = now;
	}
}


function mouseReleased() {
	if(!drawingMode){
		for(var i = numOfPlayers - 1; i >= 0; i--){
			player[i].released();
		}
		for(var i = 0; i < items.length; i++){
			items[i].released();
		}
	}
	slider.released();
}

function clickInsidePitch(){
	return (mouseIsPressed === true && mouseY > headerHeight && mouseY < height - footerHeight)
}

function startPath(){
	if (clickInsidePitch()) {
		currentPath = [];
		let elem = document.getElementById('drawingPenColour');
		let col = elem.getAttribute("data-color")
		currentPath.push(col);
		drawing.push(currentPath);
	}
}


function drawOnCanvas(){
	if (clickInsidePitch()) {
		var point = {
			x: mouseX,
			y: mouseY,
		}
		currentPath.push(point);
	}
}


function displayDrawing(){
	push();
	noFill();
	for(var i = 0; i < drawing.length; i++){
		var path = drawing[i];
		beginShape();
		let strokeCol = parseInt(path[0]);
		stroke(playerColours[strokeCol]);
		strokeWeight(2);
		for(var j = 1; j < path.length; j++){
			vertex(path[j].x, path[j].y)
		}
		endShape();
	}
	pop();
}

function drawingUndo(){
	if(drawing.length > 0){
		drawing.pop();
	}
}


