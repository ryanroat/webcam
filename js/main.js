// global variables
let width = 500,
    height = 0,
    filter = 'none',
    streaming = false;

// DOM elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');

// Get media stream
navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(function(stream) {
    //link to the video source
    video.srcObject =stream;
    // Play video
    video.play();
  })
  .catch(function(err) {
    console.log(`Error: ${err}`);
  }); 