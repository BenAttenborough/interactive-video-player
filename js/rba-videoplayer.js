/**
 * Created by ben on 29/08/2016.
 */

// global namespace
var RBA_Videoplayer = RBA_Videoplayer || {};

var Video = function () {
    this.source = document.getElementById("video_source");

    this.init();
};

Video.prototype.init = function () {
    console.log("Video player started");
    this.source.controls = false;
};

Video.prototype.play = function () {
    this.source.play();
};

RBA_Videoplayer.video = new Video();



