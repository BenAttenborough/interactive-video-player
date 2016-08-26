/**
 * Created by ben on 14/07/2016.
 */

var VideoPlayer = function (videoContainer, source, captions, playerNumber) {
    this.videoContainer = videoContainer;
    this.source = source;
    this.captions = captions.getElementsByTagName('p');
    this.playerNumber = playerNumber;
    this.videoDurration = this.source.seekable.end(0);
    this.videoCurrentTime = 0;
    this.interface = null;
    this.progContainer = null;
    this.progBar = null;
    this.buttons = null;
    this.playButton = null;
    this.speedButton = null;
    this.captionButton = null;
    this.muteButton = null;
    this.muteButtonIcon = null;
    this.volumeContainer = null;
    this.volumeBar = null;
    this.volumeLevel = null;
    this.fullscreenButton = null;
    this.currentTime = null;
    this.endTime = null;
};

VideoPlayer.prototype.removeDefaultControls = function () {
    this.source.controls = false;
};

VideoPlayer.prototype.hideCaptions = function () {
    for (var i = 0; i < this.source.textTracks.length; i++) {
        this.source.textTracks[i].mode = 'hidden';
    }
};

VideoPlayer.prototype.createButton = function (className, imgURL) {
    var buttonNode = document.createElement("div");
    className = "buttons__" + className;
    buttonNode.className = className;
    var iconNode = document.createElement("img");
    iconNode.setAttribute("src", imgURL);
    buttonNode.appendChild(iconNode);
    return buttonNode;
};

VideoPlayer.prototype.constructInterface = function () {
    var interfaceNode = document.createElement("div");
    interfaceNode.className = "video__interface";
    var progNode = document.createElement("div");
    progNode.className = "progContainer";
    var progBarInner = document.createElement("div");
    progBarInner.className = "progContainer__inner";
    var progBarInnerEmpty = document.createElement("div");
    progBarInnerEmpty.className = "progContainer__inner_empty";
    var progBarNode = document.createElement("div");
    progBarNode.className = "progContainer__bar";
    var buttonsNode = document.createElement("div");
    buttonsNode.className = "buttons";
    var timeNode = document.createElement("div");
    timeNode.className = "buttons__timeContainer";
    var muteNode = document.createElement("div");
    muteNode.className = "buttons__mute";
    var volumeNode = document.createElement("div");
    volumeNode.className = "buttons__volume";
    var volumeInner = document.createElement("div");
    volumeInner.className = "volume__inner";
    var volumeInnerEmpty = document.createElement("div");
    volumeInnerEmpty.className = "volume__inner_empty";
    var volumeInnerBar = document.createElement("div");
    volumeInnerBar.className = "volume__inner_bar";
    var fullscreenNode = document.createElement("div");
    fullscreenNode.className = "buttons__fullscreen";
    var captionsNode = document.createElement("div");
    captionsNode.className = "buttons__captions";
    var captionsNodeSelectBox = document.createElement("div");
    captionsNodeSelectBox.className = "buttons__captions_select";

    //Add icons to buttons
    var muteIconNode = document.createElement("img");
    muteIconNode.setAttribute('src', 'assets/icons/volume-on-icon.png');
    muteIconNode.className = "buttons__mute_img";
    var fullscreenIconNode = document.createElement("img");
    fullscreenIconNode.setAttribute('src', 'assets/icons/fullscreen-icon.png');
    var captionsIconNode = document.createElement("img");
    captionsIconNode.setAttribute('src', 'assets/icons/closed_caption.png');
    var halfSpeedIconNode = document.createElement("img");
    halfSpeedIconNode.setAttribute('src', 'assets/icons/slow_motion.png')

    timeNode.innerHTML = "<span class='currentTime'></span><span class='endTime'></span>"

    interfaceNode.appendChild(progNode);
    progNode.appendChild(progBarInner);
    progBarInner.appendChild(progBarInnerEmpty);
    progBarInnerEmpty.appendChild(progBarNode);

    //Buttons container
    interfaceNode.appendChild(buttonsNode);
    var playButton = this.createButton("play", "assets/icons/play-icon.png");
    buttonsNode.appendChild(playButton);


    buttonsNode.appendChild(timeNode);
    buttonsNode.appendChild(muteNode);
    muteNode.appendChild(volumeNode);
    volumeNode.appendChild(volumeInner);
    volumeInner.appendChild(volumeInnerEmpty);
    volumeInnerEmpty.appendChild(volumeInnerBar);
    muteNode.appendChild(muteIconNode);
    buttonsNode.appendChild(fullscreenNode);
    fullscreenNode.appendChild(fullscreenIconNode);
    buttonsNode.appendChild(captionsNode);
    //captionsNode.appendChild(captionsNodeSelectBox);
    captionsNode.appendChild(captionsIconNode);
    buttonsNode.appendChild(captionsNode);
    var speedButton = this.createButton("speed", "assets/icons/slow_motion.png");
    buttonsNode.appendChild(speedButton);

    this.videoContainer.appendChild(interfaceNode);
};

