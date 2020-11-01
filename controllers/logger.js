const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

function logger() {
  winston.ExceptionHandler(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaught.log' })
  );
  process.on('unhandledRejection', function error() {
    throw error;
  });

  if (process.env.NODE_ENV === 'production')
    winston.add(winston.transports.File, { filename: 'logfile.log' });
  else {
    winston.add(winston.transports.MongoDB, {
      db: process.env.MONGO_DATABASE_URL,
      level: 'info',
    });
  }
}
