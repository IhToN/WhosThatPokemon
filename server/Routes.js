const express = require('express');
const path = require('path');
const router = express.Router();
const formidable = require("formidable");



router.get('*', function (req, res) {
  res.sendfile(path.join(__dirname, 'public', 'index.html'));
});

router.post('/upload', function (req, res) {
  let form = new formidable.IncomingForm();


  form.parse(req);

  form.on('fileBegin', function (name, file) {
    var fileType = file.type.split('/').pop();
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
  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    };

    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/profile');
      }
    });
  }
});

router.post('/login', function (req, res) {
  //todo: login new user if registered
});

module.exports = router;
