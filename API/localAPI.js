require('dotenv').config()
const express = require('express');
const app = express();

const lambda = require('./lambda');

app.get('/brags', function(req, res) {
  lambda.handler(null, null, (err, output) => {
    res.set('Access-Control-Allow-Origin', '*');
		res.status(200).send(output);
	});
});

app.listen(3001);
console.log('Listening on port 3001...');

