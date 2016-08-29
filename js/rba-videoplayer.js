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



    this.init();
};

Video.prototype.EventHandler = function (element, type, func) {
    this.element = element;
    this.type = type;
    this.func = func;
    this.init = function () {
        console.log("Assign click function to: " + this.element);
        element.addEventListener(type, this, false);
    };
    this.handleEvent = function (e) {
        console.log("Event caught");
        //this.func(e);
        this.func(e);
    }
};

Video.prototype.addTimingListener = function (element, type, func) {
    element.addEventListener(type, func.bind(this));
};

Video.prototype.setButtonEvents = function () {

    this.buttonPlayHandler = new this.EventHandler (this.buttonPlay, "click", this.playPauseVideo);
    this.buttonPlayHandler.init();


    //this.addSelectListener(this.progressContainer, "click", this.skipToLocationListener);
    //this.addSelectListener(this.buttonPlay, "click", this.playPauseVideo);
};

Video.prototype.setTimingEvents = function () {
    this.addTimingListener(this.source, "timeupdate", this.updateVideoStatus);
    //this.addTimingListener(this.source, "durationchange", this.setClock);
};

Video.prototype.play = function () {
    this.source.play();
};

Video.prototype.playPauseVideo = function () {
    console.log("Play pressed");
    console.log(this);
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

Video.prototype.niceTime = function (time) {
    var roundedTime = Math.round(time);
    var hours = parseInt(roundedTime / 3600) % 24;
    var minutes = parseInt(roundedTime / 60) % 60;
    var seconds = roundedTime % 60;
    var niceTime = (hours === 0 ? "" : ( (hours < 10 ? "0" + hours : hours) + ":") ) + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    return niceTime;
};

Video.prototype.setClock = function () {
    //this.startTime.innerText = this.niceTime(this.source.currentTime);
    this.endTime.innerText = this.niceTime(this.source.duration);
};

Video.prototype.init = function () {
    console.log("Video player started");
    this.source.controls = false;
    this.setButtonEvents();
    this.setTimingEvents();
};

RBA_Videoplayer.video = new Video();