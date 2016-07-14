/**
 * Created by ben on 14/07/2016.
 */

console.log("video.js is working");

if (!!document.createElement('video').canPlayType) {
    console.log("HTML5 video supported");

    var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);

    var videoContainer = document.getElementById( 'video-container' );
    var videoSource = document.getElementById( 'video-source' );
    var playButton = document.getElementById( 'play' );
    var muteButton = document.getElementById( 'mute' );
    var fullscreenButton = document.getElementById( 'fullscreen' );

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

    if (!fullScreenEnabled) {
        fullscreenButton.style.display = 'none';
    }

    var isFullScreen = function() {
        return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
    }

    var setFullscreenData = function(state) {
        videoContainer.setAttribute('data-fullscreen', !!state);
    }

    var fullScreenVideo = function() {
        if (isFullScreen()) {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
            setFullscreenData(false);
        }
        else {
            if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
            else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
            else if (videoContainer.webkitRequestFullScreen) videoContainer.webkitRequestFullScreen();
            else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
            setFullscreenData(true);
        }
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
    fullscreenButton.addEventListener('click', function(event) {
        fullScreenVideo();
    });
}
