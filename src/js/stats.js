// // STATS // // 
// // TO DO // //

// STORE TOKEN IN COOKIES!
// PROGRESS BAR (?)

var token;
// GET TOKEN FROM COOKIE

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}



// END SESSION AND LOG OUT
document.getElementById("logout_btn").addEventListener("click", function(){
    console.log("test")
    function deleteAllCookies() {
        var cookies = document.cookie.split(";");
    
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
    deleteAllCookies()
    document.location.href = "../../index.html?ref=logout";
})

// GET TOKEN

let res = window.location.search
// https://developer.mozilla.org/de/docs/Web/API/URLSearchParams

res = res.replace(/\?/g, '');
var params = new URLSearchParams(res);
token = params.get("token");
if (params.has("token") === true) {
    console.log(token)
    document.cookie = "topfy_token=" + token;
}

let artistfn = (data) => {
    var result = "x";
    let artists = data.item.artists;
    if (artists.length > 1) {
        for (var i = 0; i < artists.length; i++) {
            if (result == "x") {
                result = artists[i].name;
            } else {
                result = result + ", " + artists[i].name;
            }
        }
        return result;
    } else {
        return data.item.artists[0].name;
    }
}

// Get currently played song
let getCurrentSong = (data) => {
    let songname = data.item.name;
    let artist = artistfn(data)
    document.getElementById("songtitle").innerHTML = "You're listening to: " + songname;
    document.getElementById("artist").innerHTML = artist;
    let image = data.item.album.images[0].url;
    console.log(image)
    $("#banner").css('background-image', 'url("' + image + '")');
}



// // GET TOP // //
// GET TOP ARTIST //


let getTopArtist = () => {
    $.ajax({
        url: 'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=1&offset=0',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token)
        }, success: function(data){
            console.log(data)
            $("#topartist").css('background-image', 'url("' + data.items[0].images[0].url + '")')
            $("#topartist_name").html(data.items[0].name);
        }
    })
}

let getTopSongs = () => {
    $.ajax({
        url: 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=1&offset=0',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token)
        }, success: function(data){
            console.log(data)
            $("#topsong").css('background-image', 'url("' + data.items[0].album.images[0].url + '")')
            $("#topsong_name").html(data.items[0].name);
        }
    })
}







let getThemAll = () => {
    token = getCookie("topfy_token")
    if (token === "") {
        document.location.href = "./index.html?ref=token_expired";
    }

    // First request on load
    $.ajax({
        url: 'https://api.spotify.com/v1/me/player/currently-playing',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token)
        }, success: function(data){
            console.log(data)
            getCurrentSong(data)
        }
    })
    // interval-request
    setInterval(function(){
        $.ajax({
            url: 'https://api.spotify.com/v1/me/player/currently-playing',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token)
            }, success: function(data){
                console.log(data)
                getCurrentSong(data)
            }
        })
    }, 20000)
    getTopArtist();
    getTopSongs();
}

getThemAll();