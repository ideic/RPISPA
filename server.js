var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var tempData = {
		maxValue:55,
		minValue:10,
		currentValue:20,
		alarm:true
	};

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.post('/setTemp', urlencodedParser, function (req, res) {
	console.log(req.body);
	var tData = req.body;
	/*tempData.maxValue = tData.maxValue;
	tempData.minValue = tData.minValue;*/
	res.json(req.body);
})

app.get('/getTemp', function (req, res) {
   console.log('getTemp');
   tempData.currentValue++;
   res.json(tempData);
})

app.get('/', function(req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
	
//register static dirs
// node_modules
//server.js
//public/
//public/images
//public/images/logo.png
app.use(express.static('public'));
app.use(bodyParser.json());  // parse application/json

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})


