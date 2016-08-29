/**
 * Created by ben on 29/08/2016.
 */

// global namespace
var RBA_Videoplayer = RBA_Videoplayer || {};

var Video = function () {
    this.source = document.getElementById("video_source");
    //this.videoContainer = document.getElementById("");
    this.buttonPlay = document.getElementById("buttons_play");

    this.buttonPlayIcon = document.getElementById("icon_play");
    this.progressContainer = document.getElementById("progressBar_container");
    this.progressBar = document.getElementById("progressBar_prog");
    this.buffBar = document.getElementById("progressBar_buff");

    this.init();
};

Video.prototype.addSelectListener = function (element, type, func) {
    element.addEventListener(type, this, false);
    this.func = func;
    this.handleEvent = function (e) {
        this.func(e);
    }
};

Video.prototype.addTimingListener = function (element, type, func) {
    element.addEventListener(type, func.bind(this));
};

Video.prototype.init = function () {
    console.log("Video player started");
    this.source.controls = false;
    this.setButtonEvents();
    this.setTimingEvents();
};

Video.prototype.setButtonEvents = function () {
    this.addSelectListener(this.buttonPlay, "click", this.playPauseVideo);
    this.addSelectListener(this.progressContainer, "click", this.skipToLocationListener);
};

Video.prototype.setTimingEvents = function () {
    this.addTimingListener(this.source, "timeupdate", this.updateVideoStatus);
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
    }
};

Video.prototype.updateVideoStatus = function () {
    this.updateProgressBar();
    this.updateBuffBar();
};

Video.prototype.updateProgressBar = function () {
    var percentComplete = Math.round(( this.source.currentTime / this.source.duration ) * 100) + "%";
    this.progressBar.setAttribute("style", "Width: " + percentComplete);
};

Video.prototype.updateBuffBar = function () {
    var buffered = this.source.buffered;
    var bufferedEnd = buffered.end(buffered.length - 1);
    var percentComplete = Math.round(( bufferedEnd / this.source.duration ) * 100) + "%";
    this.buffBar.setAttribute("style", "Width: " + percentComplete);
};

Video.prototype.skipToLocationListener = function (event) {
    var mouseLocation = event.offsetX;
    var containerWidth = this.progressContainer.offsetWidth;
    var position = mouseLocation / containerWidth;
    this.source.currentTime = position * this.source.duration;
};

RBA_Videoplayer.video = new Video();