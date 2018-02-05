var express = require('express');
var path = require('path');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

const pokemon = require('pokemon');

app.use(express.static(path.join(__dirname, 'public')));

/*app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});*/

var userlist = [];
/*
  {
    uuid: '0000-0000-0000',
    name: 'Username',
    color: '#FFFFFF',
  }
*/
var matches = [];
/*
  {
    timeCreated: 115354351,
    round: 1,
    pokemonid: 15,
    users: [
      {
        uuid: '0000-0000-0000',
        name: 'Username',
        color: '#FFFFFF',
        points: 0
      }
    ]
  }
*/


io.on('connection', function (socket) {
  console.log("user connected");

  socket.on('new-user', function (userdata) {
      console.log(userdata);

      if (!userdata) return;
      if (userdata.hasOwnProperty('uuid') && userdata.hasOwnProperty('name') && userdata.hasOwnProperty('color')) {
        userlist.push(userdata);
        io.emit('new-user-connected', userdata);
      }
    }
  );

  socket.on('connectuser', function (userdata) {
    userlist.push(username);
    io.emit('connected', {user: username, userlist: userlist});

    socket.on('chat message', function (msg) {
      if (msg.length > 0) {
        io.emit('chat message', msg);
      }
    });

    socket.on('writing', function (user) {
      io.emit('writing', user);
    });
  });
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});
