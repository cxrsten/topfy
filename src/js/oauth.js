/* New Scope to add? 

Do the following, future me!
ADD IT AFTER ITS DONE!

-> $scope_name ln1
-> turn scope off: ln
-> turn scope on: ln
*/

// Make settings visible
const $top_read = $('#scope_user-top-read');
const $libary_read = $('#scope_user-libary-read');
const $recently_played = $('#scope_user-read-recently-played');
const $playback_state = $('#scope_user-read-playback-state');
const $currently_read = $('#scope_user-read-currently-playing');

// Display settings or not
var settings = 0
document.getElementById("displaysettingsbutton").addEventListener("click", function(){
    if (settings == "visible") {
        $("#settings").slideUp();
        settings = "invisible"
    } else {
        $("#settings").slideDown();
        settings = "visible";
    }
})

// Choose none of them
document.getElementById("choosenone").addEventListener("click", function(){
    const Toast_choosenone = Swal.mixin({
        toast: true,
        position: 'top-end',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
    
    $top_read.prop("checked", false);
    $libary_read.prop("checked", false);
    $playback_state.prop("checked", false);
    $recently_played.prop("checked", false);
    $currently_read.prop("checked", false);

    Toast_choosenone.fire({
        icon: 'success',
        title: "All scopes are turned off. You won't see any stats lol"
    })
});

// Choose all of them
document.getElementById("chooseall").addEventListener("click", function(){
    const Toast_chooseall = Swal.mixin({
        toast: true,
        position: 'top-end',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
    
    $top_read.prop("checked", true);
    $libary_read.prop("checked", true);
    $playback_state.prop("checked", true);
    $recently_played.prop("checked", true);
    $currently_read.prop("checked", true);

    Toast_chooseall.fire({
        icon: 'success',
        title: "All scopes turned on. GIMME ALL OF 'EM!"
    })
});

// // GENERATE TOKEN // //

document.getElementById("buttonnext").addEventListener("click", function(){
    var client_id, redirect_uri, scope, code_challenge, code_challenge1;
    var scopes = [];
    var scopepre = [];
    // Detect which scopes are turned on
    /* 1: user-top-read | 2: user-library-read | 3: user-read-recently-played | 4: user-read-playback-state | 5: user-read-currently-playing */
    const scopelist = ["user-top-read", "user-library-read", "user-read-recently-played", "user-read-playback-state", "user-read-currently-playing"];
    if ($top_read.prop("checked") === true) {
        scopes.push(0);
    }
    if ($libary_read.prop("checked") === true) {
        scopes.push(1)
    }
    if ($recently_played.prop("checked") === true) {
        scopes.push(2)
    }
    if ($playback_state.prop("checked") === true) {
        scopes.push(3)
    }
    if ($currently_read.prop("checked") === true) {
        scopes.push(4)
    }
    if (scopes.length == 0) {
        $('#scopeerror').show();
        return;
    }
    // Scope-Seperator: %20
    for (var i = 0; i < scopes.length; i++) {
        scopepre.push(scopelist[scopes[i]]);
    }
    var first = true // No seperator at first
    for (var i = 0; i < scopepre.length; i++) {
        if (first === true) {
            scope = scopepre[i];
            first = false;
        } else {
            scope = scope + "%20" + scopepre[i];
        }
    }
    console.log(scope)

    // Code-Challange
     var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-.~".split('');
    var cclength = Math.floor(Math.random() * 85) + 43;
    var first2 = true
    for (var i = 0; i < cclength; i++) {
        rndchar = Math.floor(Math.random(1) * chars.length);
        if (first2 === true) {
            code_challenge = chars[rndchar];
            first2 = false
        } else {
            code_challenge = code_challenge + chars[rndchar];
        }
    } 
    console.log(code_challenge)
    document.cookie = "topfy_code_verifier=" + code_challenge;
    var promise1 = pkce_challenge_from_verifier(code_challenge);
    function sha256(plain) { 
        // returns promise ArrayBuffer
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    }

    function base64urlencode(a) {
        // Convert the ArrayBuffer to string using Uint8 array.
        // btoa takes chars from 0-255 and base64 encodes.
        // Then convert the base64 encoded to base64url encoded.
        // (replace + with -, replace / with _, trim trailing =)
        return btoa(String.fromCharCode.apply(null, new Uint8Array(a)))
            .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    async function pkce_challenge_from_verifier(v) {
        hashed = await sha256(v);
        base64encoded = base64urlencode(hashed);
        return base64encoded;
    }


    client_id = "6b18daee53bd4b1fba17ad64f95a35f0";
    function getRedirectURI() {
        var url = document.location.href;
        url = url.replace(/authorize/, "callback");
        return url;
    } 
    redirect_uri = getRedirectURI(); //"http://localhost:5500/callback.html" 
    document.cookie = "topfy_redirect_URI=" + redirect_uri;
    console.log(redirect_uri)
    console.log(scope);

    code_challenge = promise1.then(function(result){
     // FINAL LINK
    console.warn("You should be redirected to: https://accounts.spotify.com/authorize?response_type=code&client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&scope=" + scope + "&code_challenge=" + result + "&code_challenge_method=S256")
    document.location.href = "https://accounts.spotify.com/authorize?response_type=code&client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&scope=" + scope + "&code_challenge=" + result + "&code_challenge_method=S256";
    console.log(result);
    })
    

})



// // ERROR CALLBACK // // 

let res = window.location.search

res = res.replace(/\?/g, '');
var params = new URLSearchParams(res);
if (params.has("error") === true) {
    console.error("Authorization Error: The Spotify-API returned the following error: " + params.get("error"));
    $('#callbackerror').show();
    document.getElementById("callbackerror").innerHTML = "An error occured during the login process. Spotify returned the following error: <code>" + params.get("error") + "</code> <br>Please try again. Using the Privat-Tab or deactivating some addons may help. <br>If this error persists please contact me on <a href='./go/twitter.html' target='_blank'>Twitter</a>.<br>"
}
