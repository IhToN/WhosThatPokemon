const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


passport.use(new LocalStrategy(User.authenticate));


var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

function register(req, res) {
  if (req.body.uuid &&
    req.body.name &&
    req.body.password &&
    req.body.passwordConf &&
    req.body.color &&
    req.body.avatar) {
    if (req.body.password === req.body.passwordConf) {

      const userData = {
        uuid: req.body.uuid,
        name: req.body.name,
        password: req.body.password,
        color: req.body.color,
        avatar: req.body.avatar,
        is_admin: false,
        wins: 1,
      };

      //use schema.create to insert data into the db
      User.create(userData, function (err, user) {
        if (err) {
          let msg = err.errmsg;
          if (err.code === 11000)
            msg = 'El usuario ya está registrado';
          sendJSONresponse(res, 401, {
            "error": msg
          });
        } else {
          sendJSONresponse(res, 200, {
            "token": user.generateJwt()
          });
        }
      });
    } else {
      sendJSONresponse(res, 200, {
        "error": "Las contraseñas no son las mismas."
      });
    }
  } else {
    sendJSONresponse(res, 401, {
      "error": "No has rellenado los campos necesarios."
    });
  }
}

function login(req, res, next) {
  passport.authenticate('local', function (error, user) {
    if (error || !user) {
      sendJSONresponse(res, 401, {
        error: 'La combinación de usuario y contraseña no se ha podido encontrar.',
        err: error,
        usr: user
      });
    } else {
      sendJSONresponse(res, 200, {
        "token": user.generateJwt()
      });
    }
  })(req, res, next);
}

function validUser(req, res, next) {
  if (req.user.uuid) {
    return next();
  } else {
    sendJSONresponse(res, 401, {
      "error": "No estás conectado con un usuario válido."
    });
  }
}

module.exports.validUser = validUser;
module.exports.register = register;
module.exports.login = login;


