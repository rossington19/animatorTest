function drawBody(){
	if (displayKeyframe != keyframe){
		refreshKeyframe = true;
	}
	for(var i = 0; i < numOfPlayers; i++){
		player[i].drawLines();
	}
	for(var i = 0; i < numOfPlayers; i++){
		player[i].update();
		player[i].show();
	}
	// ball.update();
	// ball.over();
	// ball.show();
	displayKeyframe = keyframe;
	refreshKeyframe = false;
}