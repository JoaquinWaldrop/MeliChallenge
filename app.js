const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mutantRouter = require('./routes/mutant');
const statsRouter = require('./routes/stats');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/mutant', mutantRouter);
app.use('/stats', statsRouter);


module.exports = app;
 