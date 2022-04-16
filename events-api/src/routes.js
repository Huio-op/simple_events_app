const express = require('express');
const routes = express.Router();

const userRoutes = require('./routes/user');
routes.use('/user', userRoutes);

module.exports = routes;
