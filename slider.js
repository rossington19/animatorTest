class Slider{
	constructor(){
		this.margin = 20;
		this.yLocation = height - footerHeight + 25;
		this.lineLength = width - (2*this.margin)
		this.dotXLoc = this.margin + keyframe*(this.lineLength/(totalKeyFrame-1));
		this.dragged = false;
		this.size = 20;
		this.increment = 0.01;
		this.frameIncrement = Array(totalKeyFrame).fill(1);
	}

	drawSlider(){
		push();
		stroke(125);
		strokeWeight(1);
		line(this.margin, this.yLocation, width-this.margin, this.yLocation);
		for(var i = 0; i < totalKeyFrame; i++){
			let xLocation = this.margin + i*(this.lineLength/(totalKeyFrame-1)) 
			line(xLocation, this.yLocation + (this.size/1.5) , xLocation, this.yLocation - (this.size/1.5)  )
		}
		if(showSliderSpeedLoc != undefined){
			this.drawSpeedSelection();
		}
		if(addBetweenFrameLoc != undefined){
			this.drawAddBetweenFrames();
		}
		if(deleteFrameLoc != undefined){
			this.drawDeleteFrameLoc();
		}

		pop();
	}

	drawDot(){
		push();
		stroke(125);
		strokeWeight(1);
	    fill(colourSliderDot)
	    this.getDotLoc();
		circle(this.dotXLoc, this.yLocation, this.size);
		keyframe = this.convertLocToFrame();
		pop();
		if (!playing && !this.dragged){
			keyframe = Math.round(keyframe);
		}
	}

	getDotLoc(){
		if(this.dragged){
	    	this.dotXLoc = mouseX;
	    } else {
			this.dotXLoc = this.margin + keyframe*(this.lineLength/(totalKeyFrame-1));
	    }
	    if (this.dotXLoc < this.margin){
			this.dotXLoc = this.margin;
		} else if (this.dotXLoc > this.margin + this.lineLength){
			this.dotXLoc = this.margin + this.lineLength;
		}
	}

	isOver(){
		return dist(this.dotXLoc, this.yLocation, mouseX, mouseY) < 20
	}

	pressed(){
		if( mouseY >  this.yLocation-this.size && mouseY < this.yLocation+this.size){
			this.dragged = true;
		}
	}

	released(){
		this.dragged = false;
		if (!playing){
			keyframe = Math.round(this.convertLocToFrame());
		}

	}

	convertLocToFrame(){
		let percentage = (this.dotXLoc-this.margin)/this.lineLength;
		return percentage * (totalKeyFrame-1);
	}

	play(){
		let keyFrameInt = Math.floor(keyframe);
		animationLooped = false;
		keyframe += (this.increment*this.frameIncrement[keyFrameInt]);
		if (keyframe >= totalKeyFrame-1){
			if(recorder && recorder.state === "recording"){
				keyframe = totalKeyFrame-1;
				setTimeout(function(){ 
					if(recorder && recorder.state === "recording"){
						recorder.stop(); 
						playing = false;
					}
				}, 250);
				setTimeout(function(){ keyframe = 0; }, 500);
			} else {
				keyframe = 0;
			}
		}
	}

	drawSpeedSelection(){
		stroke(colourSliderDot);
		strokeWeight(3);
		if(showSliderSpeedLoc === 0){
			line(this.margin, this.yLocation, width-this.margin, this.yLocation);
		} else {
			let dropDown = document.getElementById('speedTargetDropDown');
			let selectedFrame = parseInt(dropDown.options[dropDown.selectedIndex].value);
			let startLoc = this.margin + (selectedFrame-1)*(this.lineLength/(totalKeyFrame-1));
			let endLoc = this.margin + (selectedFrame)*(this.lineLength/(totalKeyFrame-1));
			line(startLoc, this.yLocation, endLoc, this.yLocation);
		}
	}

	drawAddBetweenFrames(){
		push();
		stroke(colourSliderDot);
		strokeWeight(3);
		if(addBetweenFrameLoc === 0){
			let xloc = this.margin - 10;
			line(xloc, this.yLocation-10, xloc, this.yLocation+10);
			line(xloc-10, this.yLocation, xloc+10, this.yLocation);
		} else if (addBetweenFrameLoc === totalKeyFrame){
			let xloc = width - this.margin + 10;
			line(xloc, this.yLocation-10, xloc, this.yLocation+10);
			line(xloc-10, this.yLocation, xloc+10, this.yLocation);
		} else {
			let xloc = this.margin + (addBetweenFrameLoc-0.5)*(this.lineLength/(totalKeyFrame-1));
			line(xloc, this.yLocation-10, xloc, this.yLocation+10);
			line(xloc-10, this.yLocation, xloc+10, this.yLocation);
		}
		pop();
	}

	drawDeleteFrameLoc(){
		push();
		stroke(colourSliderDot);
		strokeWeight(3);
		let xloc = this.margin + (deleteFrameLoc)*(this.lineLength/(totalKeyFrame-1));
		line(xloc-10, this.yLocation-10, xloc+10, this.yLocation+10);
		line(xloc-10, this.yLocation+10, xloc+10, this.yLocation-10);
		pop();
	}

	addFrame(frame){
	if(frame === 0){ frame++ }
		this.frameIncrement.splice(frame, 0, 1)
	}

	deleteFrame(frame){
		this.frameIncrement.splice(frame, 1);
	}
}