/// <reference path="../../typings/index.d.ts" />

import * as express from "express";
import {todos, todo, createTodo, updateTodo, removeTodo} from '../controllers/todo';
import {isUserOrMakeAnonymous} from '../middleware';

var router : express.Router = express.Router();

router.get('/todo', isUserOrMakeAnonymous, todos);

router.get('/todo/:id', isUserOrMakeAnonymous, todo);

router.post('/todo/', isUserOrMakeAnonymous, createTodo);

router.put('/todo/:id', isUserOrMakeAnonymous, updateTodo);

router.delete('/todo/:id', isUserOrMakeAnonymous, removeTodo);

export default router;