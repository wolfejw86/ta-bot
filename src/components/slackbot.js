/**
 * Entrypoint for starting the TA Bot
 * @module TABot
 */

const SlackBot = require('slackbots');
import config from "../config/config.js";
import { get, post } from "../httpPromise.js";
console.log(config);
// create a bot
/**
* Entrypoint for TABot Class 
* @class TABot
* 
*/
export default class TABot {
	/**
	 * constructor - initiates a new slackbot using the npm slackbots package
	 * --requires a config with an api key
	 *
	 * @function constructor
	 * @memberof  module:TABot
	 */
	constructor() {
		this.bot = new SlackBot({
			token: config.slack_alumni_key, // Add a bot https://my.slack.com/services/new/bot and put the token 
			name: 'TA Bot'
		});
		this.bot.on('start', () => this.start());
		this.bot.on('message', (e) => this.onmessage(e));
		this.key = config.slack_alumni_key;
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
	async channelListGet() {
		const list = await get(`https://slack.com/api/channels.list?token=${this.key}`);
		this.channel_list = list.channels.map(c => { return { name: c.name, id: c.id } });
	}
	/**
	 * usersGet - retreives the most current list of users, names, and their ids in slack
	 * --requires a config with an api key
	 *
	 * @function usersGet
	 * @memberof  module:TABot
	 */
	async usersGet() {
		const list = await get(`https://slack.com/api/users.list?token=${this.key}`);
		this.user_list = list.members.map(u => {
			return {
				name: u.name,
				id: u.id,
				real_name: u.real_name
			}
		});
		console.log(list)
	}
	/**
	 * start - alerts users that bot is in the slack
	 *
	 * @function start
	 * @memberof  module:TABot
	 */
	start() {
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
	onmessage(e) {
		console.log(e);
		if (e.username === "TA Bot") {
			console.log('return initiated');
			return;
		}
		if (e.text !== undefined && e.text.indexOf("hello") !== -1) {
			const channel = this.channel_list.filter(c => c.id === e.channel)[0].name;
			console.log(channel);
			this.bot.postMessageToChannel(channel, "Why hello to you too ", this.params);
		}
	}
}

