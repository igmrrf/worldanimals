const mongoose = require('mongoose');
const uriFormat = require('mongodb-uri');
const config = require('config');
const winston = require('winston');
const fs = require('fs');

// To encode Mongo Connection Strings as passwords may contain non-allowed characters.

function encodeMongoURI(uriString) {
  if (uriString) {
    let parsed = uriFormat.parse(uriString);
    urlString = uriFormat.format(parsed);
  }
  return uriString;
}

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('autoIndex', false);

// Encoding domain sockets if use as connection string.
// const host = encodeURIComponent('/tmp/mongodb-27017.sock');

const monogdbConnectString = config.get('db_url');
console.log(encodeMongoURI(monogdbConnectString), 'Url');
module.exports = function (logger) {
  let db;
  try {
    mongoose.connect(encodeMongoURI(monogdbConnectString));
    db = mongoose.connection;
  } catch (error) {
    logger.info(`MongoDB Error ${error.message}`);
  }

  // const gridFSBucket = new mongoose.mongo.GridFSBucket(db.Admin);
  // const writeStream = gridFSBucket.openUploadStream('test.dat');
  // fs.createReadStream('public/text.dat').pipe(writeStream);
  // const readStream = gridFSBucket.openDownloadStream('test.txt');
  // readStream.on('error', function (err) {
  //   console.log('An error occurred', err);
  //   throw err;
  // });

  db.on('error', () => {
    logger.error('There has been an error connecting to the database');
  });
  db.once('open', function () {
    logger.info('We are connected');
  });
  db.on('disconnect', () => {
    logger.error('We have lost connection to the database');
  });
};
