var express = require("express");
const fetch = require('node-fetch');
var app = express();
const path = require("path");

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// homepage
app.get("/", function(request, response) {
  response.send(`
  <!DOCTYPE html>

<html data-theme="light" lang="id">
  <head>
    <link rel="icon" href="./logo.png" type="image/x-icon" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="sendanote" content="true" />

    <title>Send a Note - SEND YOUR NOTES!</title>

    <link rel="stylesheet" href="./style.css" />
    <link href="https://cdn.jsdelivr.net/npm/daisyui@2.15.3/dist/full.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <script src="https://kit.fontawesome.com/c2165b4022.js" crossorigin="anonymous"></script>
  </head>



<body>

<div class="navbar bg-base-100 sticky top-0 backdrop-blur-none shadow-sm">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li><a href="/">Homepage</a></li>
          <li><a href="/board">Board Notes</a></li>
          <li><a href="/contribute">Contributions & Donations</a></li>
          <li><a href="/report">Report & Request</a></li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <a href="/" class="btn btn-ghost text-xl"><h1>Send a Note</h1></a>
    </div>
    <div class="navbar-end">
        <div tabindex="0" role="button" class="text-current btn btn-ghost btn-circle">
          <a href="/new"><i class="fa-solid fa-plus"></i></a>
        </div>
        </div>
    </div>
</div>



<div class="ml-[30px] mr-[30px] md:ml-[50px] md:mr-[50px]">
  <section id="top">
    <h1 class="text-5xl font-bold text-center mt-10">Express Your Feelings With A Note</h1>
    <p class="text-center mt-5">Share your untold feelings with <a style="text-bold">Send a Note</a></p>
    <br />
    <div class="card-actions justify-center">
      <div class="grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-2 xl:gap-x-8">
        <a href="/new" class="btn btn-active btn-info w-auto">Make A Note</a>
        <a href="/check" class="btn btn-outline btn-error w-auto">Search A Note</a>
      </div>
    </div>
</section>

<br />

<br />

<section id="papan">
  <div class="bg-[#DAA06D] text-black rounded-2xl w-full">
    <div class="card-body">
      <h2 class="card-title text-2xl font-bold justify-center">#NitipPesan [UNDER DEVELOPMENT]</h2>
      <p class="flex justify-center">Punya pesan buat seseorang? Atau mau cari pesan punyamu? Cek di #NitipPesan aja!</p>
      <div class="max-w-2xl mx-auto py-5 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 flex flex-nowrap">
          <div class="rounded-xl bg-[#E1C16E] w-full">
            <div class="card-body">
              <h2 class="card-title">Papan Pengakuan</h2>
              <p>Papan Yang Isinya Segala Macam Pengakuan Warga Bumi</p>
            </div>
          </div>

        

        <div class="rounded-xl bg-[#E1C16E] w-full">
          <div class="card-body">
            <h2 class="card-title">Papan Pengakuan</h2>
            <p>Papan Yang Isinya Segala Macam Pengakuan Warga Bumi</p>
          </div>
        </div>



        <div class="rounded-xl bg-[#E1C16E] w-full">
          <div class="card-body">
            <h2 class="card-title">Papan Pengakuan</h2>
            <p>Papan Yang Isinya Segala Macam Pengakuan Warga Bumi</p>
          </div>
        </div>



        <div class="rounded-xl bg-[#E1C16E] w-full">
          <div class="card-body">
            <h2 class="card-title">Papan Pengakuan</h2>
            <p>Papan Yang Isinya Segala Macam Pengakuan Warga Bumi</p>
          </div>
        </div>
      </div>
      </div>



      <div class="card-actions justify-center">
        <div class="grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-2 xl:gap-x-8">
        <a class="btn btn-active btn-error w-auto">Lihat Semua Pesan Yang Ada</a>
        <a button class="btn btn-warning w-auto">Buat Pesanmu</a>
       </div>
     </div>
  </div>
</section>

<br />

<br />

    <h1 class="text-5xl font-bold text-center mt-10">Ready To Send A Notes?</h1>
    <p class="text-center mt-5">Express Your Feel Now By A Notes</p>
    <br />
    <div class="card-actions justify-center">
      <div class="grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-2 xl:gap-x-8">
        <a href="/new" class="btn btn-active btn-info w-auto">Make A Note</a>
        <a href="/check" class="btn btn-outline btn-error w-auto">Search A Note</a>
      </div>
    </div>

</div>

<br />

</body>

<footer class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">

  <aside>

    <p>Copyright © 2025 - All right reserved by Always Lazy To Code | <a class="link link-primary" href="https://github.com/itshaiheree/sendanote">Star Us on Github</a></p>

  </aside>

</footer>
  `)
});

