// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const PORT= 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date?", function (req, res) {
	let date = req.params.date;
	console.log('date:', date);
	console.log('typeof', typeof date);
  res.json({unix: 1451001600000, utc:"Fri, 25 Dec 2015 00:00:00 GMT"});
});



// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app //for test