function setupDropzone(){
	// dropzone = select('#animatorContainer');
	canvas.dragOver(draggedOver);
	canvas.dragLeave(draggedLeft);
	canvas.drop(handleFile)
	fileInput = createFileInput(handleFile);
	fileInput.id("fileInput");
	var fileInputElem = document.getElementById("fileInput")
	fileInputElem.setAttribute("accept", ".JSON");
	fileInputElem.style.display = "none";
}

function draggedOver() {
	document.getElementById('fileDraggedOver').style.display = "block";
}

function draggedLeft(){
	document.getElementById('fileDraggedOver').style.display = "none";
}

function saveFile(){
	let json = {};
	json.drawing = drawing;
	json.player = player;
	json.items = items;
	json.totalKeyFrame = totalKeyFrame;
	json.frameIncrement = slider.frameIncrement;
	json.increment = slider.increment;
	json.pitch_xLoc = pitch_xLoc;
	json.pitch_yLoc = pitch_yLoc;
	json.pitchLandscape = pitchLandscape
	json.pitchScale = pitchScale;
	// PITCH
	saveJSON(json, 'RugbySlate Animation.json', true);
}

function loadFile(){
	drawing = jsonFile.drawing;
	totalKeyFrame = jsonFile.totalKeyFrame;
	slider.frameIncrement = jsonFile.frameIncrement;
	slider.increment = jsonFile.increment;

	pitch_xLoc = jsonFile.pitch_xLoc;
	pitch_yLoc = jsonFile.pitch_yLoc;
	pitchLandscape = jsonFile.pitchLandscape
	pitchScale = jsonFile.pitchScale;

	player = [];
	for (var i = 0; i < jsonFile.player.length; i++) {
		player.push(new Player(i));
		player[i].index = jsonFile.player[i].index;
		player[i].displayNumber = jsonFile.player[i].displayNumber;
		player[i].showLines = jsonFile.player[i].showLines;
		player[i].col = jsonFile.player[i].col;
		player[i].key = jsonFile.player[i].key;
		player[i].x = player[i].key[0][0];
		player[i].y = player[i].key[0][1];
	}

	items = [];
	for (var j = 0; j < jsonFile.items.length; j++) {
		items.push(new Item(1));
		items[j].index = jsonFile.items[j].index;
		items[j].col = jsonFile.items[j].col;
		items[j].itemType = jsonFile.items[j].itemType;
		if(items[j].itemType === 1){
			items[j].x = jsonFile.items[j].x;
			items[j].y = jsonFile.items[j].y;
		} else {
			items[j].key = jsonFile.items[j].key;
			items[j].x = items[j].key[0][0];
			items[j].y = items[j].key[0][1];
		}
	}
	//Pitch
	closeSideNavMenu();

	keyframe = 0;
	draggedLeft();
	jsonFile = "";
}

function handleFile(file){
	if (file.subtype === 'json'){
		jsonFile = loadJSON(file.data, loadFile);	
	} else {
		draggedLeft();
		jsonFile = "";
		closeSideNavMenu();
	}
}