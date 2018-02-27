const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/*
    uuid: '0000-0000-0000',
    name: 'Username',
    password: 'asdoijawdoijawd'
    color: '#FFFFFF',
    avatar: 'http://...',
    wins: 0
 */

const UserSchema = new mongoose.Schema({
  uuid: {type: String, required: true, unique: true, trim: true},
  name: {type: String, required: true, trim: true},
  password: {type: String, required: true},
  // passwordConf: {type: String, required: true},
  color: {type: String, required: true, trim: true},
  avatar: {type: String, required: true, trim: true},
  wins: Number
}, {retainKeyOrder: true});

UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({name: username})
    .exec(function (err, user) {
      if (err) {
        return callback(err);
      } else if (!user) {
        err = new Error('Usuario no encontrado');
        err.status = 401;
        return callback(err);
      } else {
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        });
      }
    });
};

UserSchema.statics.addWin = function (userID, callback) {
  User.findOneAndUpdate({_id: userID}, {$inc: {wins: 1}},
    function (err, user) {
      if (err) {
        return callback(err);
      } else if (!user) {
        err = new Error('Usuario no encontrado');
        err.status = 401;
        return callback(err);
      } else {
        console.log('Usuario actualizado');
      }
    });
};

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
