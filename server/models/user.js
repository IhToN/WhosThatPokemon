const mongoose = require('mongoose');
const jwte = require('jsonwebtoken');
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
  is_admin: {type: Boolean, required: true, trim: true},
  wins: Number
}, {retainKeyOrder: true});

UserSchema.statics.authenticate = function (username, password, next) {
  console.log('autentificando...');
  User.findOne({name: username})
    .exec(function (err, user) {
      if (err) {
        return next(err);
      } else if (!user) {
        err = new Error('Usuario no encontrado');
        err.status = 401;
        return next(err);
      } else {
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true) {
            return next(null, user);
          } else {
            return next();
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

UserSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwte.sign({
    _id: this._id,
    uuid: this.uuid,
    name: this.name,
    color: this.color,
    avatar: this.avatar,
    is_admin: this.is_admin,
    wins: this.wins,
    exp: parseInt(expiry.getTime() / 1000),
  }, "wtp_jwt"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
