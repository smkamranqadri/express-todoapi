"use strict";
/// <reference path="../../typings/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var config_1 = require("../config");
var user_1 = require("../models/user");
function authenticate(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        req['decoded'] = 'No token found!';
        return next();
    }
    verifyToken(token, res).then(function (decoded) {
        req['decoded'] = decoded;
        next();
    });
}
exports.authenticate = authenticate;
function isUserOrMakeAnonymous(req, res, next) {
    if (req['decoded'] === 'No token found!') {
        user_1.User
            .findOne({ email: 'anonymous@express.todo' })
            .then(function (user) {
            if (!user)
                return res.send({ success: false, error: 'Authentication failed. Anonymous user not found!', data: null });
            req['decoded'] = user.toObject();
            return next();
        })
            .catch(function (err) {
            if (err)
                return res.send({ success: false, error: err, data: null });
        });
        ;
    }
    else {
        next();
    }
}
exports.isUserOrMakeAnonymous = isUserOrMakeAnonymous;
function isAdmin(req, res, next) {
    console.log('isadmin1');
    if (req['decoded'] === 'No token found!')
        return res.json({ success: false, error: 'Token not found!', data: null });
    console.log('isadmin2');
    if (!req['decoded'].admin)
        return res.json({ success: false, error: 'Only admin is allowed!', data: null });
    console.log('isadmin3');
    next();
    console.log('isadmin4');
}
exports.isAdmin = isAdmin;
function verifyToken(token, res) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, config_1.default.secret, function (err, decoded) {
            if (err)
                return res.json({ success: false, error: 'Failed to authenticate token!', data: null });
            resolve(decoded);
        });
    });
}
