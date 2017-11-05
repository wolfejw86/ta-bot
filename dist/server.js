'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _config = require('./config/config.js');

var _config2 = _interopRequireDefault(_config);

var _slackbot = require('./components/slackbot.js');

var _slackbot2 = _interopRequireDefault(_slackbot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { handleError } from './components/errors';
// import { migrateDB, syncDB } from './db-helpers';
/**
 * listen - Starts the server with the config given by the environment variables
 *
 * @function listen
 * @memberof  module:index
 */
function listen() {
  _app2.default.listen(_config2.default.port, function () {
    console.log('Express server listening on %d, in %s mode', // eslint-disable-line
    _config2.default.port, _app2.default.get('env'));
  });
  return new _slackbot2.default();
}

// let db = syncDB();
// db.then(() => listen());
/**
 * Entrypoint for starting the server
 * @module server
 */
// import Sequelize from 'sequelize';
var bot = listen();