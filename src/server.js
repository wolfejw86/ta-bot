/**
 * Entrypoint for starting the server
 * @module server
 */
// import Sequelize from 'sequelize';
import app from './app';
import config from './config/config.js';
import TABot from './components/slackbot.js';
// import { handleError } from './components/errors';
// import { migrateDB, syncDB } from './db-helpers';
/**
 * listen - Starts the server with the config given by the environment variables
 *
 * @function listen
 * @memberof  module:index
 */
function listen() {
	app.listen(config.port, () => {
		console.log('Express server listening on %d, in %s mode', // eslint-disable-line
			config.port, app.get('env'));
	});
	return new TABot();
}

// let db = syncDB();
// db.then(() => listen());
const bot = listen();
