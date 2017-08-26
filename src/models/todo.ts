/// <reference path="../../typings/index.d.ts" />

import * as mongoose from "mongoose";

let todoSchema: mongoose.Schema = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	completed: {
		type: Boolean,
		required: true,
		default: false
	}
}, { timestamps: true });

export interface ITodo extends mongoose.Document {
	title: string,
	completed: boolean,
}

export let Todo: mongoose.Model<ITodo> = mongoose.model<ITodo>('Todo', todoSchema);