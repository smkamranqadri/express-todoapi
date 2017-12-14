"use strict";
/// <reference path="../../typings/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
// User.create({ name: 'Admin', email: 'admin@express.todo', passwordHash: 'expresstodoadmin' });
// User.create({ name: 'Anonymous', email: 'anonymous@express.todo', passwordHash: 'expresstodoanonymous' }).then(user => {
// 	console.log('user', user)
// }).catch(err => {
// 	console.log('user', err)
// });
function users(req, res) {
    user_1.User.find({})
        .select('_id name email')
        .exec(function (err, users) {
        if (err)
            return res.send({ success: false, error: err, data: null });
        if (users.length === 0)
            return res.send({ success: false, error: 'No users found!', data: null });
        res.send({ success: true, error: null, data: users });
    });
}
exports.users = users;
function user(req, res) {
    var userId = req.params.id;
    user_1.User.findById(userId)
        .exec(function (err, user) {
        if (err)
            return res.send({ success: false, error: err, data: null });
        if (!user)
            return res.send({ success: false, error: 'No user found!', data: null });
        res.send({ success: true, error: null, data: user });
    });
}
exports.user = user;
function createUser(req, res) {
    var _a = req.body, name = _a.name, email = _a.email, password = _a.password;
    if (!email)
        return res.send({ success: false, error: 'Register failed. Email is missing!', data: null });
    if (!password)
        return res.send({ success: false, error: 'Register failed. Password is missing!', data: null });
    user_1.User.create({ name: name, email: email, passwordHash: password }, function (err, user) {
        if (err)
            return res.send({ success: false, error: err, data: null });
        var userObj = { _id: user._id, name: user.name, email: user.email };
        res.send({ success: true, error: null, data: userObj });
    });
}
exports.createUser = createUser;
function updateUser(req, res) {
    var userId = req.params.id;
    var _a = req.body, name = _a.name, email = _a.email, password = _a.password;
    if (!email)
        return res.send({ success: false, error: 'Register failed. Email is missing!', data: null });
    if (!password)
        return res.send({ success: false, error: 'Register failed. Password is missing!', data: null });
    user_1.User.findById(userId)
        .exec(function (err, user) {
        if (err)
            return res.send({ success: false, error: err, data: null });
        if (!user)
            return res.send({ success: false, error: 'No user found!', data: null });
        user.name = name;
        user.email = email;
        user.passwordHash = password;
        user.save(function (err, user) {
            if (err)
                return res.send({ success: false, error: err, data: null });
            if (!user)
                return res.send({ success: false, error: 'No user found!', data: null });
            var userObj = { _id: user._id, name: user.name, email: user.email };
            res.send({ success: true, error: null, data: userObj });
        });
    });
}
exports.updateUser = updateUser;
function removeUser(req, res) {
    var userId = req.params.id;
    user_1.User.findByIdAndRemove(userId, function (err, user) {
        if (err)
            return res.send({ success: false, error: err, data: null });
        var userObj = { _id: user._id, name: user.name, email: user.email };
        res.send({ success: true, error: null, data: userObj });
    });
}
exports.removeUser = removeUser;
