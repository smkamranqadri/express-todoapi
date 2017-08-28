/// <reference path="../../typings/index.d.ts" />

import * as express from "express";
import { login, register } from '../controllers/auth';

var router: express.Router = express.Router();

router.post('/login', login);

router.post('/register', register);

export default router;