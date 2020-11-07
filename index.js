require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const https = require('https');
const config = require('config');
const app = express();
const logger = require('./containers/logger');

process.on('unhandledRejection', (error) => {
  logger.info('Unhandled Rejection: ', { message: error.message });
});

require('./containers/database')(logger);

require('./containers/routes')(app);

const PORT = process.env.PORT || 8000;
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production') {
  https
    .createServer(require('./config/ssl'), app)
    .listen(PORT, function (error) {
      if (error) return console.error(error.message);
      console.log(`Server running on port ${PORT}`);
    });
} else {
  app.listen(PORT, function (error) {
    if (error) return console.error(error.message);
    console.info(`Successful Connection to server on port ${PORT}`);
  });
}
