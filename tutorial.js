function decrTutPage(){
	if(tutorialPage > 0){
		tutorialPage--;
		updateTutorial();
	}
}

function incrTutPage(){
	if(tutorialPage < 14){
		tutorialPage++;
		updateTutorial();
	}
}


function updateTutorial(){
	let highlighter = document.getElementById("tutorialHighlighter")
	let text = document.getElementById("tutorialText");
	let title = document.getElementById("tutorialTitle");
	let logo = document.getElementById("tutorialLogo");
	let subtit = document.getElementById("tutorialSubtitle");
	let content = document.getElementById("tutorialContentContainer"); 
	let prevBut = document.getElementById("tutorialPrevButton"); 
	let nextBut = document.getElementById("tutorialNextButton"); 
	let skip = document.getElementById("tutorialSkip"); 
	let close = document.getElementById("tutorialClose"); 
	let butCont = document.getElementById("tutorialButtonContainer"); 
	hStyle = highlighter.style;
	tStyle = text.style;
	switch (tutorialPage){
		case 0:
			nextBut.style.display = 'block'
			title.style.marginTop = '200px'
			title.style.fontSize = '50px';
			logo.style.display = 'block';
			subtit.style.display = 'none';
			prevBut.style.display = 'none';
			content.style.height = '305px';
			butCont.style.width = '40%';
			nextBut.innerHTML = 'Start Tutorial'
			skip.style.display = 'block';
			close.style.display = 'none';

			hStyle.height = '100px';
		   	hStyle.width = '550px';
		    hStyle.top = '230px';
		    hStyle.left = '170px';

		    tStyle.padding = '0px'
			tStyle.height = '100px';
		    tStyle.width = '550px';
		    tStyle.top = '230px';
		    tStyle.left = '170px';
		    text.innerHTML = '';
		    break;
		case 1: //Player
			subtit.style.display = 'block'
			prevBut.style.display = 'block';
			title.style.marginTop = '50px'
			title.style.fontSize = '32px';
			logo.style.display = 'none';
			content.style.height = '385px';
			butCont.style.width = '50%';
			nextBut.innerHTML = 'Next'
			skip.style.display = 'none';
			close.style.display = 'block';

			hStyle.height = '60px';
		   	hStyle.width = '60px';
		    hStyle.top = '225px';
		    hStyle.left = '170px';

		    tStyle.padding = '10px'
			tStyle.height = '100px';
		    tStyle.width = '375px';
		    tStyle.top = '185px';
		    tStyle.left = '275px';
		    text.innerHTML = '<h3> Players & Item </h3> <br> <b> • Drag & Drop</b> players and items to move them. <br><br> <b> • Double Click</b> to edit/delete players and items.'
		    setTimeout("tStyle.color = 'rgba(255,255,255,1)';", 500);
		    break;
		case 2: //Slider
			hStyle.height = '40px';
		   	hStyle.width = '890px';
		    hStyle.top = '505px';
		    hStyle.left = 0;

		    tStyle.height = '175px';
		    tStyle.width = '425px';
		    tStyle.top = '185px';
		    tStyle.left = '220px';
		    text.innerHTML = '<h3> Timeline </h3> <br> <b> • Keyframes</b> represent specific points in time. <br><br> • Arrange the players and items at these keyframes to create an animation. <br><br> • The number and speed of the frames can be easily editted.'
		    break;
		case 3: //Edit Frames
			hStyle.height = '55px';
		   	hStyle.width = '80px';
		    hStyle.top = '545px';
		    hStyle.left = '105px';
		    
		    tStyle.height = '100px';
		    text.innerHTML = '<h3> Edit Frames </h3> <br> <b> • Add</b> frames at any point in the timeline. <br><br> <b> • Delete</b> any frame in the timeline.'
		    break;
		case 4: // Play Pause
			hStyle.height = '55px';
		   	hStyle.width = '90px';
		    hStyle.top = '545px';
		    hStyle.left = '400px';
		    
		    tStyle.height = '135px';
		    text.innerHTML = '<h3> Play/Pause </h3> <br> <b> • Play or Pause</b> to see the animation. <br><br> <b> • TIP:</b> The spacebar will also play/pause. <br><br> <b> • TIP:</b> The arrow keys will go move between keyframes.'
		    break;
		case 5: // Save Frame
			hStyle.height = '55px';
		   	hStyle.width = '90px';
		    hStyle.top = '545px';
		    hStyle.left = '700px';
		    
		    tStyle.height = '155px';
		    text.innerHTML = '<h3> Save Frame </h3> <br> <b> • AutoSave</b> means that locations are saved automatically. <br><br> <b> • Manual Saving</b> means that this button needs to be pressed to save locations. <br><br> • This setting can be changed in the menu. '
		    break;
		case 6: // Speed
			hStyle.height = '45px';
		   	hStyle.width = '50px';
		    hStyle.top = '0';
		    hStyle.left = '757px';

		     tStyle.height = '75px';
		    text.innerHTML = '<h3> Speed </h3> <br> • Change the speed of both the total animation or specific frames.'
		    break;
		case 7: // Draw
			hStyle.height = '45px';
		   	hStyle.width = '50px';
		    hStyle.top = '0';
		    hStyle.left = '533px';

		    tStyle.height = '75px';
		    text.innerHTML = '<h3> Draw </h3> <br> <b> • Draw</b> arrows, lines, boxes and sketch to better illustrate your animation.'
		    break;
		case 8: // Add
			closeSideNavMenu();
			hStyle.height = '45px';
		   	hStyle.width = '75px';
		    hStyle.top = '0';
		    hStyle.left = '295px';

		     tStyle.height = '75px';
		    text.innerHTML = '<h3> Add Items </h3> <br> • Change the speed of both the total animation or specific frames.'
		    break;
		case 9: // New
			openSideNavMenu();
			hStyle.height = '42px';
		   	hStyle.width = '130px';
		    hStyle.top = '55px';
		    hStyle.left = '18px';
		     tStyle.height = '75px';
		    text.innerHTML = '<h3> New </h3><br> • Reload the startup file and start again.'
		    break;
		case 10: // Pitch
			hStyle.height = '42px';
		   	hStyle.width = '130px';
		    hStyle.top = '108px';
		    hStyle.left = '18px';
		     tStyle.height = '75px';
		    text.innerHTML = '<h3> Pitch </h3><br> • Control to location and orientation of the pitch.'
		    break;
		case 11: // Save/Load
			hStyle.height = '95px';
		   	hStyle.width = '130px';
		    hStyle.top = '160px';
		    hStyle.left = '18px';
		     tStyle.height = '75px';
		    text.innerHTML = '<h3> Save and Load </h3><br> • Save files directly to your computer and load them again later.'
		    break;
		case 12: // Export
			hStyle.height = '42px';
		   	hStyle.width = '130px';
		    hStyle.top = '264px';
		    hStyle.left = '18px';
		     tStyle.height = '75px';
		    text.innerHTML = '<h3> Export </h3><br> • Export the animation to a .MP4 file.'
		    break;
		case 13: // AutoSave
			nextBut.style.display = 'block'
			skip.style.display = 'none';
			hStyle.height = '90px';
		   	hStyle.width = '130px';
		    hStyle.top = '349px';
		    hStyle.left = '18px';
		     tStyle.height = '175px';
		    text.innerHTML = '<h3> Autosave </h3><br> • Change the autosave setting. <br> <b> • AutoSave</b> means that locations are saved automatically. <br><br> <b> • Manual Saving</b> means that this button needs to be pressed to save locations. <br><br> • This setting can be changed in the menu. ';
		    break;
		case 14: // Tutorial
			nextBut.style.display = 'none'
			skip.style.display = 'block';
			hStyle.height = '40px';
		   	hStyle.width = '130px';
		    hStyle.top = '444px';
		    hStyle.left = '18px';
		     tStyle.height = '75px';
		    text.innerHTML = '<h3> Tutorial </h3><br> • You can restart this tutorial whenever you need to.';
		    break;
	}

}