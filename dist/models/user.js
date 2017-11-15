"use strict";
/// <reference path="../../typings/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    passwordHash: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });
userSchema.pre('save', function (next) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('passwordHash'))
        return next();
    // generate a salt
    HashPassword(this, next);
});
userSchema.pre('update', function (next) {
    console.log('password', this.passwordHash);
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('passwordHash'))
        return next();
    // generate a salt
    HashPassword(this, next);
});
userSchema.methods.comparePassword = function (candidatePassword) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        bcrypt.compare(candidatePassword, _this.passwordHash, function (err, isMatch) {
            if (err)
                return reject(err);
            resolve(isMatch);
        });
    });
};
function HashPassword(user, next) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err)
            return next(err);
        // hash the password along with our new salt
        bcrypt.hash(user.passwordHash, salt, function (err, hash) {
            if (err)
                return next(err);
            // override the cleartext password with the hashed one
            user.passwordHash = hash;
            next();
        });
    });
}
;
exports.User = mongoose.model('User', userSchema);
