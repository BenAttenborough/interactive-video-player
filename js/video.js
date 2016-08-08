/**
 * Created by ben on 14/07/2016.
 */

var VideoPlayer = function (videoContainer, source, playerNumber) {
    this.videoContainer = videoContainer;
    this.source = source;
    this.playerNumber = playerNumber;
    this.videoDurration = this.source.seekable.end(0);
    this.videoCurrentTime = 0;

    this.interface = null;
    this.progContainer = null;
    this.progBar = null;
    this.buttons = null;
    this.playButton = null;
    this.muteButton = null;
    this.fullscreenButton = null;
    this.currentTime = null;
    this.endTime = null;
};

VideoPlayer.prototype.removeDefaultControls = function () {
    this.source.controls = false;
};

VideoPlayer.prototype.constructInterface = function () {

    var interfaceHTML =
        '<div class="video__interface"> \
            <div class="progContainer"> \
                <div class="progContainer__bar"></div> \
            </div> \
            <div class="buttons"> \
                <div class="buttons__play"> \
                    <img src="assets/icons/play-icon.png"> \
                </div> \
                <div class="buttons__timeContainer"> \
                    <span class="currentTime"></span> \
                    <span class="endTime"></span> \
                </div> \
                <div class="buttons__mute"> \
                    <img src="assets/icons/volume-on-icon.png"> \
                </div> \
                <div class="buttons__fullscreen"> \
                    <img src="assets/icons/fullscreen-icon.png"> \
                </div> \
            </div> \
        </div>';

    var interfaceNode = document.createElement("div");
    interfaceNode.className = "video__interface";

    var progNode = document.createElement("div");
    progNode.className = "progContainer";

    var progBarNode  = document.createElement("div");
    progBarNode.className = "progContainer__bar";

    var buttonsNode = document.createElement("div");
    buttonsNode.className = "buttons";

    var timeNode = document.createElement("div");
    timeNode.className = "buttons__timeContainer";

    var playNode = document.createElement("div");
    playNode.className = "buttons__play";

    var muteNode = document.createElement("div");
    muteNode.className = "buttons__mute";

    var fullscreenNode = document.createElement("div");
    fullscreenNode.className = "buttons__fullscreen";

    var playIconNode = document.createElement("img");
    playIconNode.setAttribute('src', 'assets/icons/play-icon.png');
    var muteIconNode = document.createElement("img");
    muteIconNode.setAttribute('src', 'assets/icons/volume-on-icon.png');
    var fullscreenIconNode = document.createElement("img");
    fullscreenIconNode.setAttribute('src', 'assets/icons/fullscreen-icon.png');

    timeNode.innerHTML = "<span class='currentTime'></span><span class='endTime'></span>"

    interfaceNode.appendChild(progNode);
        progNode.appendChild(progBarNode);
    interfaceNode.appendChild(buttonsNode);
        buttonsNode.appendChild(playNode);
            playNode.appendChild(playIconNode);
        buttonsNode.appendChild(timeNode);
        buttonsNode.appendChild(muteNode);
            muteNode.appendChild(muteIconNode);
        buttonsNode.appendChild(fullscreenNode);
            fullscreenNode.appendChild(fullscreenIconNode);

    this.videoContainer.appendChild(interfaceNode);



    this.videoContainer.innerHTML = interfaceHTML;
};

VideoPlayer.prototype.setMemberVariables = function () {
    var videoInterfaceElements = document.getElementsByClassName('video__interface');
    var videoProgContainerElements = document.getElementsByClassName('progContainer');
    var videoProgContainer__barElements = document.getElementsByClassName('progContainer__bar');
    var videoButtonsElements = document.getElementsByClassName('buttons');
    var videoPlayElements = document.getElementsByClassName('buttons__play');
    var videoMuteElements = document.getElementsByClassName('buttons__mute');
    var videoFullscreenElements = document.getElementsByClassName('buttons__fullscreen');
    var videoCurrentTimeElements = document.getElementsByClassName('currentTime');
    var videoEndTimeElements = document.getElementsByClassName('endTime');

    this.interface = videoInterfaceElements[this.playerNumber];
    this.progContainer = videoProgContainerElements[this.playerNumber];
    this.progBar = videoProgContainer__barElements[this.playerNumber];
    this.buttons = videoButtonsElements[this.playerNumber];
    this.playButton = videoPlayElements[this.playerNumber];
    this.muteButton = videoMuteElements[this.playerNumber];
    this.fullscreenButton = videoFullscreenElements[this.playerNumber];
    this.currentTime = videoCurrentTimeElements[this.playerNumber];
    this.endTime = videoEndTimeElements[this.playerNumber];
};

