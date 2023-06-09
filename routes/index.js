const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');
const webRoutes = require('./webRoutes');

router.use('/', webRoutes);

router.use('/api', apiRoutes);

module.exports = router;