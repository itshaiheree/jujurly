var express = require("express");
const fetch = require('node-fetch');
var app = express();


const path = require('path')
const execSync = require('child_process').execSync;
const P = require('pino')
const fetch = require('node-fetch')
const { 
default: makeWASocket, 
DisconnectReason, 
AnyMessageContent, 
delay,
proto,
jidDecode,
useSingleFileAuthState,
generateForwardMessageContent, 
generateWAMessageFromContent,
downloadContentFromMessage, 
generateMessageID,
makeInMemoryStore
} = require('@adiwajshing/baileys')
const baileys = require('@adiwajshing/baileys')
const fs = require("fs")
const fsx = require('fs-extra')
const axios = require('axios')
const { Boom } = require("@hapi/boom")
const { state, loadState, saveState } = useSingleFileAuthState("./chan.json")
const store = makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) })

const getVersionWaweb = () => {
    let version
    try {
        let { data } = axios.get('https://web.whatsapp.com/check-update?version=1&platform=web')
        version = [data.currentVersion.replace(/[.]/g, ', ')]
    } catch {
        version = [2, 2204, 13]
    }
    return version
}

const startSock = () => {
const chan = makeWASocket({
    logger: P({ level: 'fatal' }),
    printQRInTerminal: true,
    auth: state,
    browser: ['Bot "confess"',"Safari","1.0.0"],
    version: getVersionWaweb() || [2, 2204, 13]
})
}

startSock()
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

}; catch(e) {
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