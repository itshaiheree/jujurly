var express = require("express");
const fetch = require('node-fetch');
var app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

//  Response 404 Page
app.use(function(req, res, next){
  if (req.accepts('html')) {
    res.sendFile(__dirname + '/public/404.html');
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
