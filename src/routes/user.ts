/// <reference path="../../typings/index.d.ts" />

import * as express from "express";
import { users, user, createUser, updateUser, removeUser } from '../controllers/user';

var router: express.Router = express.Router();

router.get('/user', users);

router.get('/user/:id', user);

router.post('/user', createUser);

router.put('/user/:id', updateUser);

router.delete('/user/:id', removeUser);

export default router;