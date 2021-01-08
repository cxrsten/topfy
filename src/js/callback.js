// // MAKE API REQUEST // // 

// Check if on Callback
// Error -> authorize.html

let res = window.location.search
// https://developer.mozilla.org/de/docs/Web/API/URLSearchParams

res = res.replace(/\?/g, '');
var params = new URLSearchParams(res);

// If error
if (params.has("error") === true) {
    window.location.href = "./authorize.html?error=" + params.get("error");
}
// AB HIER
    uri = getCookie("topfy_redirect_URI")

var verifier = getCookie("topfy_code_verifier")

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



if (params.has("code") === true) {
    let code = params.get("code")

    // Current Playback
    let data = {
        client_id: "6b18daee53bd4b1fba17ad64f95a35f0",
        grant_type: "authorization_code",
        code: code,
        redirect_uri: uri,
        code_verifier: verifier
    }
    console.log(uri)
    console.log(code)
    console.log(verifier)
    let Url = "https://accounts.spotify.com/api/token"
    $.ajax({
        url: Url,
        type: "POST",
        data: data,
        success: function(result){
            console.log(result)
            window.location.href = "./stats.html?token=" + result.access_token;
        },
        error: function(error){
            console.log(`Error ${error}`)
            document.location.href = "./authorize.html?error=" + error;
        }
    })
}

