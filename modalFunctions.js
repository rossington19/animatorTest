function changeTab(evt, tabName) {
  var i, tabcontent, tablinks;
  let thisModalBod = evt.currentTarget.parentNode.parentNode;
  tabcontent = thisModalBod.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = thisModalBod.getElementsByClassName("modalTabButton");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function  populateColorsOfOptions(){
  var colorSelectors = document.getElementsByClassName('colorOptionsContainer');
  var colorOptions;
  for (var i = 0; i < colorSelectors.length; i++) {
    colorOptions = colorSelectors[i].children;
    for(var j = 0; j < colorOptions.length; j++){
      let colorNum = parseInt(colorOptions[j].getAttribute("data-color"));
      colorOptions[j].style.backgroundColor = playerColours[colorNum];
    }
  }
}



function changeColorSelection(elmnt) {
	let colorOptions = elmnt.parentNode.children;
  for (i = 0; i < colorOptions.length; i++) {
    colorOptions[i].className = colorOptions[i].className.replace(" active", "");
    colorOptions[i].innerHTML = "";
  }
  elmnt.innerHTML = "✔";
  elmnt.className += " active";
  let x = elmnt.parentNode.parentNode.getElementsByClassName("toBeAffByCol");
  let y = parseInt(elmnt.getAttribute("data-color") );
  for(j = 0; j < x.length; j++){
    x[j].style.backgroundColor = playerColours[y];
    x[j].setAttribute("data-color", y);
    if (y === 3 || y === 5){
      x[j].style.color = "black";
    } else {
      x[j].style.color = "white";
    }
  }
}

function updateSelectedPlayerNumber(targ, input){
  let value = document.getElementById(input).value;
  if (value.length > 2){
    value = value.substring(0, value.length - 1);
    document.getElementById(input).value = value;
  }
  document.getElementById(targ).innerHTML = document.getElementById(input).value;
}


function applyPlayerEdits(){
  let domSelectedPlayer = document.getElementById('selectedPlayer');
  selected = parseInt(domSelectedPlayer.getAttribute("data-target"));
  let selectedPlayer =  player.find(x => x.index === selected);
  selectedPlayer.displayNumber = domSelectedPlayer.innerHTML;
  selectedPlayer.col = parseInt(domSelectedPlayer.getAttribute("data-color"));
  selectedPlayer.showLines = document.getElementById('showLines').checked
  hideDomElement('playerEditModal')
}

function deletePlayer(){
   let domSelectedPlayer = document.getElementById('selectedPlayer');
  selected = parseInt(domSelectedPlayer.getAttribute("data-target"));
  player.splice(selected, 1);
  for (var i = 0; i < player.length; i++) {
    player[i].index = i;
  }
  hideDomElement('playerEditModal');
}

function applyItemEdits(){
  let domSelectedItem = document.getElementById('selectedItem');
  itemSelected = parseInt(domSelectedItem.getAttribute("data-target"));
  let selectedItemObj =  items.find(x => x.index === itemSelected);
  selectedItemObj.col = parseInt(domSelectedItem.getAttribute("data-color"));
  hideDomElement('itemEditModal');
}

function deleteItem(){
  let domSelectedItem = document.getElementById('selectedItem');
  itemSelected = parseInt(domSelectedItem.getAttribute("data-target"));
  items.splice(itemSelected, 1);
  for (var i = 0; i < items.length; i++) {
    items[i].index = i;
  }
  hideDomElement('itemEditModal');
}

function populatePlayerEdit(){
  document.getElementById("playerEditModal").style.display = "block";
  let selectedPlayer =  player.find(x => x.index === selected);
  let domSelectedPlayer = document.getElementById('selectedPlayer');
  let domSelectedInput = document.getElementById('selectedPlayerInput');
  
  let seletedPlayerNumber = selectedPlayer.displayNumber;
  let selectedPlayerColour = selectedPlayer.col;

  domSelectedPlayer.innerHTML = seletedPlayerNumber;
  domSelectedPlayer.backgroundColor = playerColours[selectedPlayerColour];
  domSelectedPlayer.setAttribute("data-color", selectedPlayerColour);
  domSelectedPlayer.setAttribute("data-target", selected);
  domSelectedInput.value = seletedPlayerNumber;
  document.getElementById('showLines').checked = selectedPlayer.showLines

  let colorOptions = document.getElementById('colorOptionsPlayerEdit').children;
  let activeElem;
  for (let i = 0; i < colorOptions.length; i++) {
    let colorNum = parseInt(colorOptions[i].getAttribute("data-color"));
    if(colorNum === selectedPlayerColour){
      changeColorSelection(colorOptions[i]);
    }
  }
}

function populateItemEdit(){
  document.getElementById("itemEditModal").style.display = "block";
  let selectedItem =  items.find(x => x.index === itemSelected);
  let domSelectedItem = document.getElementById('selectedItem');
  let selectedItemColour = selectedItem.col;
  domSelectedItem.setAttribute("data-target", itemSelected);
  domSelectedItem.classList.remove("itemBall");
  domSelectedItem.classList.remove("itemCone");
  domSelectedItem.classList.remove("itemPad");
  domSelectedItem.innerHTML = '';
  if (selectedItem.itemType === 0){
    domSelectedItem.classList.add("itemBall");
  } else if(selectedItem.itemType === 1){
    domSelectedItem.classList.add("itemCone");
    domSelectedItem.innerHTML = '<div class="coneInner"></div>';
  } else if(selectedItem.itemType === 2){
    domSelectedItem.classList.add("itemPad");
  }
  let colorOptions = document.getElementById('colorOptionsItemEdit').children;
  let activeElem;
  for (i = 0; i < colorOptions.length; i++) {
    let colorNum = parseInt(colorOptions[i].getAttribute("data-color"));
    if(colorNum === selectedItemColour){
      changeColorSelection(colorOptions[i]);
    }
  }
}

function addNewPlayer(){
  let newPlayerIndex = player.length;
  if(player.length < 30){
    player.push( new Player(newPlayerIndex) )
  }

  let newPlayer =  player.find(x => x.index === newPlayerIndex);
  let playerToAdd = document.getElementById('playerToAdd');
  newPlayer.displayNumber = playerToAdd.innerHTML;
  newPlayer.col = parseInt(playerToAdd.getAttribute("data-color"));

  newPlayer.showLines = document.getElementById('addPlayerShowLines').checked;
  hideDomElement('addActorModal');
}

function addNewItem(){
  let newItemIndex = items.length;
  items.push( new Item(newItemIndex) );
  let newItem =  items.find(x => x.index === newItemIndex);
  let itemToAdd = document.getElementById('itemToAdd');
  newItem.col = parseInt(itemToAdd.getAttribute("data-color"));
  newItem.itemType = parseInt(itemToAdd.getAttribute("data-targItemType"));
  hideDomElement('addActorModal');
}

function changeSelectedItem(elmnt){
  let allOptions = document.getElementsByClassName("itemOption");
  for(i = 0; i < allOptions.length; i++){
    allOptions[i].className = allOptions[i].className.replace(" active", "");
  }
  elmnt.className += " active";
   let itemToAdd = document.getElementById('itemToAdd');
   let typeOfItemToAdd = elmnt.children[0].getAttribute('data-thisItemType');
   itemToAdd.setAttribute("data-targItemType", typeOfItemToAdd);
}


// frame editing

function populateAddFrameEditor(){
  addBetweenFrameLoc = parseInt( document.getElementById('addingFrameSelText').getAttribute('data-frameNum') ); 
  while (addBetweenFrameLoc >= totalKeyFrame){
    updateAddingFrameSelector(false)
  }
}

function populateDeleteFrameEditor(){
  deleteFrameLoc = parseInt( document.getElementById('deletingFrameSelText').getAttribute('data-frameNum') ); 
}


function updateAddingFrameSelector(increase){
  let selector = document.getElementById("addingFrameSelText");
  let frameNum = parseInt(selector.getAttribute("data-frameNum"));
  if(increase){
    frameNum++;
  } else {
    frameNum--;
  }
  if(frameNum === 0){
    selector.innerHTML = "At Start";
    document.getElementById("addFrameSelDecr").disabled = true;
  } else if (frameNum === totalKeyFrame){
    selector.innerHTML = "At End";
    document.getElementById("addFrameSelIncr").disabled = true;
  } else {
    let allButtons = selector.parentElement.getElementsByClassName("frameSelButton");
    for (var i = allButtons.length - 1; i >= 0; i--) {
      allButtons[i].disabled = false;
    }
    let nextFrame = frameNum+1;
    selector.innerHTML = "Between " + frameNum + " and " + nextFrame;
  }
  addBetweenFrameLoc = frameNum;
  selector.setAttribute("data-frameNum", frameNum)
}

function updateDeleteFrameSelector(increase){
  let selector = document.getElementById("deletingFrameSelText");
  let frameNum = parseInt(selector.getAttribute("data-frameNum"));
  if(increase){
    frameNum++;
  } else {
    frameNum--;
  }
  if(frameNum === 0){
    document.getElementById("deleteFrameSelDecr").disabled = true;
  } else if (frameNum === totalKeyFrame-1){
    document.getElementById("deleteFrameSelIncr").disabled = true;
  } else {
    let allButtons = selector.parentElement.getElementsByClassName("frameSelButton");
    for (var i = allButtons.length - 1; i >= 0; i--) {
      allButtons[i].disabled = false;
    }
  }
  let frameToShow = frameNum+1
  selector.innerHTML = "Frame " + frameToShow;
  deleteFrameLoc = frameNum;
  selector.setAttribute("data-frameNum", frameNum)
}