var myDelay = (1/65)*1000;
var startTime;
var gif = new GIF({
	workers: 15,
	quality: 100,
});


gif.on ('start', function(){
	console.log("start")
	var d = new Date();
	startTime = d.getTime();
}); 

// gif.on ('progress', (p) -> info.set 'text', Math.round(p * 100)+'%')


gif.on("finished", function(blob) {
	var img = document.querySelector("img");
	img.src = URL.createObjectURL(blob);
	console.log("rendered");
	var i = new Date();
	console.log( i.getTime() - startTime )
	rendered = true;
});


function startExportToGIF(){
	closeSideNavMenu();
	keyframe = 0;
	playing = true;
	capturingGIF = true;
}

function captureGIF(){
	let myCanvas = document.querySelector("canvas");
	var ctx = myCanvas.getContext('2d');
  	gif.addFrame(ctx.getImageData(0 , (headerHeight*window.devicePixelRatio), (width*window.devicePixelRatio), (height - footerHeight - headerHeight)*window.devicePixelRatio, {copy: true, delay: myDelay}));	
  	// gif.addFrame(myCanvas, {copy: true, delay: myDelay});	
	if (animationLooped){
		console.log("done")
		playing = false;
		capturingGIF = false;
		gif.render();
		showDomElement("exportedGIF")
		// exportedGIF
	}
}