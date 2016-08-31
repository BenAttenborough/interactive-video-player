/**
 * Created by ben on 29/08/2016.
 */

// global namespace
var RBA_Videoplayer = RBA_Videoplayer || {};

var Video = function () {
    this.source = document.getElementById("video_source");
    this.videoContainer = document.getElementById("video_container");
    this.progressContainer = document.getElementById("progressBar_container");
    this.progressBar = document.getElementById("progressBar_prog");
    this.buffBar = document.getElementById("progressBar_buff");
    this.buttonPlay = document.getElementById("buttons_play");
    this.buttonPlayIcon = document.getElementById("icon_play");
    this.startTime = document.getElementById("time_start");
    this.endTime = document.getElementById("time_end");
    this.buttonMute = document.getElementById("buttons_mute");
    this.buttonMuteIcon = document.getElementById("icon_mute");
    this.buttonGain = document.getElementById("buttons_gain");
    this.gainControl = document.getElementById("gain_control");
    this.gainBar = document.getElementById("gain_control_bar");
    this.gainBarLevel = document.getElementById("gain_control_bar_inner");
    this.buttonSpeed = document.getElementById("buttons_speed");
    this.buttonSpeedIcon = document.getElementById("icon_speed");
    this.buttonCC = document.getElementById("buttons_cc");
    this.buttonCCIcon = document.getElementById("icon_cc");
    this.buttonFullScreen = document.getElementById("buttons_fullscreen");
    var captionsContainer = document.getElementById("video_captions");
    this.captions = captionsContainer.getElementsByTagName("span");
    this.showCC = false;
    this.init();
};

Video.prototype.addSelectListener = function (element, type, func) {
    element.addEventListener(type, func.bind(this));
};

Video.prototype.setButtonEvents = function () {
    this.addSelectListener(this.progressContainer, "click", this.skipToLocationListener);
    this.addSelectListener(this.buttonPlay, "click", this.playPauseVideo);
    this.addSelectListener(this.buttonMute, "click", this.muteVideo);
    this.addSelectListener(this.buttonGain, "click", this.showGainControl);
    this.addSelectListener(this.buttonSpeed, "click", this.speedVideo);
    this.addSelectListener(this.buttonCC, "click", this.showCaptions);
    this.addSelectListener(this.gainBar, "click", this.setVolume);
    this.addSelectListener(this.buttonFullScreen, "click", this.goFullScreen);
    this.bindCaptions();
};

Video.prototype.setTimingEvents = function () {
    this.addSelectListener(this.source, "timeupdate", this.updateVideoStatus);
    this.addSelectListener(this.source, "durationchange", this.setDuration);
};

Video.prototype.showCaptions = function () {
    var OnImg = 'assets/icons/CC.png';
    var OffImg = 'assets/icons/noCC.png';
    if (this.source.textTracks[0].mode == 'hidden') {
        this.showCC = true;
        this.source.textTracks[0].mode = 'showing';
        this.buttonCCIcon.src = OffImg;
    } else {
        this.showCC = false;
        this.source.textTracks[0].mode = 'hidden';
        this.buttonCCIcon.src = OnImg;
    }
};

Video.prototype.isFullScreen = function () {
    return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
};

Video.prototype.setFullscreenData = function (state) {
    this.videoContainer.setAttribute('data-fullscreen', !!state);
};

Video.prototype.goFullScreen = function () {
    if (this.isFullScreen()) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        this.setFullscreenData(false);
    }
    else {
        if (this.videoContainer.requestFullscreen) this.videoContainer.requestFullscreen();
        else if (this.videoContainer.mozRequestFullScreen) this.videoContainer.mozRequestFullScreen();
        else if (this.videoContainer.webkitRequestFullScreen) this.videoContainer.webkitRequestFullScreen();
        else if (this.videoContainer.msRequestFullscreen) this.videoContainer.msRequestFullscreen();
        this.setFullscreenData(true);
    }
};

Video.prototype.setVolume = function (event) {
    var mouseLocation = event.offsetY;
    var containerHeight = this.gainBar.offsetHeight;
    var position = mouseLocation / containerHeight;
    var percentVolume = Math.round(position * 100) + "%";
    this.gainBarLevel.setAttribute("style", "height: " + percentVolume);
    position = 1 - position;
    this.source.volume = position;
};

Video.prototype.showGainControl = function () {
    if (this.gainControl.style.display === "block") {
        this.gainControl.style.display = "none";
    } else {
        this.gainControl.style.display = "block";
    }
};

