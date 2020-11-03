const fs = require('fs');

module.exports = {
  key: fs.readFileSync('api.key', 'utf8'),
  cert: fs.readFileSync('api.cert', 'utf8'),
};
