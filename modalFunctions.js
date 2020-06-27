function changeTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("modalTabButton");
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
  let x = elmnt.parentNode.parentNode.getElementsByClassName("showPlayer")[0];
  let y = parseInt(elmnt.getAttribute("data-color") );
  x.style.backgroundColor = playerColours[y];
  x.setAttribute("data-color", y);
  if (y === 3 || y === 5){
    x.style.color = "black";
  } else {
    x.style.color = "white";
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
  for (i = 0; i < colorOptions.length; i++) {
    let colorNum = parseInt(colorOptions[i].getAttribute("data-color"));
    if(colorNum === selectedPlayerColour){
      changeColorSelection(colorOptions[i]);
    }
  }
}

function addNewPlayer(){
  let newPlayerIndex = player[ player.length - 1].index + 1;
  if(numOfPlayers < 30){
    numOfPlayers++;
    player.push( new Player(newPlayerIndex) )
  }

  let newPlayer =  player.find(x => x.index === newPlayerIndex);
  let playerToAdd = document.getElementById('playerToAdd');
  newPlayer.displayNumber = playerToAdd.innerHTML;
  newPlayer.col = parseInt(playerToAdd.getAttribute("data-color"));

  newPlayer.showLines = document.getElementById('addPlayerShowLines').checked;
  hideDomElement('addActorModal');
}
