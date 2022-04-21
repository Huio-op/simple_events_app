const express = require('express');
const app = express();
const routes = require('./routes');
const customMethods = require('./middlewares/customMethods');
const defaultHeaders = require('./middlewares/defaultHeaders');
require('dotenv').config();

app.use(express.json());
app.use(customMethods);
app.use(defaultHeaders);
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
