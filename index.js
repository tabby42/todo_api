var express = require('express'),
    app = express();

app.get('/', function(req, res) {
	res.send('Hello from express');
});

app.get('/happy', function(req, res) {
	res.send({message: ':)'});	//or res.json()
});

//start server
//listen(port, host, callback)
app.listen(3100, function() {
	console.log("App is running");
});