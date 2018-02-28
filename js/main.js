// global variables
let width = 500,
    height = 0,
    filter = 'none',
    streaming = false;

// DOM elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');

// Get media stream
navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(function(stream) {
    //link to the video source
    video.srcObject = stream;
    // Play video
    video.play();
  })
  .catch(function(err) {
    console.log(`Error: ${err}`);
  }); 

  // Play when ready

video.addEventListener('canplay', function(e) {
  if(!streaming) {
    // Set video / canvas height
    height = video.videoHeight / (video.videoWidth / width);

    video.setAttribute('width', width);
    video.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    streaming = true;
  }
}, false);

// Photo button event
photoButton.addEventListener('click', function(e){
  takePicture();
  e.preventDefault();
}, false);

// Filter event
photoFilter.addEventListener('change', function(e) {
  e.preventDefault();
  // Set filter to chosen option
  filter = e.target.value;
  // Set filter option to video
  video.style.filter = filter;
});

// Take picture from canvas
function takePicture(e) {
  // Create canvas
  const context = canvas.getContext('2d');
  if(width && height) {
    // set canvas properties
    canvas.width = width;
    canvas.height = height;
    // Draw an image of the video on the canvas
    context.drawImage(video, 0, 0, width, height);

    // Create image from canvas
    const imgUrl = canvas.toDataURL('image/png');

    // Create image element
    const img = document.createElement('img');

    // Set image source
    img.setAttribute('src', imgUrl);

    //append image to #photos 
    photos.appendChild(img);
  }
};