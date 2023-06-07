const express = require('express');
const app = express();
const apiRoutes = require('./api/index');

app.use('/api', apiRoutes);

module.exports = app;