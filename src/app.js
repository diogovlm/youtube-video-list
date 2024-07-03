const express = require('express');
const path = require('path');
const config = require('./config/config');
const apiRoutes = require('./routes/apiRoutes');
const pageRoutes = require('./routes/pageRoutes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', apiRoutes);
app.use('/', pageRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
