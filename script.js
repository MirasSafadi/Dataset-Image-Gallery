var galleryarray = new Array();
var curimage = 0;
var currentMaxImages = 20;
let imageClusterSize = 20;
var startTime = new Date().getTime();

document.onload = onLoadEventHandler;
document.onscroll = function (handler, ev) {
    var a = document.documentElement.scrollTop;
    var b = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var c = a / b;
    // if(c == 0.5){
    //     let str = '<center><div class="lds-facebook"><div></div><div></div><div></div></div></center>';
    //     $('#loader').append(str);
    // }
    if (c > 0.95) {
        // $('#loader').hide();
        currentMaxImages += imageClusterSize;
        loadImages();
    }
};


$(document).ready(function () {
    var promise = getImages();
    promise.done(function (data) {
        loadImages();
    })
});
function loadImages() {

    // $('#loader').hide();
    curimage = currentMaxImages - imageClusterSize;
    let str = '';
    if(!document.getElementById('all-images')){
        str += '<div id="all-images" class="row">';
        // $('#gallery').append('<br/><p>this is a test</p><br/>');
        for (let i = 0; i < 4 && curimage < currentMaxImages; i++) {
            str += '<div  id="col'+i+'" class="column">';
            for (let index = 0; index < imageClusterSize / 4; index++) {//iterate over rows
                // str += '<div class="row">';
                //     str += '<div class="column">';
                str += '<img loading="lazy" alt="..." src="' + galleryarray[curimage] + '" />';
                curimage++;
                //     str += '</div>';
                // str += '</div>';
            }
    
            str += '</div>';
    
        }
    
        str += '</div>';
        $('#gallery').append(str);
    }else {
        for (let i = 0; i < 4 && curimage < currentMaxImages; i++) {
            str= '';
            for (let index = 0; index < imageClusterSize / 4; index++) {//iterate over rows
                // str += '<div class="row">';
                //     str += '<div class="column">';
                str += '<img loading="lazy" alt="..." src="' + galleryarray[curimage] + '"/>';
                curimage++;
                //     str += '</div>';
                // str += '</div>';
            }
            $('#col'+i).append(str);
        }
    }
    

}



function getImages() {
    var promise = $.ajax({
        url: "photos/",
        async: false,
        success: function (data) {
            $(data).find("a:contains(.jpg)").each(function () {
                // will loop through 
                var images = $(this).attr("href");
                galleryarray[curimage] = images;
                //   alert(galleryarray[curimage]);
                curimage++;
            });

        }

    });
    return promise;
}

function onLoadEventHandler() {
    var latency = startTime - performance.timing.navigationStart;
    var latency1 = new Date().getTime() - startTime;
    console.log('Latency = ' + latency + 'ms');
    console.log('Latency1 = ' + latency1 + 'ms');
}
$(window).load(function() {
    // Animate loader off screen
    $(".se-pre-con").fadeOut(1500);;
});