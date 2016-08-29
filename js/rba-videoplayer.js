/**
 * Created by ben on 29/08/2016.
 */

// global namespace
var RBA_Videoplayer = RBA_Videoplayer || {};

var Video = function () {
    this.source = document.getElementById("video_source");
    this.progressContainer = document.getElementById("progressBar_container");
    this.progressBar = document.getElementById("progressBar_prog");
    this.buffBar = document.getElementById("progressBar_buff");
    this.buttonPlay = document.getElementById("buttons_play");
    this.buttonPlayIcon = document.getElementById("icon_play");
    this.startTime = document.getElementById("time_start");
    this.endTime = document.getElementById("time_end");
    this.buttonMute = document.getElementById("buttons_mute");
    this.buttonMuteIcon = document.getElementById("icon_mute");



    this.init();
};

Video.prototype.addSelectListener = function (element, type, func) {
    element.addEventListener(type, func.bind(this));
};

Video.prototype.setButtonEvents = function () {
    this.addSelectListener(this.progressContainer, "click", this.skipToLocationListener);
    this.addSelectListener(this.buttonPlay, "click", this.playPauseVideo);
    this.addSelectListener(this.buttonMute, "click", this.muteVideo);
};

Video.prototype.setTimingEvents = function () {
    this.addSelectListener(this.source, "timeupdate", this.updateVideoStatus);
    this.addSelectListener(this.source, "durationchange", this.setDurration);
};

Video.prototype.muteVideo = function () {
    var volOnImg = 'assets/icons/volume-on-icon.png';
    var volOffImg = 'assets/icons/volume-off-icon.png';
    this.source.muted = !this.source.muted;
    var self = this;
    if (this.source.muted) {
        self.buttonMuteIcon.src = volOffImg;
        console.log('Volume off');
    } else {
        self.buttonMuteIcon.src = volOnImg;
        console.log('Volume on');
    }
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
    this.updateTime();
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

Video.prototype.niceTime = function (time) {
    var roundedTime = Math.round(time);
    var hours = parseInt(roundedTime / 3600) % 24;
    var minutes = parseInt(roundedTime / 60) % 60;
    var seconds = roundedTime % 60;
    var niceTime = (hours === 0 ? "" : ( (hours < 10 ? "0" + hours : hours) + ":") ) + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    return niceTime;
};

Video.prototype.setDurration = function () {
    console.log("Setting clock");
    this.startTime.innerText = this.niceTime(this.source.currentTime);
    this.endTime.innerText = this.niceTime(this.source.duration);
};

Video.prototype.init = function () {
    console.log("Video player started");
    this.source.controls = false;
    this.setButtonEvents();
    this.setTimingEvents();
};

Video.prototype.updateTime = function () {
    this.startTime.innerText = this.niceTime(this.source.currentTime);
};

RBA_Videoplayer.video = new Video();