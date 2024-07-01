const express = require('express');
const path = require('path');
const config = require('./config/config');
const routes = require('./routes/index');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/', routes);

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});
