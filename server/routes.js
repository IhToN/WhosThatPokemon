const express = require('express');
const path = require('path');
const router = express.Router();
const formidable = require("formidable");
const jwt = require('express-jwt');
var auth = jwt({
  secret: 'wtp_jwt',
  userProperty: 'payload'
});

const Pokemon = require('./models/pokemon');
const User = require('./models/user');

const ctrlAuth = require('./controllers/authentication');

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

router.post('/register', ctrlAuth.register);

router.post('/login', ctrlAuth.login);

router.post('/userwon', auth, ctrlAuth.validUser, function (req, res) {
  User.addWin(req.session.userId, function (err) {
    if (err) {
      return next(err);
    } else {
      return next('Usuario actualizado');
    }
  });
});

router.delete('/user', auth, ctrlAuth.validUser, function (req, res) {

});



module.exports = router;
