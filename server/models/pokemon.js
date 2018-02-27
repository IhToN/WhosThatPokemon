const mongoose = require('mongoose');

const Pokemon = mongoose.model('Pokemon', new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  name: {type: String, required: true, unique: true},
  generation: {type: Number, default: 1, required: true,}
}, {retainKeyOrder: true}));

module.exports = Pokemon;
