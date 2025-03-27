var express = require("express");
const fetch = require('node-fetch');
var app = express();
const path = require("path");

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
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

  <section id="top">

    <h1 class="text-5xl font-bold text-center mt-10">INI WAKTUNYA CONFESS!</h1>

    <p class="text-center mt-5">Jujur itu penting dan gak boleh di tunda! Buat pengakuanmu dan kirim ke orangnya sekarang!</p>

    <br />

    <div class="card-actions justify-center">

      <div class="grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-2 xl:gap-x-8">

        <a href="/new" class="btn btn-active btn-info w-auto">Buat Confess Sekarang</a>

        <a href="/check" class="btn btn-outline btn-error w-auto">Cek Respon Confess</a>

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

<section id="feature">

  <div class="bg-[#93C572] text-black rounded-2xl w-full">

  <div class="card-body">

  <h1 class="text-5xl font-bold text-center mt-10">Fitur Web Jujurly</h1>

  <p class="text-center mt-5">Top 5 fitur yang ada di web Jujurly:</p>

  <br />

  <h1 class="text-xl md:text-3xl font-bold mt-10">1. Bisa Nerima Feedback/Tanggapan Dari Confess</h1>

  <p class="mt-5">Kamu bisa nerima feedback/tanggapan dari pengakuan yang kamu kirimkan!</p>



  <h1 class="text-xl md:text-3xl font-bold mt-10 text-right">2. Berbagai Macam Pilihan Template Untuk Confess</h1>

  <p class="text-right mt-5">Kamu bisa pilih template yang tersedia untuk confees klean! Bisa di cek waktu buat confess ygy</p>



  <h1 class="text-xl md:text-3xl font-bold mt-10">3. Dilengkapi Dengan Link Kamuflase!!</h1>

  <p class="mt-5">Kamu bisa pilih untuk menggunakan link "jujurly.mhai.my.id" ataupun link "newz.mhai.my.id" dan kamu juga dapat menggunakan penyamaran preview link. Cek contohnya <a class="link link-primary" href="https://newz.mhai.my.id/example-preview">disini</a></p>



  <h1 class="text-xl md:text-3xl font-bold mt-10 text-right">4. Malu Untuk Ngasih Langsung? Pakai <a class="underline decoration-sky-500">#NitipPesan</a> Aja!</h1>

  <p class="text-right mt-5">Masih gengsi buat nanya/ngasih confession?? Pakai <a class="underline decoration-sky-500">Papan Pengakuan</a> aja! Kamu bisa tulis pesan dengan <a class="underline decoration-red-500">sender</a> dan <a class="underline decoration-red-500">penerima</a> sendiri loh! Kamu juga bisa cari pesan yang (bisa jadi) untuk kamu! Cus cobain <a class="link link-primary" href="/papan">disini</a></p>



  <h1 class="text-xl md:text-3xl font-bold mt-10">5. Easy To Use</h1> 

  <p class="mt-5">Simpel dan mudah dipake. Gak pake lama, bisa langsung dipake buat nembak</p>

  <br />

  </div>

  </div>

</section>

<br />

<h1 class="text-5xl font-bold text-center mt-10">Gimana? Kapan Confess-nya?</h1>

    <p class="text-center mt-5">Yuk lah, ungkapin sekarang juga!</p>

    <br />

    <div class="card-actions justify-center">

      <div class="grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-2 xl:gap-x-8">

      <a href="/new" class="btn btn-active btn-info w-auto">Buat Confess Sekarang</a>

      <a href="/check" class="btn btn-outline btn-error w-auto">Cek Respon Confess</a>

      </div>

    </div>

</div>

<br />

</body>

<footer class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">

  <aside>

    <p>Copyright © 2025 - All right reserved by Always Lazy To Code | <a class="link link-primary" href="https://github.com/itshaiheree/jujurly">Star Us on Github</a></p>

  </aside>

</footer>
  `)
});

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
