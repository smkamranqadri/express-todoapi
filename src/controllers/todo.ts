/// <reference path="../../typings/index.d.ts" />

import * as express from "express";

import {Todo, ITodo} from '../models/todo';

export function todos(req : express.Request, res : express.Response) {
		const userId = req['decoded']._id;
		Todo
				.find({createdBy: userId})
				.exec((err : Error, todos : Array < ITodo >) => {
						if (err) 
								return res.send({success: false, error: err, data: null});
						if (todos.length === 0) 
								return res.send({success: false, error: 'No todos found!', data: null});
						res.send({success: true, error: null, data: todos});
				});
}

export function todo(req : express.Request, res : express.Response) {
		const userId = req['decoded']._id;
		let todoId : string = req.params.id;
		Todo
				.findOne({_id: todoId, createdBy: userId})
				.exec((err : Error, todo : ITodo) => {
						if (err) 
								return res.send({success: false, error: err, data: null});
						if (!todo) 
								return res.send({success: false, error: 'No todo found!', data: null});
						res.send({success: true, error: null, data: todo});
				});
}

export function createTodo(req : express.Request, res : express.Response) {
		const userId = req['decoded']._id;
		const {text} = req.body;
		if (!text) 
				return res.send({success: false, error: 'Creating todo failed. Text is missing!', data: null});
		Todo.create({
				text,
				createdBy: userId
		}, (err : Error, todo : ITodo) => {
				if (err) 
						return res.send({success: false, error: err, data: null});
				res.send({success: true, error: null, data: todo});
		});
}

export function updateTodo(req : express.Request, res : express.Response) {
		const userId = req['decoded']._id;
		let todoId : string = req.params.id;
		const {text} = req.body;
		if (!text) 
				return res.send({success: false, error: 'Updating todo failed. Text is missing!', data: null});
		Todo.findOneAndUpdate({
				_id: todoId,
				createdBy: userId
		}, {
				text
		}, (err : Error, todo : ITodo) => {
				if (err) 
						return res.send({success: false, error: err, data: null});
				if (!todo) 
						return res.send({success: false, error: 'No todo found!', data: null});
				res.send({success: true, error: null, data: todo});
		});
}

export function removeTodo(req : express.Request, res : express.Response) {
		const userId = req['decoded']._id;
		let todoId : string = req.params.id;
		Todo.findOneAndRemove({
				_id: todoId,
				createdBy: userId
		}, (err : Error, todo : ITodo) => {
				if (err) 
						return res.send({success: false, error: err, data: null});
				res.send({success: true, error: null, data: todo});
		});
}