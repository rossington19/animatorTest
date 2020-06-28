function drawBody(){
	if (displayKeyframe != keyframe){
		refreshKeyframe = true;
	}
	for(var i = 0; i < numOfPlayers; i++){
		player[i].drawLines();
	}
	for(var i = 0; i < items.length; i++){
		if(items[i].itemType != 0){
			items[i].update();
			items[i].show();
		}
	}
	for(var i = 0; i < numOfPlayers; i++){
		player[i].update();
		player[i].show();
	}
	for(var i = 0; i < items.length; i++){
		if(items[i].itemType === 0){
			items[i].update();
			items[i].show();
		}
	}
	displayKeyframe = keyframe;
	refreshKeyframe = false;
}
