var mongoose = require('mongoose');
mongoose.set('debug', true);
//connect to db server
mongoose.connect('mongodb://localhost/todo-api');   //db will be created if doesn't exist

mongoose.Promise = Promise; //allow use of Promise syntax

module.exports.Todo = require('./todo');