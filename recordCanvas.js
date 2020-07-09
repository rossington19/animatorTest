var chunks = [];
var name = 'testVid';
var recorder;
var stream;

var offscreenCanvas, offscreenCanvasContext, drawingCanvas, pixelDensity;

function startRecordingCanvas() {
  closeSideNavMenu();
  keyframe = 0;
  pixelDensity = window.devicePixelRatio;

  drawingCanvas = document.querySelector("#drawingCanvas");
  drawingCanvas.style.position = 'absolute'
  drawingCanvas.style.left = '300px'
  
  offscreenCanvas =document.createElement('canvas');
  offscreenCanvas.width = drawingCanvas.width;
  offscreenCanvas.height = drawingCanvas.height - pixelDensity*(headerHeight + footerHeight);
  offscreenCanvasContext = offscreenCanvas.getContext('2d');

  stream = offscreenCanvas.captureStream();

  // *** //
  chunks = [];
  chunks.length = 0;
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = e => {
    if (e.data.size) {
      chunks.push(e.data);
    }
  };
  recorder.onstop = onRecorderStop;
  recorder.start();
  setTimeout(function(){ playing = true; }, 500);

}

function recordCanvas(){
  // drawImage(                     image,       sx,                sy,              sWidth,                 sHeight,        dx, dy,      dWidth,                dHeight);
  offscreenCanvasContext.drawImage(drawingCanvas, 0,  pixelDensity*headerHeight, drawingCanvas.width, offscreenCanvas.height, 0, 0, drawingCanvas.width, offscreenCanvas.height  )
}


function onRecorderStop(e) {
  var blobWebm = new Blob(chunks,  {type: 'video/mp4'});
  stream.getTracks().forEach(t => t.stop());  
  download(blobWebm, `${name}.mp4`)  
}
