var db = require('../models');

exports.getTodos = function (req, res) {
    // res.send("Hello from todos routes");
    db.Todo.find()
    .then(function(todos) {
        res.json(todos);
    })
    .catch(function(err) {
        res.send(err);
    })
};

exports.createTodo = function(req, res) {
    // res.send('this is the post route');
    // console.log(req.body);
    db.Todo.create(req.body)
    .then(function(newTodo) {
        res.status(201).json(newTodo);
    })
    .catch(function(err) {
        res.send(err);
    });
};

// req.params is filled with the route varibales
exports.getTodo = function(req, res) {
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo) {
        res.json(foundTodo);
    })
    .catch(function(err) {
        res.send(err);
    });
};

exports.updateTodo = function(req, res) {
    // res.send("update route");
    // new: true -> to respond not with the old but with the updated version
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err) {
        res.send(err);
    });
};

exports.deleteTodo = function(req, res) {
    // res.send('delete something');
    db.Todo.findOneAndRemove({_id: req.params.todoId})
    .then(function(todo) {
        res.json(todo);
    })
    .catch(function(err) {
        res.send(err);
    });
};

module.exports = exports;