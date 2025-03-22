var express = require("express");
const fetch = require('node-fetch');
var app = express();
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.use(
  (request, response, next) => {
    response.set('X-Frame-Options', 'deny');
    next();
  },
  express.static('public')
);

app.use(function(req,res){
  res.status(404).render('404.html');
});

// listen for requests :)
var listener = app.listen(1949, function() {
  console.log("Your app is listening on port 1949");
});