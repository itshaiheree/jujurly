var express = require("express");
var app = express();
const router = express.Router();

const path = require('path')
const execSync = require('child_process').execSync;
const fetch = require('node-fetch')

const {default: makeWASocket } = require('baileys')
const P = require('pino')

const sock = makeWASocket({
  auth: state,
  logger: P() // you can configure this as much as you want, even including streaming the logs to a ReadableStream for upload or saving to a file
})

// you can use this package to export a base64 image or a canvas element.
import QRCode from 'qrcode'

sock.ev.on('connection.update', async (update) => {
  const {connection, lastDisconnect, qr } = update
  // on a qr event, the connection and lastDisconnect fields will be empty

  // In prod, send this string to your frontend then generate the QR there
  if (qr) {
    // as an example, this prints the qr code to the terminal
    console.log(QRCode.toString(qr, {type:'terminal'}))
  }
})

// DO NOT USE IN PROD!!!!
const { state, saveCreds } = useMultiFileAuthState("auth_info_baileys");
// this will be called as soon as the credentials are updated
sock.ev.on("creds.update", saveCreds);

const fs = require("fs")
const fsx = require('fs-extra')

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "alwayslazytocode@gmail.com",
      pass: "vpgvegcrdwzrjnkp",
    },
  });

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post('/api/sendWA', async(req, res) => {
try {
// query diganti body  

var pass = req.body.pass
const nomerWA = req.body.nomerTarget
const confess = req.body.pesan
const nama = req.body.nama
const namaTarget = req.body.namaTarget

if(pass !== "k4mug4bakalt4un1pass") return res.json({ status: "penyusup", message: "gausah sok-sokan dek! Gabakal bisa lu akses kalau gapunya passwordnya" })
if (!confess || !nomerWA) { res.json({ status: "kurangBener", message: "query yang kamu berikan kurang! coba cek lagi" }) }
if (!nama) { var namaFix = "Seseorang"}
if (nama) { var namaFix = `${nama}` }
if (!namaTarget) { var namaTargetFix = ""}
if (namaTarget) { var namaTargetFix = `${namaTarget}` }

chan.sendMessage(`${nomer}@s.whatsapp.net`, { text: `Halo ${namaTargetFix}! Kamu dapat sesuatu yang "spesial" dari *${namaFix}*!\n\nCek disini:\n${confess}` })

} catch(e) {
res.send(`Oopsie! Requestmu ditahan dikarenakan kesalahan sistem!\nKontak owner nya via IG/fesnuk @itshaiheree yaw :3\nJangan lupa kasih detail ini btw:\n\n${e}`)
console.log(e)
}
})



app.use(
  (request, response, next) => {
    response.set('X-Frame-Options', 'deny');
    response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    next();
  },
  express.static('public')
);

// listen for requests :)
var listener = app.listen(1949, function() {
  console.log("Your app is listening on port 1949");
});