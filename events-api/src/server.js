const express = require('express');
const app = express();
const routes = require('./routes');
const customMethods = require('./middlewares/customMethods');
require('dotenv').config();

app.use(express.json());
app.use(customMethods);
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
