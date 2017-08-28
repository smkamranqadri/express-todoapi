/// <reference path="../../typings/index.d.ts" />

import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";

let userSchema: mongoose.Schema = new mongoose.Schema({
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
	if (!this.isModified('passwordHash')) return next();
	// generate a salt
	HashPassword(this, next);
});

userSchema.pre('update', function (next) {
	console.log('password', this.passwordHash);
	// only hash the password if it has been modified (or is new)
	if (!this.isModified('passwordHash')) return next();
	// generate a salt
	HashPassword(this, next);
});

userSchema.methods.comparePassword = function (candidatePassword) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(candidatePassword, this.passwordHash, (err, isMatch) => {
			if (err) return reject(err);
			resolve(isMatch);
		});
	});
};

function HashPassword(user, next) {
	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err);
		// hash the password along with our new salt
		bcrypt.hash(user.passwordHash, salt, (err, hash) => {
			if (err) return next(err);
			// override the cleartext password with the hashed one
			user.passwordHash = hash;
			next();
		});
	})
};

export interface IUser extends mongoose.Document {
	name: string;
	email: string;
	passwordHash: string;
	admin: boolean;
	comparePassword: (string) => Promise<boolean>;
}

export let User: mongoose.Model<IUser> = mongoose.model<IUser>('User', userSchema);