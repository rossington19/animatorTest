var slider;
var keyframe = 0;
var displayKeyframe = 0;
var refreshKeyframe = false;
var totalKeyFrame = 5;

var playing = false;
var player = [];
// var numOfPlayers = 6;
var items = [];
var selected = undefined;
var itemSelected = undefined;
var doubleClickTimer = 0;

// Drawing shit
var drawingMode = false;
var drawingType = 0; // 0 free, line, arrow, 4 box
var drawing = [];
var currentPath = [];
var lines = []; //type, x1, y1, x2, y2

var showSliderSpeedLoc = undefined;
var addBetweenFrameLoc = undefined;
var deleteFrameLoc = undefined;

var animationLooped = false;
var capturingGIF = false;

var pitchMode = false;
var autoSaving = true;

// var buttonPlayAnimation, buttonSaveFrame;
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

var headerHeight = 0;
var footerHeight = 50;

var jsonFile;

var tutorialPage = 0;