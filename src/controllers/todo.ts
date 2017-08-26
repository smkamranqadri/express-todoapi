/// <reference path="../../typings/index.d.ts" />

import * as express from "express";

import { Todo, ITodo } from '../models/todo';


export function todos(req: express.Request, res: express.Response) {
	Todo.find({})
		.exec((err: Error, todos: Array<ITodo>) => {
			if (err) return res.send({ success: false, error: err, data: null });
			if (todos.length === 0) return res.send({ success: false, error: 'No todos found!', data: null });
			res.send({ success: true, error: null, data: todos });
		});
}

export function createTodo(req: express.Request, res: express.Response) {
	let newtodo: ITodo = req.body;
	Todo.create(newtodo, (err: Error, todo: ITodo) => {
		if (err) return res.send({ success: false, error: err, data: null });
		res.send({ success: true, error: null, data: todo });
	});
}

export function updateTodo(req: express.Request, res: express.Response) {
	let todoId: string = req.params.id;
	let updatedTodo: ITodo = req.body;
	Todo.findByIdAndUpdate(todoId, updatedTodo, (err: Error, todo: ITodo) => {
		if (err) return res.send({ success: false, error: err, data: null });
		if (!todo) return res.send({ success: false, error: 'No todo found!', data: null });
		res.send({ success: true, error: null, data: todo });
	});
}

export function removeTodo(req: express.Request, res: express.Response) {
	let todoId: string = req.params.id;
	Todo.findByIdAndRemove(todoId, (err: Error, todo: ITodo) => {
		if (err) return res.send({ success: false, error: err, data: null });
		res.send({ success: true, error: null, data: todo });
	});
}