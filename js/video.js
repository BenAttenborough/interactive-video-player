/**
 * Created by ben on 14/07/2016.
 */

//Start converting this into OOP project
var VideoPlayer = function (videoInterface, source, playButton, muteButton, fullscreenButton) {
    this.videoController = videoInterface;
    this.source = source;
    this.playButton = playButton;
    this.muteButton = muteButton;
    this.fullscreenButton = fullscreenButton;
};

VideoPlayer.prototype.welcomeMsg = function () {
    console.log("Video player object initialised");
};

VideoPlayer.prototype.removeDefaultControls = function () {
    this.source.controls = false;
};

VideoPlayer.prototype.setupButtons = function () {
    var self = this;
    this.playButton.addEventListener('click', function (event) {
        self.playPauseVideo();
    })
    this.muteButton.addEventListener('click', function (event) {
        self.muteUnmute();
    })
};

VideoPlayer.prototype.playPauseVideo = function () {
    if (this.source.paused || this.source.ended) {

        // First pause all videos
        for (i = 0; i < videoWindows.length; i++) {
            videoPlayerList[i].source.pause();
            videoPlayerList[i].playButton.innerHTML = '<img src="assets/icons/play-icon.png">';
            ;
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

VideoPlayer.prototype.addTimers = function () {
    var endTime = this.source.seekable.end(0);
    var node = document.createElement("p");
    var textnode = document.createTextNode(endTime);
    node.appendChild(textnode);
    this.videoController.appendChild(node);

    var currentTime = this.getCurrentVideoTime();
    currentTimeNode = document.createElement("p");
    currentTimeNode.setAttribute("class", "starttime");
    currentTimeText = document.createTextNode("00:00:00");
    currentTimeNode.appendChild(currentTimeText);
    this.videoController.appendChild(currentTimeNode);
}

VideoPlayer.prototype.getCurrentVideoTime = function () {
    var starttimeElement = document.getElementsByClassName("starttime");
    starttimeElement = starttimeElement[this.playerNumber];
    var self = this;
    this.source.addEventListener('timeupdate', function() {
        for (var i = 0; i < self.videoController.childNodes.length; i++) {
            if (self.videoController.childNodes[i].className == "starttime") {
                self.videoController.childNodes[i].innerHTML = self.source.played.end(0) + " /";
                break;
            }
        }
    })
}

VideoPlayer.prototype.init = function () {
    this.removeDefaultControls();
    this.setupButtons();
    this.addTimers();
    this.getCurrentVideoTime();
};

//build array of video objects
var videoInterfaceElements = document.getElementsByClassName('video-controllers');
var videoSourceElements = document.getElementsByClassName('source');
var videoPlayButtonElements = document.getElementsByClassName('play');
var videoMuteButtonElements = document.getElementsByClassName('mute');
var videoFullscreenButtonElements = document.getElementsByClassName('fullscreen');

videoPlayerList = [];

videoWindows = document.getElementsByClassName("videoWindow");

if (videoWindows.length > 0) {
    for (i = 0; i < videoWindows.length; i++) {
        var videoPlayer = new VideoPlayer(videoInterfaceElements[i], videoSourceElements[i], videoPlayButtonElements[i], videoMuteButtonElements[i], videoFullscreenButtonElements[i]);
        videoPlayerList.push(videoPlayer);
        videoPlayerList[i].init();
    }
}