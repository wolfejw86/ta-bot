const SlackBot = require('slackbots');
import config from "../config/config.js";
import { get, post } from "../httpPromise.js";
console.log(config);
// create a bot
export default class TABot {
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
	async channelListGet() {
		const list = await get(`https://slack.com/api/channels.list?token=${this.key}`);
		this.channel_list = list.channels.map(c => { return { name: c.name, id: c.id } });
	}
	async usersGet() {
		const list = await get(`https://slack.com/api/users.list?token=${this.key}`);
		// this.user_list = list.members.map(u => {
		// 	return {
		// 		name: u.name,
		// 		id: u.id
		// 	}
		// });
		console.log(list)
	}
	start() {
		// define channel, where bot exist. You can adjust it there https://my.slack.com/services 
		this.bot.postMessageToChannel('bot_testing', 'Hello There!', this.params);
	}
	onmessage(e) {
		console.log(e.text);
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

