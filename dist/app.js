'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _errorhandler = require('errorhandler');

var _errorhandler2 = _interopRequireDefault(_errorhandler);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { sentryClient } from './components/errors';
/**
*for: App portion to define middlewars 
* @module App 
* 
*/
var app = (0, _express2.default)();
// import routes from './routes';


app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
//for using with express --- put before your routes

app.use((0, _cors2.default)());
app.use((0, _morgan2.default)('dev'));

// if (app.get('env') === 'development') {
// 	app.use(errorHandler());
// }

// app.use('/', routes);
exports.default = app;