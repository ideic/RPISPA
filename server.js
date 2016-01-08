var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var tempData = {
		maxValue:55,
		minValue:10,
		currentValue:20,
		alarm:true
	};

var index = 1;
	
app.use(express.static('public'));
app.use(express.static('src/view'));

app.use(bodyParser.json({ type: 'application/json' }));  // parse application/json
//app.use(bodyParser.urlencoded({ extended: true, type:"application/json" }));
	
app.post('/setTemp', function (req, res) {
	tempData.maxValue = req.body.maxValue;
	tempData.minValue = req.body.minValue;
	res.json(tempData);
})

app.get('/getTemp', function (req, res) {
   res.json(tempData);
});

app.get('/getTempCurrentValue', function (req, res) {
   tempData.currentValue = tempData.currentValue + index;
   tempData.alarm = tempData.currentValue > tempData.maxValue || tempData.currentValue < tempData.minValue;
   if (index == 1 && tempData.currentValue > tempData.maxValue + 10)
   {
	   index = -1;
   }
   else if (index == -1 && tempData.currentValue < tempData.minValue - 10)
   {
	   index = 1;
   }
   
   res.json({"currentValue":tempData.currentValue, "alarm":tempData.alarm});
});

app.get('/', function(req, res) {
        res.sendFile(__dirname + '/src/view/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})


