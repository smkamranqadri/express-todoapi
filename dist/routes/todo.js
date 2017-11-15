"use strict";
/// <reference path="../../typings/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var todo_1 = require("../controllers/todo");
var middleware_1 = require("../middleware");
var router = express.Router();
router.get('/todo', middleware_1.isUserOrMakeAnonymous, todo_1.todos);
router.get('/todo/:id', middleware_1.isUserOrMakeAnonymous, todo_1.todo);
router.post('/todo/', middleware_1.isUserOrMakeAnonymous, todo_1.createTodo);
router.put('/todo/:id', middleware_1.isUserOrMakeAnonymous, todo_1.updateTodo);
router.delete('/todo/:id', middleware_1.isUserOrMakeAnonymous, todo_1.removeTodo);
exports.default = router;
