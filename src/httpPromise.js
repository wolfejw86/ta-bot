const https = require("https");

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