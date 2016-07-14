/**
 * Created by ben on 14/07/2016.
 */

console.log("video.js is working");

if (!!document.createElement('video').canPlayType) {
    console.log("HTML5 video supported");

    var videoContainer = document.getElementById( "video-container" );
    var videoSource = document.getElementById( "video-source" );
    var playButton = document.getElementById( "play" );

    //Bug - the page is already loaded so controls will still display
    videoSource.controls = false;

    playButton.addEventListener('click', function(event) {
        console.log("Play button pressed");
        if (videoSource.paused || videoSource.ended) videoSource.play();
        else videoSource.pause();
    });
    videoSource.addEventListener('click', function(event) {
        console.log("Video Source clicked");
        if (videoSource.paused || videoSource.ended) videoSource.play();
        else videoSource.pause();
    });
}
