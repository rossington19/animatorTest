function preload(){
	pitchImg = loadImage('https://raw.githubusercontent.com/rossington19/animatorTest/master/PitchLARGE.png');
	logoOverlay = loadImage('https://raw.githubusercontent.com/rossington19/animatorTest/master/Background.png');
}


function setup() {
	canvas = createCanvas(900, 500);
	canvas.parent("canvasContainer");
	canvas.id('drawingCanvas');
	frameRate(240);
	assignColors();
	for(var i = 0; i < 10; i++){
		player.push(new Player(i));
	}
	items.push(new Item(0));		
	slider = new Slider();
	setupHeader();
	setupFooter();
	populateColorsOfOptions();
	setupDropzone();
	loadStartUpFile();
}

function loadStartUpFile(){
	jsonFile = {"drawing":[],"player":[{"dragging":false,"index":0,"displayNumber":10,"x":206,"y":209,"r":28,"col":0,"showLines":false,"key":[[206,209,true],[206,209,false],[206,209,false],[206,209,false],[206,209,false]],"offsetX":-8.5,"offsetY":-5},{"dragging":false,"index":1,"displayNumber":"15","x":640,"y":421,"r":28,"col":0,"showLines":false,"key":[[640,421,true],[640,421,false],[640,421,false],[640,421,false],[640,421,false]],"offsetX":-7.5,"offsetY":-3},{"dragging":false,"index":2,"displayNumber":12,"x":352,"y":286,"r":28,"col":0,"showLines":false,"key":[[352,286,true],[352,286,false],[352,286,false],[352,286,false],[352,286,false]],"offsetX":-3.5,"offsetY":-3},{"dragging":false,"index":3,"displayNumber":13,"x":496,"y":352,"r":28,"col":0,"showLines":false,"key":[[496,352,true],[496,352,false],[496,352,false],[496,352,false],[496,352,false]],"offsetX":8.5,"offsetY":6}],"items":[{"dragging":false,"rollover":false,"x":205,"y":192,"r":16,"col":5,"index":0,"itemType":0,"key":[[205,192,true],[205,192,false],[205,192,false],[205,192,false],[205,192,false]],"offsetX":-5.5,"offsetY":4}],"totalKeyFrame":5,"frameIncrement":[1,1,1,1,1],"increment":0.02,"pitch_xLoc":0,"pitch_yLoc":1325,"pitchLandscape":false,"pitchScale":0.39848484848484844}
	loadFile();
}

function draw() {
	background(colorPitch);
	drawPitch();
	drawHeader();
	drawBody();
	drawFooter();
	if(drawingMode){
		drawOnCanvas();
	}
	if(recorder && recorder.state === "recording"){
		recordCanvas();
	}
}


function mousePressed() {
	if(drawingMode){
		if(drawingType === 0){
			startPath();
		} else if(clickInsidePitch()){
			let elem = document.getElementById('drawingPenColour');
			let col = elem.getAttribute("data-color");
			drawing.push({'type': drawingType, 'data': [col, {"x": mouseX, "y": mouseY}, {"x": mouseX, "y": mouseY}], 'complete': false });
		}
	} else if (pitchMode && clickInsidePitch()) {
		pitchDragging();
	} else {
		selected = undefined;
		for(var i = player.length - 1; i >= 0; i--){
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
	}
	slider.pressed();
}

function mouseDragged(){
	 if (pitchMode && clickInsidePitch()) {
		pitchDragging();
	} else if(drawingMode && clickInsidePitch()){
		if(drawingType > 0  && drawing[drawing.length-1].complete === false)
			drawing[drawing.length-1].data[1] = {"x": mouseX,"y": mouseY};
	}
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
		for(var i = player.length - 1; i >= 0; i--){
			player[i].released();
		}
		for(var i = 0; i < items.length; i++){
			items[i].released();
		}
	} else {
		if(drawing.length > 0)
			drawing[drawing.length-1].complete = true;
	}
	slider.released();
	pitchReleased();
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
		drawing.push({'type':0, 'data':currentPath});
	}
}


function drawOnCanvas(){
	if (clickInsidePitch()) {
		if(drawingType === 0){
			var point = {
				x: mouseX,
				y: mouseY,
			}
			currentPath.push(point);
		}

	}
}

