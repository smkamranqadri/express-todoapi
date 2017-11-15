/// <reference path="../../typings/index.d.ts" />

import * as express from "express";
import {users, user, createUser, updateUser, removeUser} from '../controllers/user';
import {isAdmin} from '../middleware';

var router : express.Router = express.Router();

router.get('/user/', isAdmin, users);

router.get('/user/:id', isAdmin, user);

router.post('/user/', isAdmin, createUser);

router.put('/user/:id', isAdmin, updateUser);

router.delete('/user/:id', isAdmin, removeUser);

export default router;