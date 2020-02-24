const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const homeRoutes = require('./routes/homeRoutes.js');
const animalRoutes = require('./routes/animalsRoutes.js');
const newsRoutes = require('./routes/newsRoutes.js');
const happyStoriesRoutes = require('./routes/happyStoriesRoutes.js');
const suppliesRoutes = require('./routes/suppliesRoutes.js');
const aboutRoutes = require('./routes/aboutRoutes.js');
const donateRoutes = require('./routes/donatesRoutes.js');
const emergencyRoutes = require('./routes/emergenciesRoutes.js');
const reportRoutes = require('./routes/reportsRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const mongoose = require('mongoose');
const dbOptions = require('./utils/configs.js').dbOptions;

const app = express();

mongoose
  .connect(`mongodb+srv://root:${process.env.DB_PASS}@animalsforlife-goij5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    dbOptions)
  .catch(err => {
    console.log(err);
  });

app.use(morgan(('dev')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//if use cors module --->>> app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use('/home', homeRoutes);
app.use('/auth', authRoutes);
app.use('/animals', animalRoutes);
app.use('/news', newsRoutes);
app.use('/supplies', suppliesRoutes);
app.use('/happyStories', happyStoriesRoutes);
app.use('/about', aboutRoutes);
app.use('/donate', donateRoutes);
app.use('/emergencies', emergencyRoutes);
app.use('/reports', reportRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found!');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message, status: error.status } });
});

module.exports = app;