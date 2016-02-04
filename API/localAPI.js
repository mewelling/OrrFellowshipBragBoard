var express = require('express');
var Client = require('node-rest-client').Client;
var app = express();
var colorArray = ["orr1","orr2","orr3","orr4"];
app.get('/brags', function(req, res) {

	var client = new Client();
	// direct way 
	client.get("https://docs.google.com/a/orrfellowship.org/spreadsheets/d/1DAJAojHrH2RNgP1HWojkPsbId6fWeCBDEtIUKHRNkDE/export?gid=1726067716&format=csv", function (data, response) {
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Access-Control-Allow-Origin','*');

		var name = data.toString('utf8');
		var dataArray = name.split('\n');
		dataArray.splice(0,1);

		var output = [];

		for (i = 0; i < dataArray.length; i++) {
			var currentLine = dataArray[i].trim();
			var components = currentLine.split(',');

			//Date stuff to skip brags older than one month
			var monthAgoDate = new Date();
			if (monthAgoDate.getMonth() == 1) {
				monthAgoDate.setMonth(12);
				monthAgoDate.setFullYear(monthAgoDate.getFullYear() - 1);
			} else {
				monthAgoDate.setMonth(monthAgoDate.getMonth() - 1);
			}
			var bragDate = new Date(components[0]);
			if (bragDate.getTime() < monthAgoDate.getTime()) {
				continue;
			}

			components.splice(0,1);
			currentLine = components.join('|');
			if(currentLine.charCodeAt(0) == 34) {
				currentLine = currentLine.substring(1, currentLine.length - 1);
			}

			var randColor = colorArray[Math.floor((Math.random() * colorArray.length-1) + 1)];
			var dimentions = {'min':0,'max':0};

			if (currentLine.length < 30) {
				//sum 1
				dimentions['min'] = 1;
				dimentions['max'] = 1;
			} else if (currentLine.length < 70) {
				//sum 2
				dimentions['min'] = 2;
				dimentions['max'] = 2;
			} else if (currentLine.length < 100) {
				//sum 3
				dimentions['min'] = 2;
				dimentions['max'] = 2;
			} else if (currentLine.length < 130) {
				//sum 4
				dimentions['min'] = 3;
				dimentions['max'] = 1;
			} else {
				dimentions['min'] = 3;
				dimentions['max'] = 1;
			}
			var randlength = Math.floor((Math.random() * dimentions['max']) + dimentions['min']);
			var randWidth = Math.floor((Math.random() * dimentions['max']) + dimentions['min']);
			var outputData = {'length':randlength,'width':randWidth,'color':randColor,'message':currentLine};

			output.push(outputData);
		}

		var time = new Date();
		console.log("Returned " + output.length + " values on " + time);
		res.send(200, output);
	});
  // res.send('Hello Seattle\n');
});
app.listen(3001);
console.log('Listening on port 3001...');

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

