function setupFooter(){
	document.getElementById("animationButtonContainer").style.top = (height-45)+ "px"
	// buttonPlayAnimation = createButton("Edit Animaton");
	// buttonPlayAnimation.position(10, height - 35);
	// buttonPlayAnimation.mousePressed(playPause);

	// buttonPlayAnimation = createButton("Play Animaton");
	// buttonPlayAnimation.position(200, height - 35);
	// buttonPlayAnimation.mousePressed(playPause);

	// buttonSaveFrame = createButton("Save Frame");
	// buttonSaveFrame.position(width - 100 ,height - 35);
	// buttonSaveFrame.mousePressed(saveLocations);
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
	for(var i = 0; i < player.length; i++){
		player[i].save();
	}
	for(var i = 0; i < items.length; i++){
		items[i].save();
	}
}

function playPause(){
	let buttonPlayAnimationText = document.getElementById("playAnimationText")
	let buttonPlayAnimation = document.getElementById("playAnimationBut")
	if(playing){
		playing = false;
		buttonPlayAnimationText.innerHTML = "Play Animation"
		buttonPlayAnimation.classList.remove("fa-pause")
		buttonPlayAnimation.classList.add("fa-play")
	} else {
		playing = true;
		buttonPlayAnimation.classList.remove("fa-play")
		buttonPlayAnimation.classList.add("fa-pause")
		buttonPlayAnimationText.innerHTML = "Pause Animation"
	}
}