var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');
var todoRoutes = require('./routes/todos');

// allow access to request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));
//access views folder
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
	res.sendFile('index.html');
});

app.use('/api/todos', todoRoutes);

//start server
//listen(port, host, callback)
app.listen(3100, function() {
	console.log("App is running");
});