const expressStatusMonitor = require('express-status-monitor');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Kittens = require('../routes/kittens');

module.exports = (app) => {
  app.use(expressStatusMonitor(require('../config/network.config')));
  app.use(
    cors({
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'],
    })
  );
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname), ''));

  app.use('/', Kittens);
};
