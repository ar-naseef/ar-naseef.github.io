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

// jquery to scroll to a anchor in the same page
$(function() {
    //catch all the a tags
    $("a").click(function() {
        //console.log(this.hash);
        if (this.hash) {
            //remove # sighn
            var hash = this.hash.substr(1);
            
            //get the positin of a name
            var $toElement = $("a[name="+hash+"]");
            var toPosition = $toElement.position().top;
            
            var correctedToPosi = toPosition + $(window).scrollTop();
            $("body,html").animate({
                scrollTop : correctedToPosi
            },1000,"easeOutExpo")
            //console.log(toPosition +" " + $(window).scrollTop());
            return false;
        }
    });
});

//***js to show apod
//var show_apod_btn = document.getElementById("show_apod_btn");

//produce link to the apod page...

function getDate(date) {
    var hlink = "";
    var jdate = "";
    
    jdate = date.charAt(2)+date.charAt(3)+date.charAt(5)+date.charAt(6)+date.charAt(8)+date.charAt(9);
    
    hlink = "http://apod.nasa.gov/apod/ap" + jdate +".html";
    return hlink;
}


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
                    var link = getDate(json_array["date"]);
                    var apod_date = document.getElementById("apod_date");
                    apod_date.innerHTML = "date : " + json_array["date"] + "<br/><a target=\"_blank\" href=\""+link+"\">know more...</a>";
                } else {
                    //set title
                    var apod_title = document.getElementById("apod_title");
                    apod_title.innerHTML = json_array["title"];

                    //set video
                    var apod_iframe = document.getElementById("adod_iframe");
                    adod_iframe.style.display = "inherit";
                    adod_iframe.src = json_array["url"];
                    

                    //ser brief exp
                    var apod_brief = document.getElementById("apod_brief");
                    apod_brief.innerHTML = json_array["explanation"];

                    //set date
                    var link = getDate(json_array["date"]);
                    var apod_date = document.getElementById("apod_date");
                    apod_date.innerHTML = "date : " + json_array["date"] + "<br/><a target=\"_blank\" href=\""+link+"\">know more...</a>";
                }
                
            } else {
                //something went wrong
                //check internet connection
                var apod_title = document.getElementById("apod_title");
                apod_title.innerHTML = "<h3>check your internet connection..!</h3>";
            }
        } else {
            //loading
            //console.log("loading");
        }
    };
    
    xmlreq.send(null);

}







