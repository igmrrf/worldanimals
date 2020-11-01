const router = require('express').Router();
const Kitten = require('../models/Kitten');

router.get('/', async function (req, res, next) {
  const silence = new Kitten({ name: 'Silence' });
  console.log(silence.name);

  const fluffy = new Kitten({ name: 'Fluffy' });
  fluffy.speak();

  await fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  });

  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  });
  res.send('<h1>Home page for Kittens Reached</h1>');
});

module.exports = router;
