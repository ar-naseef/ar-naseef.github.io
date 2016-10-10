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

var json_array = [];

function showApod() {
    var apod_title = document.getElementById("apod_title");
    apod_title.innerHTML = "<h2>LOADING...</h2>";
    getContents();
    var apod_container = document.getElementById("apod_container");
    apod_container.style.display = "block";
}

function getContents() {

    var xmlreq = new XMLHttpRequest();
    xmlreq.open("GET", "https://api.nasa.gov/planetary/apod?api_key=EeJZi2jrsbbR96g169oVfq4f788ZrUEQBy9hu27R", true);
    //&date=2016-10-09
    
    xmlreq.responseText = 'text';
    
    xmlreq.onreadystatechange = function () {
        //request is done?
        if (xmlreq.readyState === xmlreq.DONE) {
            //if the response is 200
            if (xmlreq.status === 200) {
                //process data
                
                var raw_res = xmlreq.responseText;
                json_array = JSON.parse(raw_res);
                //console.log(json_array);
                if (json_array["media_type"] == "image" ) {
                    //set title
                    var apod_title = document.getElementById("apod_title");
                    apod_title.innerHTML = json_array["title"];

                    //set img
                    var apod_img = document.getElementById("apod_img");
                    apod_img.style.display = "inherit";
                    apod_img.src = json_array["url"];

                    //ser brief exp
                    var apod_brief = document.getElementById("apod_brief");
                    apod_brief.innerHTML = json_array["explanation"];

                    //set date
                    var apod_date = document.getElementById("apod_date");
                    apod_date.innerHTML = "date : " + json_array["date"];
                } else {
                    //set title
                    var apod_title = document.getElementById("apod_title");
                    apod_title.innerHTML = json_array["title"] + "<br/><br/><br/><h4>media doesn't support..</h4>";

//                    //set img
//                    var apod_img = document.getElementById("apod_img");
//                    apod_img.style.display = "inherit";
//                    apod_img.src = json_array["url"];
                    

                    //ser brief exp
                    var apod_brief = document.getElementById("apod_brief");
                    apod_brief.innerHTML = json_array["explanation"];

                    //set date
                    var apod_date = document.getElementById("apod_date");
                    apod_date.innerHTML = "date : " + json_array["date"];
                }
                
            } else {
                //something went wrong
                //check internet connection
                var apod_title = document.getElementById("apod_title");
                apod_title.innerHTML = "<h3>check your internet connection..!</h3>";
            }
        } else {
            //loading
            console.log("loading");
        }
    };
    
    xmlreq.send(null);

}







