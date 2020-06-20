class Ball {
	constructor(num) {
    this.dragging = false;
    this.rollover = false;
    this.x = width/2;
    this.y = height/2;
    this.r = 19;

    this.col = 0;
    this.showLines = false;
    this.key = new Array();
    for(let i = 0; i < maxNumOfKeyFrames; i++){
      this.key[i] = [this.x, this.y, false]
    }
  }

  over() {
    if ( dist(this.x, this.y, mouseX, mouseY) < this.r/2 && !mouseIsPressed ){
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update() {
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
      if(this.x < pitchMargin + (this.r)/2+1) {this.x = pitchMargin + (this.r)/2+1}
      if(this.x > width - pitchMargin - (this.r)/2-1) {this.x = width - pitchMargin - (this.r)/2-1}
      if(this.y < pitchMargin + (this.r)/2+1) {this.y = pitchMargin + (this.r)/2+1}
      if(this.y > 540 + pitchMargin - (this.r)/2-1) {this.y = 540 + pitchMargin - (this.r)/2-1}
    } else if (refreshKeyframe){
      this.calcLocation()
    }
  }

  calcLocation(){
    let fixedKeyframe = Math.floor(keyframe)
    let percentage = keyframe - fixedKeyframe;

    if( Array.isArray(this.key[fixedKeyframe])){
      if(fixedKeyframe < totalKeyFrame-1){
      	let startX = this.key[fixedKeyframe][0];
      	let startY = this.key[fixedKeyframe][1];
      	let endX = this.key[fixedKeyframe+1][0];
      	let endY = this.key[fixedKeyframe+1][1];
        this.x = lerp(startX, endX, percentage);
        this.y = lerp(startY, endY, percentage);
      } else {
        this.x = this.key[fixedKeyframe][0];
        this.y = this.key[fixedKeyframe][1];
      }
    }

  }

  show() {
    stroke(0);
    if (this.dragging) { fill(215);
    } else if (this.rollover) { fill(235);
    } else { fill(255);
    }
    
    ellipse(this.x, this.y, 13, 19)
  }

  drawLines(){
    if(this.showLines){
      for(var i = 0; i < totalKeyFrame - 1; i++){
        stroke(0);
        strokeWeight(2);
        line(this.key[i][0], this.key[i][1], this.key[i+1][0], this.key[i+1][1])
        strokeWeight(1);
      }
    }
  }

  save(){
  	this.key[keyframe][0] = this.x
    this.key[keyframe][1] = this.y;
    for(let i = keyframe+1; i < maxNumOfKeyFrames; i++){
      if(this.key[i][2]){
        break;
      } else {
        this.key[i] = [this.x, this.y, false];
      }
    }
    let changeAllBefore = true;
    for(let j = 0; j < keyframe; j++){
      if(this.key[j][2]) {changeAllBefore = false;}
    }
    if(changeAllBefore){
      for(let k = 0; k < keyframe; k++){
        this.key[k][0] = this.x
        this.key[k][1] = this.y;
      }
    }

  }

  pressed(touch) {
    let fixedKeyframe = Math.floor(keyframe)
   	if ( dist(this.x, this.y, mouseX, mouseY) < this.r/2){
      this.dragging = true;
      selected = this.index;
      if(!playing){ this.key[fixedKeyframe][2] = true; }
      
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
      if (touch) this.offsetY -= 50;
    }
  }

  released() {
    this.dragging = false;
  }
}
