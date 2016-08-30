/// <reference path="../typings/index.d.ts" />

import * as express      from 'express';
import * as morgan       from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser   from 'body-parser';
import * as path         from 'path';
import * as mongoose     from 'mongoose';

// import todoRouter from './modules/todo/todoRoute';
import errorRouter from './routes/error';

//server configuration
let app: express.Application = express();
let mongoURI: string = process.env.MONGOLAB_URI || 'mongodb://localhost/todoApp';

// establish db connection
mongoose.connect(mongoURI);

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

//custom mounted middleware for routing
// app.use('/api/v1/todo', todoRouter);

// render index page
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express REST API Application ' });
});

//custom middleware for errors
app.use(errorRouter);

export default app
