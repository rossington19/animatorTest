class Item {
	constructor(num) {
    this.dragging = false;
    this.rollover = false;
    this.x = width/2;
    this.y = height/2;
    this.r = 19;
    this.col = 5;
    this.index = num;
    this.itemType = 0;
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
    fill(playerColours[this.col]);
    if(this.itemType === 2){
      push();
      rectMode(CENTER);
      rect(this.x, this.y, 25, 13, 3  )
      pop();
    } else if (this.itemType === 1) {
      push();
      noFill();
      stroke(0);
      strokeWeight(7)
      circle(this.x, this.y, 11);
      stroke(playerColours[this.col]);
      strokeWeight(5)
      circle(this.x, this.y, 11);
      pop()
    } else {
      ellipse(this.x, this.y, 13, 19)
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
      itemSelected = this.index;
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