// notes render
app.get("/notes", function(req, res) {
  const senderName = "Yanto";
  const senderTarget = "Yanti";
  const senderMsg = "bijiq";
  const senderSongVisibility = "inline";
  const senderSong = "https://open.spotify.com/intl-id/track/0iKhHZMZfdaDmdlxF7jS2y";
  
  res.send(`
  <!DOCTYPE html>
<html lang="id">

  <head>
    <link rel="icon" href="./logo.png" type="image/x-icon" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="mazen" content="true" />
    <title>${senderName}'s Notes - SendANotes</title>

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
        <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li><a href="/">Homepage</a></li>
          <li><a href="/board">Board Notes</a></li>
          <li><a href="/contribute">Contributions & Donations</a></li>
          <li><a href="/report">Report & Request</a></li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <a href="/" class="btn btn-ghost text-xl">SendANote</a>
    </div>
    <div class="navbar-end">
        <div tabindex="0" role="button" class="text-current btn btn-ghost btn-circle">
          <a href="/new"><i class="fa-solid fa-plus"></i></a>
        </div>
        </div>
    </div>
</div>


<div class="ml-[30px] mr-[30px] md:ml-[50px] md:mr-[50px]">
    <div class="max-w-2xl mx-auto py-5 px-4">
    <div class="rounded-xl bg-[#E1C16E] w-full">
        <div class="card-body text-black">
            <h2 class="text-xl font-bold">from: ${senderName}</h2>
            <h2 class="text-xl font-bold">to: ${senderTarget}</h2>
            <p class="text-l mt-3">${senderMsg}</p>
                <div class="${senderSongVisibility} flex mt-4">
                <div id="spotify-embed-iframe"></div>
                </div>
        </div>
      </div>

      <div class="">
        <h2 class="text-3xl font-bold mt-10">Punya pesan? #NitipPesan aja!</h2>
         <div class="grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-2 xl:gap-x-8 mt-4">
            <a button class="btn btn-warning w-auto">Buat Pesanmu</a>
            <a class="btn btn-active btn-error w-auto">Lihat Semua Pesan Yang Ada</a>
        </div>
      </div>

      <h2 class="text-3xl font-bold mt-10">Other Notes:</h2>
      <div class="max-w-2xl mx-auto py-5 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8 text-black">
        <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <div class="rounded-xl bg-[#E1C16E] w-full">
              <div class="card-body">
                <h2 class="card-title">Papan Pengakuan</h2>
                <p>Papan Yang Isinya Segala Macam Pengakuan Warga Bumi</p>
              </div>
            </div>
          
          <div class="rounded-xl bg-[#E1C16E] w-full">
            <div class="card-body">
              <h2 class="card-title">Papan Pengakuan</h2>
              <p>Papan Yang Isinya Segala Macam Pengakuan Warga Bumi</p>
            </div>
          </div>
  
          <div class="rounded-xl bg-[#E1C16E] w-full">
            <div class="card-body">
              <h2 class="card-title">Papan Pengakuan</h2>
              <p>Papan Yang Isinya Segala Macam Pengakuan Warga Bumi</p>
            </div>
          </div>
  
          <div class="rounded-xl bg-[#E1C16E] w-full">
            <div class="card-body">
              <h2 class="card-title">Papan Pengakuan</h2>
              <p>Papan Yang Isinya Segala Macam Pengakuan Warga Bumi</p>
            </div>
          </div>
        </div>
        </div>
</div>
<br />
</body>
<footer class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
  <aside>
    <p>Copyright © 2025 - All right reserved by Always Lazy To Code | <a class="link link-primary" href="https://github.com/itshaiheree/sendanote">Star Us on Github</a></p>
  </aside>
</footer>
<script>
window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const element = document.getElementById('spotify-embed-iframe');

  const userAgent = navigator.userAgent;

if (/Mobi|Android/i.test(userAgent)) {
    
  const options = {
      width: 250,
      height: 100,
      uri: '${senderSong}'
    };

  const callback = (EmbedController) => {};
  IFrameAPI.createController(element, options, callback);
  } else if (/Tablet|iPad/i.test(userAgent)) {
  const options = {
      width: 400,
      height: 100,
      uri: '${senderSong}'
    };

  const callback = (EmbedController) => {};
  IFrameAPI.createController(element, options, callback);
  } else {
  const options = {
      width: 900,
      height: 100,
      uri: '${senderSong}'
    };
    
  const callback = (EmbedController) => {};
  IFrameAPI.createController(element, options, callback);
  }
};
</script>
  `)
})




//  Response 404 Page
app.use(function(req, res, next){
  if (req.accepts('html')) {
res.sendFile(path.join(__dirname, '../public', '404.html'));
    return;
  }
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
