"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    secret: 'express-app-secret',
    database: process.env.MONGOLAB_URI || 'mongodb://localhost/todoApp'
};
