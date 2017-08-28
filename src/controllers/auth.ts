/// <reference path="../../typings/index.d.ts" />

import * as express from "express";
import * as jwt from "jsonwebtoken";

import config from '../config';
import { User, IUser } from '../models/user';

export function login(req: express.Request, res: express.Response) {
	const { email, password } = req.body;
	if (!email) return res.send({ success: false, error: 'Register failed. Email is missing!', data: null });
	if (!password) return res.send({ success: false, error: 'Register failed. Password is missing!', data: null });
	User.findOne({ email })
		.exec((err: Error, user: IUser) => {
			if (err) return res.send({ success: false, error: err, data: null });
			if (!user) return res.send({ success: false, error: 'Authentication failed. No user found!', data: null });
			user.comparePassword(password).then(valid => {
				if (!valid) return res.send({ success: false, error: 'Authentication failed. Password doesn\'t match!', data: null });
				const userObj = { _id: user._id, name: user.name, email: user.email, token: '' };
				userObj.token = jwt.sign(user.toObject(), config.secret, { expiresIn: '24h' });
				res.send({ success: true, error: null, data: userObj });
			}).catch(err => {
				if (err) return res.send({ success: false, error: err, data: null });
			});
		});
}

export function register(req: express.Request, res: express.Response) {
	const { email, password } = req.body;
	if (!email) return res.send({ success: false, error: 'Register failed. Email is missing!', data: null });
	if (!password) return res.send({ success: false, error: 'Register failed. Password is missing!', data: null });
	User.create({ email, passwordHash: password }, (err: Error, user: IUser) => {
		if (err) return res.send({ success: false, error: err, data: null });
		const userObj = { _id: user._id, name: '', email: user.email, token: '' };
		userObj.token = jwt.sign(user.toObject(), config.secret, { expiresIn: '24h' });
		res.send({ success: true, error: null, data: userObj });
	});
}