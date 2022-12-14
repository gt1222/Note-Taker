const express = require('express');

//import modulear routers for /api and /html routes
const apiRouter = require('./apiRoutes');
const htmlRouter = require('./htmlRoutes');

const app = express();

app.use('/api', apiRouter);
app.use('/', htmlRouter);

module.exports = app;