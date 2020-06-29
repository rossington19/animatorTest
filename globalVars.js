var slider;
var keyframe = 0;
var displayKeyframe = 0;
var refreshKeyframe = false;
var totalKeyFrame = 5;
var maxNumOfKeyFrames = 12;
var playing = false;
var player = [];
// var numOfPlayers = 6;
var items = [];
var selected = undefined;
var itemSelected = undefined;
var doubleClickTimer = 0;

// Drawing shit
var drawingMode = false;
var drawing = [];
var currentPath = [];

var showSliderSpeedLoc = undefined;

var buttonPlayAnimation, buttonSaveFrame;
var colorPitch, colourRed, colourBlue, colourGreen, colourYellow, colourBlack, colourWhite, colourSliderDot;
var playerColours = [];

function assignColors(){
	colorPitch = color('#469b2e');
	colourSliderDot = color('#f89300')
	colourRed = color('#d13131');
	colourBlue = color('#223fc8');
	colourGreen = color('#006c04');
	colourYellow = color('#eded1e');
	colourBlack = color('#202020');
	colourWhite = color('#ebebeb');
	playerColours = [colourRed, colourBlue, colourGreen, colourYellow, colourBlack, colourWhite];
}

var headerHeight = 40;
var footerHeight = 90;