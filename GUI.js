function setupButtons(){

}

function drawGUI(){
	slider.drawSlider();
	if(playing){
		slider.play();
	}
	slider.drawDot();
	drawSelected();
}

function refreshSelectionInDOM(){
	setInputNumToSelected();
	setInputColourToSelected();
	setLineCheckBoxToSelected();
}

function playPause(){
	let playPauseButton = select('#playButton')
	if(playing){
		playing = false;
		playPauseButton.html("Play")
	} else {
		playing = true;
		playPauseButton.html("Pause")
	}
}

function addNewFrame(){
	if(totalKeyFrame <= maxNumOfKeyFrames-1){totalKeyFrame++;}
}

function deleteFrame(){
	console.log("triggered")
	if(totalKeyFrame > 2){totalKeyFrame--;}
}

function changeNumber(){
	if(selected != undefined){
		let selectedPlayer =  player.find(x => x.index === selected);
		let shirtInput = select('#shirtNumberInput');
		selectedPlayer.displayNumber = shirtInput.value();
	}
}

function setInputNumToSelected(){
	let shirtInput = select('#shirtNumberInput');
	if(selected != undefined){ 
		let selectedPlayer =  player.find(x => x.index === selected);
		shirtInput.value(selectedPlayer.displayNumber);
	} else {
		shirtInput.value('');
	}
}

function changeColour(){
	if(selected != undefined){
		let shirtColour = select('#shirtColourInput');
		let selectedPlayer =  player.find(x => x.index === selected);
		selectedPlayer.col = shirtColour.value();
	}
}

function setInputColourToSelected(){

}

function changeLineDrawing(){
	if(selected != undefined){
		let drawLinesCheckbox = select('#drawLinesCheckbox');
		let selectedPlayer =  player.find(x => x.index === selected);
		if (drawLinesCheckbox.checked()){
			selectedPlayer.showLines = true;
		} else {
			selectedPlayer.showLines = false;
		}
	}
}

function setLineCheckBoxToSelected(){
	let checkboxInput = select('#drawLinesCheckbox');
	if(selected != undefined){ 
		let selectedPlayer =  player.find(x => x.index === selected);
		checkboxInput.checked(selectedPlayer.showLines);
	}
}

function addPlayer(){
	let prevPlayerIndex = player[ player.length - 1].index;
	numOfPlayers++;
	player.push( new Player(prevPlayerIndex+1) )
}

function drawSelected(){
	if(selected != undefined){
		textSize(20);
		fill(0);
		textAlign(LEFT)
		text("Selected:", pitchMargin, 650);
		let selectedPlayer =  player.find(x => x.index === selected);
		fill(colours[selectedPlayer.col][2]);
		stroke(0);
		strokeWeight(1);
		circle(145, 650, selectedPlayer.r)
		noStroke();
	    textAlign(CENTER, CENTER);
	    textSize(25);
	    fill(255);
	  	text(selectedPlayer.displayNumber, 145, 650);

	  	drawColourOptions(selectedPlayer);
	 //  	textSize(20);
		// fill(0);
		// textAlign(LEFT)
		// text("Lines:", pitchMargin, 750);
	}

}

function drawColourOptions(selectedPlayer){
	for(var i = 0; i < colours.length; i++){
		fill(colours[i][2]);
		stroke(0);
		strokeWeight(1);
		circle(220+(i*40), 650, selectedPlayer.r)
	}
}