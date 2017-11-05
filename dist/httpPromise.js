"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
* Entrypoint for Get and Post request module 
* @module httpsPromise
*
* - uses the https library and Promises to make get and post requests
*/

var https = require("https");
/**
*for: get 
* @function get 
* @param query {string} - takes a string that is a url for a get request (needs to be already formatted)
*/
var get = exports.get = function get(query) {
	var p = new Promise(function (resolve, reject) {
		https.get(query, function (res) {
			var body = "";
			res.on('data', function (d) {
				body += d;
			});
			res.on('end', function () {
				resolve(JSON.parse(body));
			});
		}).on("error", function (err) {
			return reject(err);
		}).end();
	});
	return p;
};
/**
*for: post 
* @function post
* @param url {string}
* @param query {string}
* @param data {Object}
*/
var post = exports.post = function post(url, query, data) {
	var p = new Promise(function (resolve, reject) {
		var options = {
			hostname: url,
			port: 443,
			path: query,
			method: 'POST'
		};

		var req = https.request(options, function (res) {
			var body = "";
			res.on('data', function (d) {
				body += d;
			});
			res.on('end', function () {
				consle.log(body);
				resolve(body);
			});
		}).on("error", function (err) {
			return reject(err);
		});
		req.write(JSON.stringify(data));
		req.end();
	});
	return p;
};