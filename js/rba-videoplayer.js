/**
 * Created by ben on 29/08/2016.
 */

// global namespace
var RBA_Videoplayer = RBA_Videoplayer || {};

var Video = function () {
    this.source = document.getElementById("video_source");
    this.buttonPlay = document.getElementById("buttons_play");
    this.buttonPlayIcon = document.getElementById("icon_play");

    this.init();
};

Video.prototype.init = function () {
    console.log("Video player started");
    this.source.controls = false;
    this.setButtonEvents();
};

Video.prototype.setButtonEvents = function () {
    this.addListener(this.buttonPlay, "click", this.playPauseVideo);
};

Video.prototype.play = function () {
    this.source.play();
};

Video.prototype.playPauseVideo = function () {
    if (this.source.paused || this.source.ended) {
        this.source.play();
        this.buttonPlayIcon.src = "assets/icons/pause-icon.png";
    }
    else {
        this.source.pause();
        this.buttonPlayIcon.src = "assets/icons/play-icon.png";
    }};

Video.prototype.addListener = function (element, type, func) {
    element.addEventListener(type, func.bind(this));
};

RBA_Videoplayer.video = new Video();



