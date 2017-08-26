/// <reference path="../../typings/index.d.ts" />

import * as express from "express";
import { todos, createTodo, updateTodo, removeTodo } from '../controllers/todo';

var router: express.Router = express.Router();

router.get('/todo', todos);

router.post('/todo', createTodo);

router.put('/todo/:id', updateTodo);

router.delete('/todo/:id', removeTodo);

export default router;