const mongoose = require('mongoose');

/*
    uuid: '0000-0000-0000',
    name: 'Username',
    password: 'asdoijawdoijawd'
    color: '#FFFFFF',
    avatar: 'http://...',
    wins: 0
 */

const User = mongoose.model('User', new mongoose.Schema({
  uuid: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  password: {type: String, required: true},
  color: {type: String, required: true},
  avatar: {type: String, required: true},
  wins: Number
}, {retainKeyOrder: true}));

module.exports = User;