VideoPlayer.prototype.setMemberVariables = function () {
    var videoInterfaceElements = document.getElementsByClassName('video__interface');
    var videoProgContainerElements = document.getElementsByClassName('progContainer');
    var videoProgContainer__barElements = document.getElementsByClassName('progContainer__bar');
    var videoButtonsElements = document.getElementsByClassName('buttons');
    var videoPlayElements = document.getElementsByClassName('buttons__play');
    var videoMuteElements = document.getElementsByClassName('buttons__mute');
    var videoMuteIcons = document.getElementsByClassName('buttons__mute_img');
    var videoVolumeContainers = document.getElementsByClassName('buttons__volume');
    var videoVolumeBars = document.getElementsByClassName('volume__inner');
    var videoVolumeLevels = document.getElementsByClassName('volume__inner_empty');
    var videoCaptionButtons = document.getElementsByClassName('buttons__captions');
    var videoFullscreenElements = document.getElementsByClassName('buttons__fullscreen');
    var videoCurrentTimeElements = document.getElementsByClassName('currentTime');
    var videoEndTimeElements = document.getElementsByClassName('endTime');
    var videoSpeedElements = document.getElementsByClassName('buttons__speed');

    this.interface = videoInterfaceElements[this.playerNumber];
    this.progContainer = videoProgContainerElements[this.playerNumber];
    this.volumeContainer = videoVolumeContainers[this.playerNumber];
    this.volumeBar = videoVolumeBars[this.playerNumber];
    this.volumeLevel = videoVolumeLevels[this.playerNumber];
    this.progBar = videoProgContainer__barElements[this.playerNumber];
    this.buttons = videoButtonsElements[this.playerNumber];
    this.playButton = videoPlayElements[this.playerNumber];
    this.muteButton = videoMuteElements[this.playerNumber];
    this.muteButtonIcon = videoMuteIcons[this.playerNumber];
    this.fullscreenButton = videoFullscreenElements[this.playerNumber];
    this.currentTime = videoCurrentTimeElements[this.playerNumber];
    this.endTime = videoEndTimeElements[this.playerNumber];
    this.captionButton = videoCaptionButtons[this.playerNumber];
    this.speedButton = videoSpeedElements[this.playerNumber];
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
    var volOnImg = 'assets/icons/volume-on-icon.png';
    var volOffImg = 'assets/icons/volume-off-icon.png';
    this.source.muted = !this.source.muted;
    var self = this;
    if (this.source.muted) {
        self.muteButtonIcon.src = volOffImg;
        console.log('Volume off');
    } else {
        self.muteButtonIcon.src = volOnImg;
        console.log('Volume on');
    }
};