function changeActiveDrawingTool(elem){
	var allButs = document.getElementsByClassName("drawingHeaderButton");
	for (var i = 0; i < allButs.length; i++) {
		allButs[i].classList.remove("active");
	}
	elem.classList.add("active");
}


function displayDrawing(){
	push();
	noFill();
	for(var i = 0; i < drawing.length; i++){
		if(drawing[i].type === 0){
			var path = drawing[i].data;
			beginShape();
			let strokeCol = parseInt(path[0]);
			stroke(playerColours[strokeCol]);
			strokeWeight(2);
			for(var j = 1; j < path.length; j++){
				vertex(path[j].x, path[j].y)
			}
			endShape();
		} else if (drawing[i].type === 1 || drawing[i].type === 2){
			let strokeCol = parseInt(drawing[i].data[0])
			stroke(playerColours[strokeCol]);
			strokeWeight(2);
			line(drawing[i].data[1].x, drawing[i].data[1].y, drawing[i].data[2].x, drawing[i].data[2].y);
			if (drawing[i].type === 2){
				push();
				vec = createVector(drawing[i].data[1].x - drawing[i].data[2].x, drawing[i].data[1].y - drawing[i].data[2].y);
				translate(drawing[i].data[2].x, drawing[i].data[2].y);
				rotate(vec.heading());
				let arrowSize = 9;
				translate(vec.mag() - arrowSize, 0);
				fill(playerColours[strokeCol]);
				triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
				pop();
			}
		} else if (drawing[i].type === 3) {
			let strokeCol = parseInt(drawing[i].data[0])
			stroke(playerColours[strokeCol]);
			strokeWeight(2);
			rectMode(CORNERS);
			rect(drawing[i].data[1].x, drawing[i].data[1].y, drawing[i].data[2].x, drawing[i].data[2].y)
		}
	}
	pop();
}

function drawingUndo(){
	if(drawing.length > 0){
		drawing.pop();
	}
}

function addFrame(){
	totalKeyFrame++;
	for (var i = 0; i < player.length; i++) {
		player[i].addFrame(addBetweenFrameLoc);
	}
	for (var i = 0; i < items.length; i++) {
		items[i].addFrame(addBetweenFrameLoc);
	}
	slider.addFrame(addBetweenFrameLoc)
	updateAddingFrameSelector(true);
	populateAddFrameEditor();
	hideDomElement('animationEditModal');
	addBetweenFrameLoc = undefined; 
	deleteFrameLoc = undefined;
}

function deleteFrame(){
	if (totalKeyFrame > 2) {
		totalKeyFrame--;
		for (var i = 0; i < player.length; i++) {
			player[i].deleteFrame(deleteFrameLoc)
		}
		for (var i = 0; i < items.length; i++) {
			items[i].deleteFrame(deleteFrameLoc)
		}
		slider.deleteFrame(deleteFrameLoc)
		if(deleteFrameLoc >= totalKeyFrame){
			updateDeleteFrameSelector(false)
		}
		populateDeleteFrameEditor();
		hideDomElement('animationEditModal');
		addBetweenFrameLoc = undefined; 
		deleteFrameLoc = undefined;
	}
}

function autoSave(){
	autoSaving = document.getElementById('autoSaveInput').checked;
	let butElem = document.getElementById('saveFrameBut');
	butElem.disabled = autoSaving		
	if(autoSaving){
		butElem.children[1].innerHTML = "Autosaving On"
	} else {
		butElem.children[1].innerHTML = "Save Frame";
	}
	
}

function keyPressed() {
	if(recorder === undefined){
	  checkKeyPress();
	} else if (recorder.state != "recording"){
	  checkKeyPress();
	}
}

function checkKeyPress(){
	if (keyCode  === 32) {
	  	playPause();	
	  } else if (keyCode === LEFT_ARROW && keyframe > 0.3) {
	  	keyframe = Math.floor(keyframe - 0.3);
	  } else if (keyCode === RIGHT_ARROW && keyframe < totalKeyFrame - 1) {
	  	keyframe += 1;
	  }
}

