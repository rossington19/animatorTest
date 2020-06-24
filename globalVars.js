var slider;
var keyframe = 0;
var displayKeyframe = 0;
var refreshKeyframe = false;
var totalKeyFrame = 5;
var maxNumOfKeyFrames = 12;
var playing = false;
var player = [];
var numOfPlayers = 6;
var selected = undefined;

var buttonPlayAnimation, buttonSaveFrame;
var colorGreen, colorBlack, colorRed, colorBlue, colorWhite, colourSliderDot;

function assignColors(){
	colorGreen = color('#469b2e');
	colourSliderDot = color('#f89300')
}

var headerHeight = 40;
var footerHeight = 90;