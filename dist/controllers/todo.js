"use strict";
/// <reference path="../../typings/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var todo_1 = require("../models/todo");
function todos(req, res) {
    var userId = req['decoded']._id;
    todo_1.Todo
        .find({ createdBy: userId })
        .exec(function (err, todos) {
        if (err)
            return res.send({ success: false, error: err, data: null });
        if (todos.length === 0)
            return res.send({ success: false, error: 'No todos found!', data: null });
        res.send({ success: true, error: null, data: todos });
    });
}
exports.todos = todos;
function todo(req, res) {
    var userId = req['decoded']._id;
    var todoId = req.params.id;
    todo_1.Todo
        .findOne({ _id: todoId, createdBy: userId })
        .exec(function (err, todo) {
        if (err)
            return res.send({ success: false, error: err, data: null });
        if (!todo)
            return res.send({ success: false, error: 'No todo found!', data: null });
        res.send({ success: true, error: null, data: todo });
    });
}
exports.todo = todo;
function createTodo(req, res) {
    var userId = req['decoded']._id;
    var text = req.body.text;
    if (!text)
        return res.send({ success: false, error: 'Creating todo failed. Text is missing!', data: null });
    todo_1.Todo.create({
        text: text,
        createdBy: userId
    }, function (err, todo) {
        if (err)
            return res.send({ success: false, error: err, data: null });
        res.send({ success: true, error: null, data: todo });
    });
}
exports.createTodo = createTodo;
function updateTodo(req, res) {
    var userId = req['decoded']._id;
    var todoId = req.params.id;
    var text = req.body.text;
    if (!text)
        return res.send({ success: false, error: 'Updating todo failed. Text is missing!', data: null });
    todo_1.Todo.findOneAndUpdate({
        _id: todoId,
        createdBy: userId
    }, {
        text: text
    }, function (err, todo) {
        if (err)
            return res.send({ success: false, error: err, data: null });
        if (!todo)
            return res.send({ success: false, error: 'No todo found!', data: null });
        res.send({ success: true, error: null, data: todo });
    });
}
exports.updateTodo = updateTodo;
function removeTodo(req, res) {
    var userId = req['decoded']._id;
    var todoId = req.params.id;
    todo_1.Todo.findOneAndRemove({
        _id: todoId,
        createdBy: userId
    }, function (err, todo) {
        if (err)
            return res.send({ success: false, error: err, data: null });
        res.send({ success: true, error: null, data: todo });
    });
}
exports.removeTodo = removeTodo;
