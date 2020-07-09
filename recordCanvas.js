var chunks = [];
var name = 'testVid';
var recorder;
var stream;

function recordCanvas() {
  closeSideNavMenu();
  keyframe = 0;
  // capturingGIF = true;
  // *** //
  logs = []
  chunks = [];
  frames = [];
  chunks.length = 0;
  let canvasToRecord = document.querySelector("canvas");
  stream = canvasToRecord.captureStream(65);
  var options = {
    videoBitsPerSecond : 1250000
  }
  recorder = new MediaRecorder(stream, options);
  recorder.ondataavailable = e => {
    if (e.data.size) {
      chunks.push(e.data);
    }
  };
  recorder.onstop = onRecorderStop;
  recorder.start();
  setTimeout(function(){ playing = true; }, 500);

}

function onRecorderStop(e) {
  var blobWebm = new Blob(chunks,  {type: 'video/mp4'});
  stream.getTracks().forEach(t => t.stop());  
  download(blobWebm, `${name}.mp4`)  
}