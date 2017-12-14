"use strict";
/// <reference path="../typings/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");
var cors = require("cors");
var config_1 = require("./config");
var auth_1 = require("./routes/auth");
var todo_1 = require("./routes/todo");
var user_1 = require("./routes/user");
var error_1 = require("./routes/error");
var middleware_1 = require("./middleware");
//server configuration
var app = express();
// establish db connection
mongoose.connect(config_1.default.database);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//builtin middleware
app.use(express.static(path.join(__dirname, './public')));
//third party middleware
app.use(morgan('dev'));
app.use(cookieParser('expressWebpackTodoApi'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
//custom mounted middleware for routing
app.use('/api/v1', auth_1.default);
app.use('/api/v1', middleware_1.authenticate);
app.use('/api/v1', [user_1.default, todo_1.default]);
// render index page
app.get('/', function (req, res, next) {
    res.send('Express REST API Application is running!');
});
//custom middleware for errors
app.use(error_1.default);
exports.default = app;
