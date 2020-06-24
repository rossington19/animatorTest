function setupFooter(){
	buttonPlayAnimation = createButton("Play Animaton");
	buttonPlayAnimation.position(10, height - 35);
	buttonPlayAnimation.mousePressed(playPause);

	buttonSaveFrame = createButton("Save Frame");
	buttonSaveFrame.position(width - 100 ,height - 35);
	buttonSaveFrame.mousePressed(saveLocations);
}

function drawFooter(){
	push();
		noStroke();
		fill(235);
		rect(0, height - footerHeight, width, height)
	pop();
	
	if(playing){
		slider.play();
	}
	slider.drawSlider();
	slider.drawDot();
}

function saveLocations(){
	console.log("saving");
	for(var i = 0; i < numOfPlayers; i++){
		player[i].save();
	}
	// ball.save();
}

function playPause(){
	if(playing){
		playing = false;
		buttonPlayAnimation.html("Play Animaton")
	} else {
		playing = true;
		buttonPlayAnimation.html("Pause Animaton")
	}
}