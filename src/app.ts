import express from 'express';
import path from 'path';
import { config } from './config/config';
import apiRoutes from './routes/apiRoutes';
import pageRoutes from './routes/pageRoutes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', apiRoutes);
app.use('/', pageRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
