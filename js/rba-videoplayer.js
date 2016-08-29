/**
 * Created by ben on 29/08/2016.
 */



// global namespace
var RBA_Videoplayer = RBA_Videoplayer || {};

var Video = function () {
    var author = "Ben Attenborough";

    this.source = document.getElementById("video_source");

    console.log("Video player started");
    this.showAuthor = function() {
        console.log(author);
    }
};

RBA_Videoplayer.video = new Video();



