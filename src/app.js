/**
*for: App portion to define middlewars 
* @module App 
* 
*/
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from 'errorhandler';
import bodyParser from 'body-parser';
// import routes from './routes';
import path from "path";
// import { sentryClient } from './components/errors';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//for using with express --- put before your routes

app.use(cors());
app.use(morgan('dev'));

// if (app.get('env') === 'development') {
// 	app.use(errorHandler());
// }

// app.use('/', routes);
export default app;
