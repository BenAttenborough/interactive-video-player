/**
 * Created by ben on 14/07/2016.
 */

////Start converting this into OOP project
//var VideoPlayer = function (videoInterface, source, buttons, playButton, muteButton, fullscreenButton) {
//    this.videoController = videoInterface;
//    this.source = source;
//    this.buttons = buttons;
//    this.playButton = playButton;
//    this.muteButton = muteButton;
//    this.fullscreenButton = fullscreenButton;
//};
//
//VideoPlayer.prototype.welcomeMsg = function () {
//    console.log("Video player object initialised");
//};
//
//VideoPlayer.prototype.removeDefaultControls = function () {
//    this.source.controls = false;
//};
//
//VideoPlayer.prototype.setupButtons = function () {
//    var self = this;
//    this.playButton.addEventListener('click', function (event) {
//        self.playPauseVideo();
//    })
//    this.muteButton.addEventListener('click', function (event) {
//        self.muteUnmute();
//    })
//};
//
//VideoPlayer.prototype.playPauseVideo = function () {
//    if (this.source.paused || this.source.ended) {
//
//        // First pause all videos
//        for (i = 0; i < videoWindows.length; i++) {
//            videoPlayerList[i].source.pause();
//            videoPlayerList[i].playButton.innerHTML = '<img src="assets/icons/play-icon.png">';
//            ;
//        }
//
//        this.source.play();
//        this.playButton.innerHTML = '<img src="assets/icons/pause-icon.png">';
//    }
//    else {
//        this.source.pause();
//        this.playButton.innerHTML = '<img src="assets/icons/play-icon.png">';
//    }
//};
//
//VideoPlayer.prototype.muteUnmute = function () {
//    this.source.muted = !this.source.muted;
//    if (this.source.muted) {
//        this.muteButton.innerHTML = '<img src="assets/icons/volume-off-icon.png">';
//    } else {
//        this.muteButton.innerHTML = '<img src="assets/icons/volume-on-icon.png">';
//    }
//};
//
//VideoPlayer.prototype.niceTime = function (time) {
//    var roundedTime = Math.round(time);
//    var hours = parseInt(roundedTime / 3600) % 24;
//    var minutes = parseInt(roundedTime / 60) % 60;
//    var seconds = roundedTime % 60;
//    var niceTime = (hours === 0 ? "" : ( (hours < 10 ? "0" + hours : hours) + ":") ) + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
//    return niceTime;
//};
//
//VideoPlayer.prototype.addTimers = function () {
//    var endTime = this.niceTime(this.source.seekable.end(0));
//    var node = document.createElement("p");
//    var textnode = document.createTextNode(endTime);
//    node.appendChild(textnode);
//    this.buttons.appendChild(node);
//
//    var currentTime = this.getCurrentVideoTime();
//    currentTimeNode = document.createElement("p");
//    currentTimeNode.setAttribute("class", "starttime");
//    currentTimeText = document.createTextNode("00:00/");
//    currentTimeNode.appendChild(currentTimeText);
//    this.buttons.appendChild(currentTimeNode);
//};
//
//VideoPlayer.prototype.getCurrentVideoTime = function () {
//    var starttimeElement = document.getElementsByClassName("starttime");
//    starttimeElement = starttimeElement[this.playerNumber];
//    var self = this;
//    this.source.addEventListener('timeupdate', function () {
//        for (var i = 0; i < self.videoController.childNodes.length; i++) {
//            if (self.buttons.childNodes[i].className == "starttime") {
//                self.buttons.childNodes[i].innerHTML = self.niceTime(self.source.played.end(0)) + "/";
//                break;
//            }
//        }
//    })
//};
//
//VideoPlayer.prototype.init = function () {
//    this.removeDefaultControls();
//    this.setupButtons();
//    this.addTimers();
//    this.getCurrentVideoTime();
//};
//
////build array of video objects
//var videoInterfaceElements = document.getElementsByClassName('video-controllers');
//var videoSourceElements = document.getElementsByClassName('source');
//var videoButtons = document.getElementsByClassName('buttons');
//var videoPlayButtonElements = document.getElementsByClassName('play');
//var videoMuteButtonElements = document.getElementsByClassName('mute');
//var videoFullscreenButtonElements = document.getElementsByClassName('fullscreen');
//
//videoPlayerList = [];
//
//videoWindows = document.getElementsByClassName("videoWindow");
//
//if (videoWindows.length > 0) {
//    for (i = 0; i < videoWindows.length; i++) {
//        var videoPlayer = new VideoPlayer(videoInterfaceElements[i], videoSourceElements[i], videoButtons[i], videoPlayButtonElements[i], videoMuteButtonElements[i], videoFullscreenButtonElements[i]);
//        videoPlayerList.push(videoPlayer);
//        //videoPlayerList[i].init();
//    }
//}

// Experimental player

var VideoPlayer = function (videoContainer, source, playerNumber) {
    this.videoContainer = videoContainer;
    this.source = source;
    this.playerNumber = playerNumber;

    this.interface = null;
    this.progContainer = null;
    this.progBar = null;
    this.buttons = null;
    this.playButton = null;
    this.muteButton = null;
    this.fullscreenButton = null;
};

VideoPlayer.prototype.removeDefaultControls = function () {
    this.source.controls = false;
};

