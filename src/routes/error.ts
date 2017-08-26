/// <reference path="../../typings/index.d.ts" />

import * as express from "express";

let router: express.Router = express.Router();

// catch 404 and forward to error handler
router.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
	var err = new Error('No valid route found!');
	err['status'] = 404;
	next(err);
})

// error handlers

// development error handler
// will print stacktrace
if (process.env === 'development') {
	router.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
		res.status(err.status || 500);
		res.send(err.message);
	});
}

// production error handler
// no stacktraces leaked to user
router.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
	res.status(err.status || 500);
	res.send(err.message);
});

export default router