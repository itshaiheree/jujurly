var express = require("express");
const fetch = require('node-fetch');
var app = express();
const path = require("path");
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.dbUsername}:${process.env.dbPassword}@${process.env.dbLink}?retryWrites=true&w=majority`);


// function database
const UsersSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    senderName: { type: String, required: true },
    receiver: { type: String, required: true },
    msg: { type: String, required: true },
    musicAvailable: { type: String, required: true },
    musicLink: { type: String, required: true }
  },
  { versionKey: false, timestamps: true }
);

const noteCountSchema = new mongoose.Schema(
  {
    current: { type: String, required: true },
    next: { type: String, required: true }
  }
);

let Note = mongoose.model("Note", UsersSchema);
let NoteCount = mongoose.model("NoteCount", noteCountSchema);

async function addNote(userId, sender, target, pesan, music, link) {
  let obj = {
    id: userId,
    senderName: sender,
    receiver: target,
    msg: pesan,
    musicAvailable: music,
    musicLink: link
  };
  Note.create(obj);
}

async function setCurrentNote() {
  const nextNumber = NoteCount.find().current + 1;
  let data = NoteCount.find().current;

  if (nextNumber === "22" || nextNumber === "24") {
    const nextNumberr = NoteCount.find().current + 2;

    await NoteCount.find().updateMany({
      current: data.current,
      next: nextNumberr
    });
  } else {
    const nextNumberr = NoteCount.find().current + 1;

    await NoteCount.find().updateMany({
      current: data.current,
      next: nextNumberr
    });
  }


}

async function setFirstNote(number) {
  if (!number) { return false }
  const nextNumber = number + 1
  
  let obj = {
    current: number,
    next: nextNumber
  };

  NoteCount.create(obj);
}

// Tambahkan middleware untuk mem-parsing body JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// homepage
app.get("/", function(request, response) {
  response.send(`
  <!DOCTYPE html>

<html data-theme="light" lang="en">
  <head>
    <link rel="icon" href="/logo.png" type="image/x-icon" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="sendanote" content="true" />

    <title>Send a Note - SEND YOUR NOTES!</title>

    <link rel="stylesheet" href="/style.css" />
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

// DELETE THIS PLS
app.get("/notes/setid", function(req, res) {
  const id = req.query.id;

  if (req.query.id == null){
    res.json({ status: "failed", message: "Please fill all the fields" });
  }  
  

  setFirstNote(`${id}`)
  .then(() => { res.send('done') })
})

