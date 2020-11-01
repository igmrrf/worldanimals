require('./containers/db');
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const Kittens = require('./routes/kittens');
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', Kittens);

app.listen(PORT, function (error) {
  if (error) return console.error(error.message);
  console.info(`Successful Connection to server on port ${PORT}`);
});
