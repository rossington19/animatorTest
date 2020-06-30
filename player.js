class Player {
	constructor(num) {
    this.dragging = false;
    this.index = num;
    this.displayNumber = num+1;
    this.x = 20 + num * 30;
    this.y = 100;
    this.r = 30;
    this.col = 2;
    this.showLines = false;
    this.key = new Array();
    for(let i = 0; i < totalKeyFrame; i++){
      this.key[i] = [this.x, this.y, false]
    }
  }

  update() {
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
      if(this.x < (this.r)/2+1) {this.x = (this.r)/2+1}
      if(this.x > width - (this.r)/2-1) {this.x = width - (this.r)/2-1}
      if(this.y < headerHeight + (this.r)/2+1) {this.y = headerHeight + (this.r)/2+1}
      if(this.y > height - footerHeight - (this.r)/2-1) {this.y = height - footerHeight - (this.r)/2-1}
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
    fill(playerColours[this.col]); //TODO
    
    circle(this.x, this.y, this.r)
   
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(23);
    fill(255);
    if(this.col === 3 || this.col === 5){
      fill(0)
    }
  	text(this.displayNumber, this.x, this.y+1);
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
    for(let i = keyframe+1; i < totalKeyFrame; i++){
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

  pressed() {
    let fixedKeyframe = Math.floor(keyframe)
    if ( dist(this.x, this.y, mouseX, mouseY) < this.r/2){
      this.dragging = true;
      selected = this.index;
      if(!playing){ 
        this.key[fixedKeyframe][2] = true; 
      }
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    this.dragging = false;
  }

  deleteFrame(frame){
    this.key.splice(frame, 1);
  }

  addFrame(frame){
    if(frame === 0){ frame++; }
    var frameToAdd = this.key.slice(0);
    var arrToAdd = frameToAdd[frame-1].slice(0);
    this.key.splice(frame, 0, arrToAdd)
  }
}