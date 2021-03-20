// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const PORT= process.env.PORT || 3000;

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
//with empty date string means only api/timestamp endpoint
app.get('/api/timestamp',(req,res)=>{
	res.json({unix:Date.now() ,utc:Date()});
})

// your first API endpoint... 
app.get("/api/timestamp/:date?", function (req, res) {
	let date = req.params.date;
	let regex = /\d{5,}/
if(regex.test(date)){
	res.json({unix: +date, utc: new Date(+date).toUTCString()})
}else{
	let dateObject = new Date(date);
	dateObject.toString() === 'Invalid Date' ? 
	res.json({error: "Invalid Date"}):
	res.json({unix: dateObject.valueOf(), utc:dateObject.toUTCString()});
}
});



// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app //for test