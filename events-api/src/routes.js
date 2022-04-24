const express = require('express');
const routes = express.Router();

const userRoutes = require('./routes/user');
routes.use('/user', userRoutes);

const eventRoutes = require('./routes/event');
routes.use('/event', eventRoutes);

module.exports = routes;
