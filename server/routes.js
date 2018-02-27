const express = require('express');
const path = require('path');
const router = express.Router();
const formidable = require("formidable");


const Pokemon = require('./models/pokemon');
const User = require('./models/user');

router.get('*', function (req, res) {
  res.sendfile(path.join(__dirname, 'public', 'index.html'));
});

router.post('/upload', function (req, res) {
  let form = new formidable.IncomingForm();


  form.parse(req);

  form.on('fileBegin', function (name, file) {
    let fileType = file.type.split('/').pop();
    if (fileType === 'jpg' || fileType === 'png' || fileType === 'jpeg' || fileType === 'gif') {
      file.path = path.join(__dirname, 'public', 'uploads', file.name);

      form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);
      });
    } else {
      res.end();
    }
  });
});

router.post('/pokemon', function (req, res) {
  const Pokemon = require('./models/Pokemon.js');
  //todo: find pokemon and send request
});

router.post('/register', function (req, res) {
    //todo: create a new user if not registered
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
          wins: 1,
        };

        //use schema.create to insert data into the db
        User.create(userData, function (err, user) {
          if (err) {
            return next(err)
          } else {
            req.session.userId = user._id;
            //todo: tell the user that has been registered
          }
        });
      } else {
        return next('Las contraseñas no son las mismas.');
      }
    } else {
      let err = new Error('No has rellenado los campos necesarios.');
      err.status = 400;
      return next(err);
    }
  }
);

router.post('/login', function (req, res) {
  if (req.body.name && req.body.password) {
    User.authenticate(req.body.name, req.body.password, function (error, user) {
      if (error || !user) {
        let err = new Error('La combinación de usuario y contraseña no se ha podido encontrar.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        //todo: tell the user that has been logged
      }
    });
  } else {
    let err = new Error('No has rellenado los campos necesarios.');
    err.status = 400;
    return next(err);
  }
});

router.post('/userwon', function (req, res) {
  if (req.session.userId) {
    User.addWin(req.session.userId, function (err) {
      if (err) {
        return next(err);
      } else {
        return next('Usuario actualizado');
      }
    });
  } else {
    let err = new Error('No estás conectado con un usuario válido.');
    err.status = 400;
    return next(err);
  }
});

module.exports = router;
