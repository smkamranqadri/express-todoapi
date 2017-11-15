"use strict";
/// <reference path="../../typings/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
// catch 404 and forward to error handler
router.use(function (req, res, next) {
    var err = new Error('No valid route found!');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (process.env === 'development') {
    router.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send(err.message);
    });
}
// production error handler
// no stacktraces leaked to user
router.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});
exports.default = router;
