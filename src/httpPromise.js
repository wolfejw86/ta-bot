/**
* Entrypoint for Get and Post request module 
* @module httpsPromise
*
* - uses the https library and Promises to make get and post requests
*/

const https = require("https");
/**
*for: get 
* @function get 
* @param query {string} - takes a string that is a url for a get request (needs to be already formatted)
*/
export const get = (query) => {
	const p = new Promise((resolve, reject) => {
		https.get(query, (res) => {
			let body = "";
			res.on('data', (d) => {
				body += d;
			});
			res.on('end', () => {
				resolve(JSON.parse(body));
			})
		})
			.on("error", (err) => reject(err))
			.end();
	});
	return p;
}
/**
*for: post 
* @function post
* @param url {string}
* @param query {string}
* @param data {Object}
*/
export const post = (url, query, data) => {
	const p = new Promise((resolve, reject) => {
		const options = {
			hostname: url,
			port: 443,
			path: query,
			method: 'POST'
		};

		const req = https.request(options, (res) => {
			let body = "";
			res.on('data', (d) => {
				body += d;
			});
			res.on('end', () => {
				consle.log(body);
				resolve(body);
			});
		})
			.on("error", (err) => reject(err))
		req.write(JSON.stringify(data));
		req.end();
	});
	return p;
} 