var scrolled = false;
var x = 100;
$(window).scroll(function(){
    
    var scrollY = $(window).scrollTop();
    if (scrollY > x && scrolled == false) {
        // sticked to bottom
        $("#naviBar").animate({paddingTop:"0",paddingBottom:"0",width:"90%"});
        $("#naviBar").css({"border-radius":"2px 2px"});
        $("#naviBar").css({"opacity":"0.7"});
        $("li a").css({"border-radius":"2px 2px"});
        scrolled = true;
    } else if (scrollY < x && scrolled == true) {
        //floating in the bottom
        $("#naviBar").animate({paddingTop:"5px",paddingBottom:"5px",width:"70%"});
        $("#naviBar").css({"border-radius":"15px 2px"});
        $("#naviBar").css({"opacity":"1"});
        $("li a").css({"border-radius":"15px 2px"});
        scrolled = false;
    }
    //console.log(scrollY + " px" + " " + scrolled);
});

//js to show apod
//var show_apod_btn = document.getElementById("show_apod_btn");

function show_apod () {
    var apod_container = document.getElementById("apod_container");
    apod_container.style.display = "block";
}
