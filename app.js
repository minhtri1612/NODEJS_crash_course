const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// start server and attach error handlers so we don't get unhandled 'error' events
const server = app.listen(3000, () => {
	console.log('Server is listening on port 3000 (pid:', process.pid, ')');
});

server.on('error', (err) => {
	console.error('Server error:', err && err.code ? err.code : err);
	if (err && err.code === 'EADDRINUSE') {
		console.error('Port 3000 is already in use. Please stop the other process or change the port.');
		// exit with non-zero so nodemon knows it failed cleanly
		process.exit(1);
	} else {
		// rethrow to allow default behavior for unexpected errors
		throw err;
	}
});

// Better global error visibility during development
process.on('uncaughtException', (err) => {
	console.error('Uncaught exception:', err);
	process.exit(1);
});

process.on('unhandledRejection', (reason) => {
	console.error('Unhandled Rejection:', reason);
	process.exit(1);
});
