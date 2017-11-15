/// <reference path="../../typings/index.d.ts" />

import * as express from "express";
import * as jwt from "jsonwebtoken";

import config from '../config';
import {User, IUser} from '../models/user';

export function authenticate(req : express.Request, res : express.Response, next : express.NextFunction) {
		const token = req.body.token || req.query.token || req.headers['x-access-token'];
		if (!token) {
				req['decoded'] = 'No token found!';
				return next();
		}
		verifyToken(token, res).then(decoded => {
				req['decoded'] = decoded;
				next();
		});
}

export function isUserOrMakeAnonymous(req : express.Request, res : express.Response, next : express.NextFunction) {
		if (req['decoded'] === 'No token found!') {
				User
						.findOne({email: 'anonymous@express.todo'})
						.then(user => {
								if (!user) 
										return res.send({success: false, error: 'Authentication failed. Anonymous user not found!', data: null});
								req['decoded'] = user.toObject();
								return next();
						})
						.catch(err => {
								if (err) 
										return res.send({success: false, error: err, data: null});
								}
						);;
		} else {
				next();
		}
}

export function isAdmin(req : express.Request, res : express.Response, next : express.NextFunction) {
		console.log('isadmin1')
		if (req['decoded'] === 'No token found!') 
				return res.json({success: false, error: 'Token not found!', data: null});
		console.log('isadmin2')
		if (!req['decoded'].admin) 
				return res.json({success: false, error: 'Only admin is allowed!', data: null});
		console.log('isadmin3')
		next();
		console.log('isadmin4')
}

function verifyToken(token : string, res : express.Response) {
		return new Promise((resolve, reject) => {
				jwt.verify(token, config.secret, (err, decoded) => {
						if (err) 
								return res.json({success: false, error: 'Failed to authenticate token!', data: null});
						resolve(decoded);
				});
		});
}