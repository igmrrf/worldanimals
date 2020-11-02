const router = require('express').Router();
const Kitten = require('../models/Kitten');
const time = require('dayjs');

router.get('/', async function (req, res, next) {
  try {
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
      console.log(kittens.length);
    });
    await Kitten.findOneAndDelete({ name: 'Fluffy' });

    Kitten.find(function (err, kittens) {
      if (err) return console.error(err);
      console.log(kittens.length);
    });
    res.status(200).send('<h1>Home page for World Animals API Reached</h1>');
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
