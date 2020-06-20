function setupButtons(){

}

function drawGUI(){
	slider.drawSlider();
	if(playing){
		slider.play();
	}
	slider.drawDot();
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
	let shirtColourInput = select('#shirtColourInput');
	if(selected != undefined){ 
		let selectedPlayer =  player.find(x => x.index === selected);
		shirtColourInput.value(selectedPlayer.col);
	}
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
	if(numOfPlayers < 30){
		numOfPlayers++;
		player.push( new Player(prevPlayerIndex+1) )
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

function updateGlobalSliderIncrement(){
	let speedInput = select('#globalSpeedSlider');
	let newInc = map(speedInput.value(), 1, 100, 0.002, 0.035)
	slider.increment = newInc;
}