VideoPlayer.prototype.constructInterface = function () {
    var interfaceNode = document.createElement("div");
    interfaceNode.className = "video__interface";

    var progNode = document.createElement("div");
    progNode.className = "progContainer";

    var progBarNode  = document.createElement("div");
    progBarNode.className = "progContainer__bar";

    var buttonsNode = document.createElement("div");
    buttonsNode.className = "buttons";

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

    interfaceNode.appendChild(progNode);
        progNode.appendChild(progBarNode);
    interfaceNode.appendChild(buttonsNode);
        buttonsNode.appendChild(playNode);
            playNode.appendChild(playIconNode);
        buttonsNode.appendChild(muteNode);
            muteNode.appendChild(muteIconNode);
        buttonsNode.appendChild(fullscreenNode);
            fullscreenNode.appendChild(fullscreenIconNode);

    this.videoContainer.appendChild(interfaceNode);
};

VideoPlayer.prototype.setMemberVariables = function () {
    var videoInterfaceElements = document.getElementsByClassName('video__interface');
    var videoProgContainerElements = document.getElementsByClassName('progContainer');
    var videoProgContainer__barElements = document.getElementsByClassName('progContainer__bar');
    var videoButtonsElements = document.getElementsByClassName('buttons');
    var videoPlayElements = document.getElementsByClassName('buttons__play');
    var videoMuteElements = document.getElementsByClassName('buttons__mute');
    var videoFullscreenElements = document.getElementsByClassName('buttons__fullscreen');

    this.interface = videoInterfaceElements[this.playerNumber];
    this.progContainer = videoProgContainerElements[this.playerNumber];
    this.progBar = videoProgContainer__barElements[this.playerNumber];
    this.buttons = videoButtonsElements[this.playerNumber];
    this.playButton = videoPlayElements[this.playerNumber];
    this.muteButton = videoMuteElements[this.playerNumber];
    this.fullscreenButton = videoFullscreenElements[this.playerNumber];
};

function buildInterfaces() {
    var videoSource = document.getElementsByClassName('video__source');

    videoContainer = document.getElementsByClassName("video");

    videoConstructionList = [];


    if (videoContainer.length > 0) {
        for (i = 0; i < videoContainer.length; i++) {
            var videoPlayer = new VideoPlayer(videoContainer[i], videoSource[i], i);
            videoConstructionList.push(videoPlayer);
            videoConstructionList[i].removeDefaultControls();
            videoConstructionList[i].constructInterface();
            videoConstructionList[i].setMemberVariables();
            console.log("Interface " + i);
            console.log(videoPlayer);
        }
    }
}

var VideoPlayerInterface = function ( videoElements ) {
    this.container = videoElements.container;
    this.source = videoElements.source;
    this.interface = videoElements.interface;
    this.progContainer = videoElements.progContainer;
    this.progBar = videoElements.progBar;
    this.buttons = videoElements.buttons;
    this.playButton = videoElements.playButton;
    this.muteButton = videoElements.muteButton;
    this.fullscreenButton = videoElements.fullscreenButton;
};

VideoPlayerInterface.prototype.playPauseVideo = function () {
    if (this.source.paused || this.source.ended) {

        // First pause all videos
        for (i = 0; i < videoPlayers.length; i++) {
            videoPlayers[i].source.pause();
            videoPlayers[i].playButton.innerHTML = '<img src="assets/icons/play-icon.png">';
        }

        this.source.play();
        this.playButton.innerHTML = '<img src="assets/icons/pause-icon.png">';
    }
    else {
        this.source.pause();
        this.playButton.innerHTML = '<img src="assets/icons/play-icon.png">';
    }
};

VideoPlayerInterface.prototype.muteUnmute = function () {
    this.source.muted = !this.source.muted;
    if (this.source.muted) {
        this.muteButton.innerHTML = '<img src="assets/icons/volume-off-icon.png">';
    } else {
        this.muteButton.innerHTML = '<img src="assets/icons/volume-on-icon.png">';
    }
};

VideoPlayerInterface.prototype.init = function () {
    console.log("Video interface object initialised");
    var self = this;
    this.playButton.addEventListener('click', function (event) {
        self.playPauseVideo();
    });
    this.muteButton.addEventListener('click', function (event) {
        self.muteUnmute();
    });
};

function addVideoFunctionality() {


    //Need data structure to contain all of below for each element

    var videoContainerElements = document.getElementsByClassName("video");
    var videoSourceElements = document.getElementsByClassName('video__source');
    var videoInterfaceElements = document.getElementsByClassName('video__interface');
    var videoProgContainerElements = document.getElementsByClassName('progContainer');
    var videoProgContainer__barElements = document.getElementsByClassName('progContainer__bar');
    var videoButtonsElements = document.getElementsByClassName('buttons');
    var videoPlayElements = document.getElementsByClassName('buttons__play');
    var videoMuteElements = document.getElementsByClassName('buttons__mute');
    var videoFullscreenElements = document.getElementsByClassName('buttons__fullscreen');

    videoPlayers = [];

    if (videoContainer.length > 0) {
        for (i = 0; i < videoContainer.length; i++) {

            var videoElements = {
                "container" : videoContainerElements[i],
                "source" : videoSourceElements[i],
                "interface" : videoInterfaceElements[i],
                "progContainer" : videoProgContainerElements[i],
                "progBar" : videoProgContainer__barElements[i],
                "buttons" : videoButtonsElements[i],
                "playButton" : videoPlayElements[i],
                "muteButton" : videoMuteElements[i],
                "fullscreenButton" : videoFullscreenElements[i]
            }
            console.log(videoElements);


            var videoPlayerInterface = new VideoPlayerInterface( videoElements );
            videoPlayers.push(videoPlayerInterface);

            videoPlayerInterface.init();
            //var videoPlayer2 = new VideoPlayer(videoContainer[i], videoSource[i]);
            //videoConstructionList.push(videoPlayer2);
            //videoConstructionList[i].removeDefaultControls();
            //videoConstructionList[i].constructInterface();
        }
    }

}

buildInterfaces();
//addVideoFunctionality();