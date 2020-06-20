class Slider{
	constructor(){
		this.margin = 30;
		this.yLocation = 570;
		this.lineLength = width - (2*this.margin)
		this.dotXLoc = this.margin + keyframe*(this.lineLength/(totalKeyFrame-1));
		this.dragged = false;
		this.size = 20;
		this.increment = 0.01;
	}


	drawSlider(){
		stroke(126);
		line(this.margin, this.yLocation, width-this.margin, this.yLocation);
		for(var i = 0; i < totalKeyFrame; i++){
			let xLocation = this.margin + i*(this.lineLength/(totalKeyFrame-1)) 
			line(xLocation, this.yLocation + (this.size/1.5) , xLocation, this.yLocation - (this.size/1.5)  )
		}
	}

	drawDot(){
	    if (this.dragged) {
	    	fill(255,50,50);
		} else if ( this.isOver() ){
	    	fill(250,90,90);
	    }
		else {
	     	fill(200,100,100);
	    }
	    this.getDotLoc();
		circle(this.dotXLoc, this.yLocation, this.size);
		keyframe = this.convertLocToFrame();
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
		// if (this.isOver()){
		// 	this.dragged = true;
		// } else {
		// 	this.dragged = false;
		// }
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
		keyframe += this.increment;
		if (keyframe >= totalKeyFrame-1){
			keyframe = 0;
		}
	}
}