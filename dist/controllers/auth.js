"use strict";
/// <reference path="../../typings/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var config_1 = require("../config");
var user_1 = require("../models/user");
function login(req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (!email)
        return res.send({ success: false, error: 'Login failed. Email is missing!', data: null });
    if (!password)
        return res.send({ success: false, error: 'Login failed. Password is missing!', data: null });
    user_1.User
        .findOne({ email: email })
        .exec(function (err, user) {
        if (err)
            return res.send({ success: false, error: err, data: null });
        if (!user)
            return res.send({ success: false, error: 'Authentication failed. No user found!', data: null });
        user
            .comparePassword(password)
            .then(function (valid) {
            if (!valid)
                return res.send({ success: false, error: 'Authentication failed. Password doesn\'t match!', data: null });
            var userObj = {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: ''
            };
            userObj.token = jwt.sign(user.toObject(), config_1.default.secret, { expiresIn: '24h' });
            res.send({ success: true, error: null, data: userObj });
        })
            .catch(function (err) {
            if (err)
                return res.send({ success: false, error: err, data: null });
        });
    });
}
exports.login = login;
function register(req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (!email)
        return res.send({ success: false, error: 'Register failed. Email is missing!', data: null });
    if (!password)
        return res.send({ success: false, error: 'Register failed. Password is missing!', data: null });
    user_1.User.create({
        email: email,
        passwordHash: password
    }, function (err, user) {
        if (err)
            return res.send({ success: false, error: err, data: null });
        var userObj = {
            _id: user._id,
            name: '',
            email: user.email,
            token: ''
        };
        userObj.token = jwt.sign(user.toObject(), config_1.default.secret, { expiresIn: '24h' });
        res.send({ success: true, error: null, data: userObj });
    });
}
exports.register = register;