Video.prototype.speedVideo = function () {
    var fullMotionImg = 'assets/icons/full_motion.png';
    var slowMotionImg = 'assets/icons/slow_motion.png';
    if (this.source.playbackRate == 1) {
        this.source.playbackRate = 0.5;
        this.buttonSpeedIcon.src = slowMotionImg;
    } else {
        this.source.playbackRate = 1;
        this.buttonSpeedIcon.src = fullMotionImg;
    }
};

Video.prototype.muteVideo = function () {
    var volOnImg = 'assets/icons/volume-on-icon.png';
    var volOffImg = 'assets/icons/volume-off-icon.png';
    this.source.muted = !this.source.muted;
    this.toggleButton(this.source.muted, this.buttonMuteIcon, volOnImg, volOffImg);
    console.log(this.source.muted);
    if (this.source.muted) {
        this.gainBarLevel.setAttribute("style", "height: 100%");
    } else {
        var percentVolume = Math.round(this.source.volume * 100) + "%";
        this.gainBarLevel.setAttribute("style", "height: " + percentVolume);
    }
};

Video.prototype.toggleButton = function (button, element, onIcon, offIcon) {
    var onImg = onIcon;
    var offImg = offIcon;
    var button = button;
    button = !button;
    if (button) {
        element.src = onImg;
    } else {
        element.src = offImg;
    }
};

Video.prototype.play = function () {
    this.source.play();
};

Video.prototype.playPauseVideo = function () {
    if (this.source.paused || this.source.ended) {
        this.source.play();
        this.buttonPlayIcon.src = "assets/icons/pause-icon.png";

        // Note: Safari fix. When video play Safari appears to reset the captions vtt
        // to "showing". So this method prevents that if captions are turned off
        if (this.showCC === false) {
            for (var i = 0; i < this.source.textTracks.length; i++) {
                this.source.textTracks[i].mode = 'hidden';
            }
        }
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
    this.updateCaptions();
    this.checkVideoEnd();
};

Video.prototype.checkVideoEnd = function () {
    if (this.source.ended) {
        this.progressBar.setAttribute("style", "Width: 100%");
        this.buttonPlayIcon.src = "assets/icons/play-icon.png";
    }
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

Video.prototype.setDuration = function () {
    this.startTime.innerText = this.niceTime(this.source.currentTime);
    if (!isNaN(this.source.duration)) {
        this.endTime.innerText = this.niceTime(this.source.duration);
    } else {
        this.endTime.innerText = "???";
    }
};

function convertTimeString(time) {
    var result;
    var hours = parseInt(time.substr(0, 2));
    var minutes = parseInt(time.substr(3, 2));
    var seconds = parseInt(time.substr(6, 2));
    var milliseconds = parseInt(time.substr(9, 3));
    result = (hours * 3600) + (minutes * 60) + seconds + (milliseconds * 0.001);
    return result;
}

Video.prototype.updateCaptions = function () {
    var time = this.source.currentTime;
    if (this.captions.length > 0) {
        for (var i = 0; i < this.captions.length; i++) {
            var startTime = convertTimeString(this.captions[i].dataset.timeStart);
            var endTime = convertTimeString(this.captions[i].dataset.timeEnd);
            if (time >= startTime && time < endTime) {
                this.captions[i].className = "caption-highlighted";
                this.captions[i] = "caption-highlighted";
            } else {
                this.captions[i].className = "";
            }
        }
    }
};

Video.prototype.bindCaptions = function () {
    var self = this;
    if (this.captions.length > 0) {
        for (var i = 0; i < this.captions.length; i++) {
            this.captions[i].addEventListener("click", function (event) {
                self.source.currentTime = convertTimeString(this.dataset.timeStart);
            });
        }
    }
};

Video.prototype.checkCaptions = function () {
    this.preventCCByDefault();
    var tracks = this.source.textTracks;
    if (tracks.length > 0) {
        this.buttonCC.style.display = "block";
        for (var i = 0; i < this.source.textTracks.length; i++) {
            for (var a = 0; a < tracks[i].cues.length; a++) {
                tracks[i].cues[a].line = -4;
            }
        }
    }
};

Video.prototype.preventCCByDefault = function () {
    for (var i = 0; i < this.source.textTracks.length; i++) {
        this.source.textTracks[i].mode = 'hidden';
    }
};

Video.prototype.init = function () {
    this.source.controls = false;
    this.setDuration();
    this.setButtonEvents();
    this.setTimingEvents();
    this.checkCaptions();
};

Video.prototype.updateTime = function () {
    this.startTime.innerText = this.niceTime(this.source.currentTime);
};

RBA_Videoplayer.video = new Video();