/// <reference path="../../typings/index.d.ts" />

import * as express from "express";
import * as jwt from "jsonwebtoken";

import config from '../config';
import { User, IUser } from '../models/user';

export function authenticate(req: express.Request, res: express.Response, next: express.NextFunction) {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (!token) return res.send({ success: false, error: 'No token found!', data: null });
	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) return res.json({ success: false, error: 'Failed to authenticate token!', data: null });
		req['decoded'] = decoded;
		next();
	});
}

export function isAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
	if (!req['decoded'].admin) return res.json({ success: false, error: 'Only admin is allowed!', data: null });
	next();
}