// Endpoint POST untuk menangani data dari form
app.post('/newHand', async (req, res) => {
  try {
    const data = await NoteCount.findOne().exec();
    const id = data.next;

    const { sender, receiver, msg, musicAvailable, musicLink } = req.body;

    if (!sender || !receiver || !msg || !musicAvailable || !musicLink) {
      return res.status(400).json({ status: "failed", message: "Please fill all the fields" });
    }

    await addNote(`${id}`, sender, receiver, msg, musicAvailable, musicLink);
    await setCurrentNote();

    res.json({ status: "success", message: "Note successfully created", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

//note new page
app.get("/notes/new", function(req, res) {
  res.send(`
    <!DOCTYPE html>
  
  <html data-theme="light" lang="en">
    <head>
      <link rel="icon" href="/logo.png" type="image/x-icon" />
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="sendanote" content="true" />
  
      <title>New Note! - Send a Note</title>
  
      <link rel="stylesheet" href="/style.css" />
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
    <section id="top" style="text-center">
      <h1 class="text-5xl font-bold text-center mt-10">Send Your Note!</h1>
      <p class="text-center mt-5">It's nice to see you're here to send your feelings!</p>
      <br />
      <fieldset class="fieldset">
        <p id="errorMsg" style="display:none" class="validator-hint">
          Please fill all of the required (*) fields
          <br />
        </p>
        <legend class="fieldset-legend">Sender Name</legend>
        <input id="sender" type="text" class="input" placeholder="Budi Tarmiji" />
        <p class="fieldset-label">Optional</p>
        <br />
        <legend class="fieldset-legend">Recipient*</legend>
        <input id="recipient" type="text" class="input" placeholder="Maimunah" required />
        <legend class="fieldset-legend">Message*</legend>
        <input id="msg" type="text" class="input" placeholder="Maimunah" required />
        <legend class="fieldset-legend">Spotify Link</legend>
        <input id="link" type="text" class="input" placeholder="https://open.spotify.com/track/0puyuBqmptiuq0K9ecvdW8?si=cAcc4N9LTGWkwNnSOtFlOg&context=spotify%3Aalbum%3A4bhftzHgTYXc9xy27QsryO" required />
        <p class="fieldset-label">Leave it blank if you doesn't want to add a music</p>
        <br />
        <button id="buttonPost" class="btn btn-outline">Default</button>
      </fieldset>
      </div>
  </section>
  
  <br />
  
  </body>
  
  <footer class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
  
    <aside>
  
      <p>Copyright © 2025 - All right reserved by Always Lazy To Code | <a class="link link-primary" href="https://github.com/itshaiheree/sendanote">Star Us on Github</a></p>
  
    </aside>
  
  </footer>
 
  <script>
$(document).ready(function(){
  $("#buttonPost").click(function(){
    var x = document.getElementById("sender").value;
    var y = document.getElementById("recipient").value;
    var z = document.getElementById("msg").value;
    var a = document.getElementById("link").value;

    if (x == "" || y == "" || z == "") {
      document.getElementById("errorMsg").innerHTML = "Please fill all the fields";
      document.getElementById("errorMsg").style.display = "block";
    } else {
     if (a == ""){
          $.post("./newHand",
            {
              sender: x,
              receiver: y,
              msg: z,
              musicAvailable: "hidden",
              musicLink: "notAvailable"
            },
            function(data,status){
              let nyum = JSON.parse(data);

              location.replace('https://sendanote.mhai.my.id' + "/notes/" + nyum.id);
          });
      } else {
          $.post("./newHand",
            {
              sender: x,
              receiver: y,
              msg: z,
              musicAvailable: " ",
              musicLink: a
            },
            function(data,status){
              let nyum = JSON.parse(data);

              location.replace('https://sendanote.mhai.my.id' + "/notes/" + nyum.id);
          });
    }
  }
})
});
  </script>
    `)
})

// notes render
app.get("/notes/:id", function(req, res) {
  const id = req.params.id;

  (async () => {
  try {
  let data = await Note.findOne({ id: id }).exec();

  const senderName = data.senderName;
  const senderTarget = data.receiver;
  const senderMsg = data.msg;
  const senderSongVisibility = data.musicAvailable;
  const senderSong = data.musicLink;
  
  res.send(`
  <!DOCTYPE html>
<html data-theme="light" lang="en">

  <head>
    <link rel="icon" href="/logo.png" type="image/x-icon" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="mazen" content="true" />
    <title>${senderName}'s Notes - SendANotes</title>

    <link rel="stylesheet" href="/style.css" />
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
    <div class="max-w-2xl mx-auto py-5 px-4">
    <div class="rounded-xl bg-[#E1C16E] w-full">
        <div class="card-body text-black">
            <a class="text-xl font-bold">from: </a><h2>${senderName}</h2>
            <a class="text-xl font-bold">to: </a><h2>${senderTarget}</h2>
            <h2 class="text-l mt-3">${senderMsg}</h2>
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
<script>
window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const element = document.getElementById('spotify-embed-iframe');

  const userAgent = navigator.userAgent;

  const options = {
      width: 250,
      height: 100,
      uri: '${senderSong}'
    };
    
  const callback = (EmbedController) => {};
  IFrameAPI.createController(element, options, callback);
  }
};
</script>
<footer class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
  <aside>
    <p>Copyright © 2025 - All right reserved by Always Lazy To Code | <a class="link link-primary" href="https://github.com/itshaiheree/sendanote">Star Us on Github</a></p>
  </aside>
</footer>
  `)
  } catch (error) {
    res.send(`
      <!DOCTYPE html>
    <html data-theme="light" lang="en">
    
      <head>
        <link rel="icon" href="./logo.png" type="image/x-icon" />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="mazen" content="true" />
        <title>The Note Doesn't Available - SendANotes</title>
    
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
        <div class="max-w-2xl mx-auto py-5 px-4">
        <div class="rounded-xl bg-[#E1C16E] w-full">
            <div class="card-body text-black">
                <h2 class="text-xl font-bold">The note you're looking for doesn't available</h2>
                <p class="text-l mt-3">The ${id} note doesn't available, try to look another note bellow!</p>
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
    <script>
    </script>
    <footer class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>Copyright © 2025 - All right reserved by Always Lazy To Code | <a class="link link-primary" href="https://github.com/itshaiheree/sendanote">Star Us on Github</a></p>
      </aside>
    </footer>
      `)
  }
})();
})



// listen for requests :)
var listener = app.listen(1949, function() {
  console.log("Your app is listening on port 1949");
});
