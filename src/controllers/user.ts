/// <reference path="../../typings/index.d.ts" />

import * as express from "express";

import { User, IUser } from '../models/user';

// User.create({ name: 'Admin', email: 'admin@express.todo', passwordHash: 'expresstodoadmin' });
// User.create({ name: 'Anonymous', email: 'anonymous@express.todo', passwordHash: 'expresstodoanonymous' }).then(user => {
// 	console.log('user', user)
// }).catch(err => {
// 	console.log('user', err)
// });

export function users(req: express.Request, res: express.Response) {
	User.find({})
		.select('_id name email')
		.exec((err: Error, users: Array<IUser>) => {
			if (err) return res.send({ success: false, error: err, data: null });
			if (users.length === 0) return res.send({ success: false, error: 'No users found!', data: null });
			res.send({ success: true, error: null, data: users });
		});
}

export function user(req: express.Request, res: express.Response) {
	let userId: string = req.params.id;
	User.findById(userId)
		.exec((err: Error, user: IUser) => {
			if (err) return res.send({ success: false, error: err, data: null });
			if (!user) return res.send({ success: false, error: 'No user found!', data: null });
			res.send({ success: true, error: null, data: user });
		});
}

export function createUser(req: express.Request, res: express.Response) {
	const { name, email, password } = req.body;
	if (!email) return res.send({ success: false, error: 'Register failed. Email is missing!', data: null });
	if (!password) return res.send({ success: false, error: 'Register failed. Password is missing!', data: null });
	User.create({ name, email, passwordHash: password }, (err: Error, user: IUser) => {
		if (err) return res.send({ success: false, error: err, data: null });
		const userObj = { _id: user._id, name: user.name, email: user.email };
		res.send({ success: true, error: null, data: userObj });
	});
}

export function updateUser(req: express.Request, res: express.Response) {
	let userId: string = req.params.id;
	const { name, email, password } = req.body;
	if (!email) return res.send({ success: false, error: 'Register failed. Email is missing!', data: null });
	if (!password) return res.send({ success: false, error: 'Register failed. Password is missing!', data: null });
	User.findById(userId)
		.exec((err: Error, user: IUser) => {
			if (err) return res.send({ success: false, error: err, data: null });
			if (!user) return res.send({ success: false, error: 'No user found!', data: null });
			user.name = name; user.email = email; user.passwordHash = password;
			user.save((err: Error, user: IUser) => {
				if (err) return res.send({ success: false, error: err, data: null });
				if (!user) return res.send({ success: false, error: 'No user found!', data: null });
				const userObj = { _id: user._id, name: user.name, email: user.email };
				res.send({ success: true, error: null, data: userObj });
			})
		});
}

export function removeUser(req: express.Request, res: express.Response) {
	let userId: string = req.params.id;
	User.findByIdAndRemove(userId, (err: Error, user: IUser) => {
		if (err) return res.send({ success: false, error: err, data: null });
		const userObj = { _id: user._id, name: user.name, email: user.email };
		res.send({ success: true, error: null, data: userObj });
	});
}
