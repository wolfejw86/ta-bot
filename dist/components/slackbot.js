"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _config = require("../config/config.js");

var _config2 = _interopRequireDefault(_config);

var _httpPromise = require("../httpPromise.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Entrypoint for starting the TA Bot
 * @module TABot
 */

var SlackBot = require('slackbots');

console.log(_config2.default);
// create a bot
/**
* Entrypoint for TABot Class 
* @class TABot
* 
*/

var TABot = function () {
	/**
  * constructor - initiates a new slackbot using the npm slackbots package
  * --requires a config with an api key
  *
  * @function constructor
  * @memberof  module:TABot
  */
	function TABot() {
		var _this = this;

		(0, _classCallCheck3.default)(this, TABot);

		this.bot = new SlackBot({
			token: _config2.default.slack_alumni_key, // Add a bot https://my.slack.com/services/new/bot and put the token 
			name: 'TA Bot'
		});
		this.bot.on('start', function () {
			return _this.start();
		});
		this.bot.on('message', function (e) {
			return _this.onmessage(e);
		});
		this.key = _config2.default.slack_alumni_key;
		this.channelListGet();
		this.usersGet();
		this.params = {
			icon_emoji: ':yuno:'
		};
	}
	/**
  * channelListGet - retreives the most current list of channels and their ids in slack
  * --requires a config with an api key
  *
  * @function channelListGet
  * @memberof  module:TABot
  */


	(0, _createClass3.default)(TABot, [{
		key: "channelListGet",
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
				var list;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return (0, _httpPromise.get)("https://slack.com/api/channels.list?token=" + this.key);

							case 2:
								list = _context.sent;

								this.channel_list = list.channels.map(function (c) {
									return { name: c.name, id: c.id };
								});

							case 4:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function channelListGet() {
				return _ref.apply(this, arguments);
			}

			return channelListGet;
		}()
		/**
   * usersGet - retreives the most current list of users, names, and their ids in slack
   * --requires a config with an api key
   *
   * @function usersGet
   * @memberof  module:TABot
   */

	}, {
		key: "usersGet",
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
				var list;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return (0, _httpPromise.get)("https://slack.com/api/users.list?token=" + this.key);

							case 2:
								list = _context2.sent;

								this.user_list = list.members.map(function (u) {
									return {
										name: u.name,
										id: u.id,
										real_name: u.real_name
									};
								});
								console.log(list);

							case 5:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function usersGet() {
				return _ref2.apply(this, arguments);
			}

			return usersGet;
		}()
		/**
   * start - alerts users that bot is in the slack
   *
   * @function start
   * @memberof  module:TABot
   */

	}, {
		key: "start",
		value: function start() {
			// define channel, where bot exist. You can adjust it there https://my.slack.com/services 
			this.bot.postMessageToChannel('bot_testing', 'Hello There!', this.params);
		}
		/**
   * onmessage - watches the event on message in slack - most of the logic will go here
   * this event watch is initiated in the constructor
   *
   * @function onmessage
   * @event message -referes to the slack api message event
   * @memberof  module:TABot
   */

	}, {
		key: "onmessage",
		value: function onmessage(e) {
			console.log(e);
			if (e.username === "TA Bot") {
				console.log('return initiated');
				return;
			}
			if (e.text !== undefined && e.text.indexOf("hello") !== -1) {
				var channel = this.channel_list.filter(function (c) {
					return c.id === e.channel;
				})[0].name;
				console.log(channel);
				this.bot.postMessageToChannel(channel, "Why hello to you too ", this.params);
			}
		}
	}]);
	return TABot;
}();

exports.default = TABot;