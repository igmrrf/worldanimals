const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = () => {
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
};

// module.exports = function () {
//   winston.createLogger({
//     level: 'info',
//     format: winston.format.json(),
//     defaultMeta: { service: 'user-service' },
//     transports: [
//       new winston.transports.File({ filename: 'error.log', level: 'error' }),
//       new winston.transports.File({ filename: 'combine.log' }),
//     ],
//   });
//   winston.exceptions.handle(
//     new winston.transports.Console({ colorize: true, prettyPrint: true }),
//     new winston.transports.File({ filename: 'error.log' })
//   );
//   if (process.env.NODE_ENV !== 'production') {
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     });
//   }
//   process.on('unhandledRejection', (ex) => {
//     throw ex;
//   });
// };
