// // INDEX // //

// Detect logout and send success

let res = window.location.search
// https://developer.mozilla.org/de/docs/Web/API/URLSearchParams

res = res.replace(/\?/g, '');
var params = new URLSearchParams(res);

if (params.has("ref") === true) {
    let ref = params.get("ref");
    if (ref == "logout") {
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
        Toast_chooseall.fire({
            icon: 'success',
            title: "You've been logged out!"
        })
    }
    if (ref == "token_expired") {
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
      Toast_chooseall.fire({
          icon: 'warning',
          title: "Your token expired. Please login again!"
      })
  }
  if (ref == "404") {
    const Toast_404 = Swal.mixin({
      toast: true,
      position: 'top-end',
      timer: 7000,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
    Toast_404.fire({
      icon: 'warning',
      title: "The site you tried to visit does not exist."
    })
  }
}

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

var iftoken = getCookie("topfy_token");

if (iftoken) {
    document.location.href = "./stats.html?token=" + iftoken;
}

var cookieNotice = getCookie("cookieNotice");

if (!(cookieNotice)) {
  const Toast_cookies = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    showCloseButton: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });
  Toast_cookies.fire({
    icon: 'warning',
    title: 'We use cookies',
    html: "We use cookies only for mandotory storage of information provided by Spotify.<br> Take a look at our <a href='legal.html#cookies'>Cookie Policy</a> to clear any privacy concerns."
  })

}