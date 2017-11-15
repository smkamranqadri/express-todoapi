"use strict";
/// <reference path="../../typings/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var auth_1 = require("../controllers/auth");
var router = express.Router();
router.post('/login', auth_1.login);
router.post('/register', auth_1.register);
exports.default = router;
