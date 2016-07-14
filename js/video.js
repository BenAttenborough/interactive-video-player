/**
 * Created by ben on 14/07/2016.
 */

console.log("video.js is working");

if (!!document.createElement('video').canPlayType) {
    console.log("HTML5 video supported");

    var videoContainer = document.getElementById( "video-container" );
    var videoSource = document.getElementById( "video-source" );
    var playButton = document.getElementById( "play" );
    var muteButton = document.getElementById( "mute" );

    //Hide default controls so we can replace with our own
    videoSource.controls = false;

    var playPauseVideo = function() {
        if (videoSource.paused || videoSource.ended) {
            videoSource.play();
            playButton.innerHTML='<img src="assets/icons/pause-icon.png">';
        }
        else {
            videoSource.pause();
            playButton.innerHTML='<img src="assets/icons/play-icon.png">';
        }
    }

    var muteUnmuteVideo = function() {
        videoSource.muted = !videoSource.muted;
        if ( videoSource.muted ) muteButton.innerHTML='<img src="assets/icons/volume-off-icon.png">';
        else muteButton.innerHTML='<img src="assets/icons/volume-on-icon.png">';
    }

    playButton.addEventListener('click', function(event) {
        playPauseVideo();
    });
    videoSource.addEventListener('click', function(event) {
        playPauseVideo();
    });
    muteButton.addEventListener('click', function(event) {
        muteUnmuteVideo();
    });
}