VideoPlayer.prototype.setVolume = function () {
    var videoDiv = this.videoContainer;
    var videoInterface = this.interface;
    var volumeBar = this.volumeBar;
    var self = this;

    this.volumeBar.addEventListener('click', function (event) {

        var volContainerOffset = (event.pageY - ( videoInterface.offsetTop + videoDiv.offsetTop) ) + volumeBar.offsetHeight;

        if (self.isFullScreen()) {
            volContainerOffset += 16;
        }

        var position = volContainerOffset / this.offsetHeight;
        position = 1 - position;
        var visualPosition = Math.floor(position * 100);
        visualPosition = 100 - visualPosition;
        
        self.volumeLevel.setAttribute('style', 'height: ' + visualPosition + '%');
        self.source.volume = position;
    })
};

VideoPlayer.prototype.setupButtons = function () {
    var self = this;
    this.playButton.addEventListener('click', function (event) {
        self.playPauseVideo();
    });
    this.muteButtonIcon.addEventListener('click', function (event) {
        self.muteUnmute();
    });
    this.muteButton.addEventListener('mouseenter', function (event) {
        self.showVolume();
    });
    this.muteButton.addEventListener('mouseleave', function (event) {
        self.hideVolume();
    });
    this.captionButton.addEventListener('click', function (event) {
        for (var i = 0; i < self.source.textTracks.length; i++) {
            if (self.source.textTracks[i].mode == 'hidden') {
                self.source.textTracks[i].mode = 'showing';
            } else {
                self.source.textTracks[i].mode = 'hidden';
            }
        }
    });
    this.speedButton.addEventListener('click', function (event) {
        self.controlSpeed();
    });

    // Check if full screen is supported by browser. If it isn't hide the full screen button
    var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
    if (!fullScreenEnabled) {
        self.fullscreenButton.style.display = 'none';
    } else {
        self.fullscreenButton.addEventListener('click', function (event) {
            self.goFullscreen();
        });
    }


};

VideoPlayer.prototype.isFullScreen = function() {
    return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
};

VideoPlayer.prototype.setFullscreenData = function(state) {
    this.videoContainer.setAttribute('data-fullscreen', !!state);
};

VideoPlayer.prototype.goFullscreen = function () {
    if (this.isFullScreen()) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        this.videoContainer.style.backgroundColor = 'white';
        setFullscreenData(false);
    }
    else {

        if (this.videoContainer.requestFullscreen) this.videoContainer.requestFullscreen();
        else if (this.videoContainer.mozRequestFullScreen) this.videoContainer.mozRequestFullScreen();
        else if (this.videoContainer.webkitRequestFullScreen) this.videoContainer.webkitRequestFullScreen();
        else if (this.videoContainer.msRequestFullscreen) this.videoContainer.msRequestFullscreen();
        this.videoContainer.style.backgroundColor = 'black';
        setFullscreenData(true);
    }

};

VideoPlayer.prototype.controlSpeed = function () {
    if (this.source.playbackRate == 1) {
        this.source.playbackRate = 0.5;
        this.speedButton.innerHTML = '<img src="assets/icons/full_motion.png">';
    } else {
        this.source.playbackRate = 1;
        this.speedButton.innerHTML = '<img src="assets/icons/slow_motion.png">';
    }
};

VideoPlayer.prototype.showVolume = function () {
    this.volumeContainer.style.display = 'block';
};

VideoPlayer.prototype.hideVolume = function () {
    this.volumeContainer.style.display = 'none';
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
    this.currentTime.textContent = currentTime;
};

VideoPlayer.prototype.updateVideoStatus = function () {
    var self = this;
    endTime = this.source.seekable.end(0);
    this.source.addEventListener('timeupdate', function () {
        self.videoCurrentTime = Math.floor(self.source.currentTime);
        //Call a function to check which caption to highlight
        self.highlightCaption(self.source.currentTime);
        //Update time display
        self.currentTime.textContent = self.niceTime(self.videoCurrentTime) + "/";
        percentComplete = Math.floor(( self.videoCurrentTime / endTime ) * 100) + "%";

        console.log( self.source.ended);
        //Update progress bar
        self.progBar.setAttribute("style", "width: " + percentComplete);
        //Check if video has ended and if so reset buttons
        if (self.source.ended) {
            self.resetVideo();
        }
    })
};