VideoPlayer.prototype.playPauseVideo = function () {
    if (this.source.paused || this.source.ended) {

        // First pause all videos
        for (i = 0; i < videoPlayerList.length; i++) {
            videoPlayerList[i].source.pause();
            videoPlayerList[i].playButton.innerHTML = '<img src="assets/icons/play-icon.png">';
        }

        this.source.play();
        this.playButton.innerHTML = '<img src="assets/icons/pause-icon.png">';
    }
    else {
        this.source.pause();
        this.playButton.innerHTML = '<img src="assets/icons/play-icon.png">';
    }
};

VideoPlayer.prototype.muteUnmute = function () {
    this.source.muted = !this.source.muted;
    if (this.source.muted) {
        this.muteButton.innerHTML = '<img src="assets/icons/volume-off-icon.png">';
    } else {
        this.muteButton.innerHTML = '<img src="assets/icons/volume-on-icon.png">';
    }
};

VideoPlayer.prototype.setupButtons = function () {
    var self = this;
    this.playButton.addEventListener('click', function (event) {
        self.playPauseVideo();
    });
    this.muteButton.addEventListener('click', function (event) {
        self.muteUnmute();
    });
};

VideoPlayer.prototype.niceTime = function (time) {
    var roundedTime = Math.round(time);
    var hours = parseInt(roundedTime / 3600) % 24;
    var minutes = parseInt(roundedTime / 60) % 60;
    var seconds = roundedTime % 60;
    var niceTime = (hours === 0 ? "" : ( (hours < 10 ? "0" + hours : hours) + ":") ) + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    return niceTime;
};

VideoPlayer.prototype.addTimers = function () {
    var endTime = this.niceTime(this.videoDurration);
    this.endTime.textContent = endTime;
    var currentTime = "00:00/";
    console.log(this.videoCurrentTime);
    this.currentTime.textContent = currentTime;
};

VideoPlayer.prototype.getCurrentVideoTime = function () {
    var self = this;
    endTime = this.source.seekable.end(0);
    this.source.addEventListener('timeupdate', function () {
        self.videoCurrentTime = Math.floor(self.source.played.end(0));
        self.currentTime.textContent = self.niceTime(self.videoCurrentTime) + "/";
        percentComplete = Math.floor ( ( self.videoCurrentTime / endTime ) * 100 ) + "%";
        console.log( percentComplete + " complete");
        self.progBar.setAttribute("style","width: " + percentComplete);
    })
};

VideoPlayer.prototype.skipToLocation = function () {
    var self = this;
    this.progContainer.addEventListener('click', function(event){
        //var position = (event.pageX  - this.offsetLeft) / this.offsetWidth;
        var position = (event.pageX  - this.offsetLeft) / this.offsetWidth;
        console.log(position);
        self.source.currentTime = position * self.videoDurration;

        //this.source.currentTime = pos * this.source.duration;
    });

};

VideoPlayer.prototype.init = function () {
    this.removeDefaultControls();
    this.constructInterface();
    this.setMemberVariables();
    this.setupButtons();
    this.addTimers();
    this.getCurrentVideoTime();
    this.skipToLocation();
};

function createVideoPlayers() {
    var videoSource = document.getElementsByClassName('video__source');
    var videoContainer = document.getElementsByClassName("video");
    videoPlayerList = [];

    if (videoContainer.length > 0) {
        for (i = 0; i < videoContainer.length; i++) {
            var videoPlayer = new VideoPlayer(videoContainer[i], videoSource[i], i);
            videoPlayer.init();
            videoPlayerList.push(videoPlayer);
        }
    }
}

createVideoPlayers();