const mongoose = require('mongoose');
const uriFormat = require('mongodb-uri');

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

// Encoding domain sockets if use as connection string.
// const host = encodeURIComponent('/tmp/mongodb-27017.sock');

const monogdbConnectString = process.env.MONGO_DATABASE_URL;
console.log(encodeMongoURI(monogdbConnectString), 'Url');

mongoose.connect(encodeMongoURI(monogdbConnectString));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('We are connected');
});
