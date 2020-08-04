class Item {
	constructor(num) {
    this.dragging = false;
    let fact = Math.floor(num / 25)
    let remain = num % 25;
    this.x = 10 + remain * 30;
    this.y = height - 125 - (fact * 35);
    this.r = 16;
    this.col = 5;
    this.index = num;
    this.itemType = 0;
    this.key = new Array();
    for(let i = 0; i < totalKeyFrame; i++){
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
    if( Array.isArray(this.key[fixedKeyframe])  && this.itemType != 1){
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
    if(this.dragging){
      stroke(55)
      strokeWeight(1)
      line(0, this.y, width, this.y);
      line(this.x, headerHeight, this.x, height);
    }
    stroke(0);
    fill(playerColours[this.col]);
    if(this.itemType === 2){
      push();
      rectMode(CENTER);
      rect(this.x, this.y, 23, 11, 3  )
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
      push();
        let fixedKeyframe = Math.floor(keyframe);
        if(fixedKeyframe === totalKeyFrame-1){
          fixedKeyframe = totalKeyFrame - 2;
        }
        var vec = createVector(this.key[fixedKeyframe][0] - this.key[fixedKeyframe+1][0], this.key[fixedKeyframe][1] - this.key[fixedKeyframe+1][1]);
        translate(this.x, this.y);
       
        if(this.key[fixedKeyframe+1][2] === false){
          rotate(1.5708);
        } else {
          rotate(vec.heading());
        }
        ellipse(0, 0, 17, 11)
      pop();
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
    if(this.dragging && autoSaving){
      this.save();
    }
    this.dragging = false;
  }

  addFrame(frame){
    if(frame === 0){ frame++ }
    var frameToAdd = this.key.slice(0);
    var arrToAdd = frameToAdd[frame-1].slice(0);
    this.key.splice(frame, 0, arrToAdd)
  }

  deleteFrame(frame){
    this.key.splice(frame, 1);
  }
}