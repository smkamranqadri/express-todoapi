/// <reference path="../typings/index.d.ts" />

import * as express from 'express';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as cors from 'cors';

import config from './config';
import authRouter from './routes/auth';
import todoRouter from './routes/todo';
import userRouter from './routes/user';
import errorRouter from './routes/error';
import { authenticate } from './middleware';

//server configuration
let app: express.Application = express();

// establish db connection
mongoose.connect(config.database);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//builtin middleware
app.use(express.static(path.join(__dirname, './public')));

//third party middleware
app.use(morgan('dev'));
app.use(cookieParser('expressWebpackTodoApi'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//custom mounted middleware for routing
app.use('/api/v1', authRouter);
app.use('/api/v1', authenticate);
app.use('/api/v1', [userRouter, todoRouter]);

// render index page
app.get('/', function (req, res, next) {
	res.send('Express REST API Application is running!');
});

//custom middleware for errors
app.use(errorRouter);

export default app
