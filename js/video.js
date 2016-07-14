/**
 * Created by ben on 14/07/2016.
 */

console.log("video.js is working");

if (!!document.createElement('video').canPlayType) {
    console.log("HTML5 video supported");

    var videoContainer = $( "#video-container" );
    var videoSource = $( "#video-source" );
    var playButton = $( "button#play" );

    //Bug - the page is already loaded so controls will still display
    videoSource.controls = false;

    console.log(videoSource.controls);

    playButton.on( "click", function( event ) {
        console.log("Play button pressed");
    });
    videoSource.on( "click", function( event ) {
        console.log("Video Source clicked");
    });
}
