const mongoose = require('mongoose');

const KittySchema = new mongoose.Schema({
  name: String,
});

KittySchema.methods.speak = function () {
  const greeting = this.name
    ? 'Meow name is ' + this.name
    : "I don't have a name";
  console.log(greeting);
};

const Kitten = mongoose.model('Kitten', KittySchema);

module.exports = Kitten;