VideoPlayer.prototype.resetVideo = function () {
    this.progBar.setAttribute("style", "width: 100%");
    this.playButton.innerHTML = '<img src="assets/icons/play-icon.png">';
};


VideoPlayer.prototype.highlightCaption = function (time) {
    if (this.captions.length > 0) {
        for (var i = 0; i < this.captions.length; i++) {
            //compare time to captions data
            var startTime = convertTimeString(this.captions[i].dataset.timeStart);
            var endTime = convertTimeString(this.captions[i].dataset.timeEnd);
            if (time >= startTime && time <= endTime ) {
                this.captions[i].className = "caption-highlighted";
            } else {
                this.captions[i].className = "";
            }
        }
    }
};

VideoPlayer.prototype.skipToLocation = function () {
    var videoDiv = this.videoContainer;
    var self = this;
    this.progContainer.addEventListener('click', function (event) {
        if (self.isFullScreen()) {
            var progContainerOffset = event.pageX - this.offsetLeft;
        } else {
            var progContainerOffset = event.pageX - (this.offsetLeft + videoDiv.offsetLeft);
        }
        var position = progContainerOffset / this.offsetWidth;
        self.source.currentTime = position * self.videoDurration;
        console.log('event.pageX ' + event.pageX);
        console.log('this.offsetLeft ' + this.offsetLeft);
        console.log('event.videoDiv.offsetLeft ' + videoDiv.offsetLeft);
        console.log('progContainerOffset ' + progContainerOffset);
        console.log('Divided by ');
        console.log('this.offsetWidth ' + this.offsetWidth);
        console.log('position ' + position);
    });
};

VideoPlayer.prototype.captionSkipBinding = function () {
    var self= this;
    for (var i = 0; i < this.captions.length; i++) {
        //console.log(i);
        //Something wrong here i = i on last loop for some reason
        this.captions[i].addEventListener('click', function (event) {
            //console.log("Caption " + i + " clicked");
            //console.log("Start time = " + this.dataset.timeStart);
            self.source.currentTime = convertTimeString(this.dataset.timeStart);
        });
    }
};

VideoPlayer.prototype.init = function () {
    this.removeDefaultControls();
    this.hideCaptions();
    this.constructInterface();
    this.setMemberVariables();
    this.setupButtons();
    this.addTimers();
    this.updateVideoStatus();
    this.skipToLocation();
    this.captionSkipBinding();
    this.setVolume();
};

function createVideoPlayers() {
    var videoSource = document.getElementsByClassName('video__source');
    var videoContainer = document.getElementsByClassName('video');
    var videoCaptions = document.getElementsByClassName('video-caption');
    videoPlayerList = [];

    if (videoContainer.length > 0) {
        for (i = 0; i < videoContainer.length; i++) {
            //console.log("Item number: " + i);
            //console.log("Captions length: " + videoCaptions.length);
            //console.log(videoCaptions[i].getElementsByTagName('p'));
            var videoPlayer = new VideoPlayer(videoContainer[i], videoSource[i], videoCaptions[i], i);
            videoPlayer.init();
            videoPlayerList.push(videoPlayer);
        }
    }
}

function convertTimeString(time) {
    var result;
    var hours = parseInt(time.substr(0, 2));
    var minutes = parseInt(time.substr(3, 2));
    var seconds = parseInt(time.substr(6, 2));
    var milliseconds = parseInt(time.substr(9, 3));
    result = (hours * 3600) + (minutes * 60) + seconds + (milliseconds * 0.001);
    return result;
}

createVideoPlayers();