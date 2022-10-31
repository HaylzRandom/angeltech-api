require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// Middleware
const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

// Database
const connectDB = require('./config/databaseConn');

const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

// Connect to database
connectDB();

// Log events - middleware
app.use(logger);

// Allow requests from specific origins - middleware
app.use(cors(corsOptions));

// Ability to parse json - middleware
app.use(express.json());

// Ability to parse cookies - middleware
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/root'));
app.use('/users', require('./routes/userRoutes.js'));

// Error Page
app.all('*', (req, res) => {
	res.status(404);

	if (req.accepts('html')) {
		res.sendFile(path.join(__dirname, 'views', 'error.html'));
	} else if (req.accepts('json')) {
		res.json({ message: '404 Not Found' });
	} else {
		res.type('txt').send('404 Not Found');
	}
});

// Log errors - middleware
app.use(errorHandler);

// On first connection to database
mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// List for errors on database connection
mongoose.connection.on('error', (error) => {
	console.log(error);
	logEvents(
		`${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`,
		'mongoErrorLog.log'
	);
});
