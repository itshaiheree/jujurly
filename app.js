var express = require("express");
const fetch = require('node-fetch');
var app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/notes", function(request, response) {
  response.send(`
    <!DOCTYPE html>
<html lang="id">

  <head>
    <link rel="icon" href="./logo.png" type="image/x-icon" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="mazen" content="true" />
    <title>Jujurly - WAKTUNYA CONFESS!</title>

    <link rel="stylesheet" href="./style.css" />
    <link href="https://cdn.jsdelivr.net/npm/daisyui@2.15.3/dist/full.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <script src="https://kit.fontawesome.com/c2165b4022.js" crossorigin="anonymous"></script>
    <script src="https://open.spotify.com/embed/iframe-api/v1" async></script>
  </head>

<body>
<div class="navbar bg-base-100 sticky top-0 backdrop-blur-none shadow-sm">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li><a href="/">Homepage</a></li>
          <li><a href="/papan">Papapn Pengakuan</a></li>
          <li><a href="/contribute">Kontribusi & Donasi</a></li>
          <li><a href="/report">Lapor & Request</a></li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <a href="/" class="btn btn-ghost text-xl">Jujurly</a>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="text-current btn btn-ghost btn-circle">
          <i class="fa-solid fa-plus"></i>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li><a href="/new">Buat Confess Sekarang</a></li>
          <li><a href="/check">Cek Respon Confess</a></li>
        </ul>
      </div>
    </div>
</div>

<div class="ml-[30px] mr-[30px] md:ml-[50px] md:mr-[50px]">
            <h2 class="card-title">from: dummy\nto:dummy</h2>
            <p>This is dummy message, only for develope purpose</p>

            <div id="spotify-embed-iframe"></div>
</div>
<br />
</body>
<footer class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
  <aside>
    <p>Copyright © 2025 - All right reserved by Always Lazy To Code | <a class="link link-primary" href="https://github.com/itshaiheree/jujurly">Star Us on Github</a></p>
  </aside>
</footer>
<script>
window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const element = document.getElementById('spotify-embed-iframe');
  const options = {
      uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
    };
  const callback = (EmbedController) => {};
  IFrameAPI.createController(element, options, callback);
};
</script>
    `)
});

app.use(function(req, res, next){
  res.send('404: Page not Found', 404);
});

app.use(
  (request, response, next) => {
    response.set('X-Frame-Options', 'deny');
    next();
  },
  express.static('public')
);

// listen for requests :)
var listener = app.listen(1949, function() {
  console.log("Your app is listening on port 1949");
});