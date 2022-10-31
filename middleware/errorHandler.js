const { logEvents } = require('./logger');

// Will log error events
const errorHandler = (error, req, res, next) => {
	logEvents(
		`${error.name}: ${error.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
		'errorLog.log'
	);
	/* console.log(error.stack); */

	const status = res.statusCode ? res.statusCode : 500; // Server Error

	res.status(status);

	res.json({ message: error.message });
};

module.exports = errorHandler;
