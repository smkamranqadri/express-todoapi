"use strict";
/// <reference path="../../typings/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var user_1 = require("../controllers/user");
var middleware_1 = require("../middleware");
var router = express.Router();
router.get('/user/', middleware_1.isAdmin, user_1.users);
router.get('/user/:id', middleware_1.isAdmin, user_1.user);
router.post('/user/', middleware_1.isAdmin, user_1.createUser);
router.put('/user/:id', middleware_1.isAdmin, user_1.updateUser);
router.delete('/user/:id', middleware_1.isAdmin, user_1.removeUser);
exports.default = router;
